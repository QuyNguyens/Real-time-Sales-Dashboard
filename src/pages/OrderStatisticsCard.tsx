import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import tinycolor from "tinycolor2";
import OrderDaySelector from "../components/OrderDaySelector";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import type { OrderStatus } from "../types/order";
import orderApi from "../api/orders";

type StatusData = {
  name: string;
  value: number;
};

interface OrderStatisticsCardProps{
  orderStatus: OrderStatus;
  setOrderStatus: React.Dispatch<React.SetStateAction<OrderStatus | undefined>>;
}

const COLORS = ["#6366F1", "#E11D48", "#F59E0B", "#EC4899", "#10B981"];
const statusOrder: (keyof OrderStatus)[] = [
  "delivered",
  "cancelled",
  "shipped",
  "processing",
  "new",
];

export default function OrderStatisticsCard({orderStatus, setOrderStatus}: OrderStatisticsCardProps) {

  const data: StatusData[] = useMemo(() => {
    return statusOrder.map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: orderStatus[key] ?? 0,
    }));
  }, [orderStatus]);

  const total = useMemo(() => {
    return data.reduce((sum, d) => sum + d.value, 0);
  }, [data]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: string;
    color: string;
    visible: boolean;
  }>({
    x: 0,
    y: 0,
    content: "",
    color: "",
    visible: false,
  });

  const handleMouseMove = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    entry: StatusData,
    index: number
  ) => {
    const newTooltip = {
      x: e.clientX,
      y: e.clientY,
      content: `${entry.name}: ${entry.value}`,
      color: COLORS[index % COLORS.length],
      visible: true,
    };

    // Chỉ cập nhật nếu khác với tooltip hiện tại
    const isSameTooltip =
      tooltip.x === newTooltip.x &&
      tooltip.y === newTooltip.y &&
      tooltip.content === newTooltip.content &&
      tooltip.visible === true;

    if (!isSameTooltip) {
      setTooltip(newTooltip);
      setActiveIndex(index);
    }
  };


  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
    setActiveIndex(null);
  };

  const handleFilterChange = async (filter: string) => {
    try {
      const res = await orderApi.getStatusCount(filter.toLowerCase().replace(' ', '_'));
      setOrderStatus(res);
    } catch (err) {
      console.error("❌ Failed to fetch filtered status:", err);
    }
  };
  return (
    <div className="relative w-[260px] bg-white p-4 rounded-xl shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-medium mb-2">Order Statistics</h2>
        <OrderDaySelector iconOnly={true} onSelect={handleFilterChange} />
      </div>

      <div className="mt-4 p-3 bg-blue-50 inline-flex rounded-sm">
        <ArrowTrendingUpIcon className="w-5 h-5 text-blue-500 font-bold"/>
      </div>
      <div className="my-4 flex flex-col">
        <span className="text-xs font-medium">TOTAL ORDERS</span>
        <span className="text-xl font-semibold">{total.toLocaleString()}</span>
      </div>
        {/* Chart + Legend shared container */}
        <div className="relative h-[200px]">
            {/* Pie Chart */}
            <ResponsiveContainer className='outline-none border-none focus:outline-none' width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={data}
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={70}
                    outerRadius={100}
                    stroke="none"
                    isAnimationActive={false}
                    onMouseLeave={handleMouseLeave}
                    >
                    {data.map((entry, index) => {
                        const baseColor = COLORS[index % COLORS.length];
                        const fillColor =
                        activeIndex === index
                            ? tinycolor(baseColor).darken(2).toHexString()
                            : tinycolor(baseColor).lighten(2).toHexString();

                        return (
                        <Cell
                            key={index}
                            fill={fillColor}
                            onMouseMove={(e) => handleMouseMove(e, entry, index)}
                            className="focus:outline-none"
                        />
                        );
                    })}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* Total in center */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <div className="text-base font-bold">Total</div>
                <div className="text-sm font-semibold">{total}</div>
            </div>

            {/* Legend - Absolute bottom */}
            <div className="absolute bottom-5 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm max-h-12 overflow-y-auto px-2 py-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scroll-smooth">
                <div className="flex flex-col items-center justify-center gap-2">
                    {data.map((entry, index) => (
                    <div key={index} className="ml-8 flex w-1/2 items-start gap-2 justify-start">
                        <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="whitespace-nowrap text-xs">{entry.name}</span>
                    </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Tooltip */}
        {tooltip.visible && (
            <motion.div
            className="fixed px-3 py-1 text-sm text-white rounded shadow z-50 pointer-events-none whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
                top: tooltip.y - 40,
                left: tooltip.x -55,
                transform: "translateX(-50%)",
                backgroundColor: tooltip.color,
            }}
            >
            {tooltip.content}
            </motion.div>
        )}
    </div>
  );
}
