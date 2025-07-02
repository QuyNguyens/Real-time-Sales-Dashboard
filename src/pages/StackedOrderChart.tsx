import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { OrderWeekBreakdownResponse, Weekday } from "../types/order";
import orderApi from "../api/orders";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

// === Chart component ===

const dayMap: Record<Weekday, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

interface ChartData {
  name: string;
  thisWeek: number;
  thisMonth: number;
  thisYear: number;
}

const StackedOrderChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [orderStats, setOrderStats] = useState<OrderWeekBreakdownResponse>();
  const orderTotal = useSelector((state: RootState) => state.orders.total);

  useEffect(() => {
    async function fetchData() {
      try {
        const raw = await orderApi.getStats();
        setOrderStats(raw);
        const formatted = convertToStackedChartData(raw);
        setChartData(formatted);
      } catch (error) {
        console.error("Failed to fetch order data:", error);
      }
    }

    fetchData();
  }, [orderTotal]);

  const convertToStackedChartData = (
    raw: OrderWeekBreakdownResponse
  ): ChartData[] => {
    return (Object.keys(dayMap) as Weekday[]).map((day) => ({
      name: dayMap[day],
      thisWeek: raw.thisWeek[day]?.count || 0,
      thisMonth: raw.sameWeekLastMonth[day]?.count || 0,
      thisYear: raw.sameWeekLastYear[day]?.count || 0,
    }));
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow w-full max-w-4xl mx-auto">
      <h2 className="text-lg text-gray-600 font-semibold mb-4">Sales statistics</h2>
        <div className="flex flex-wrap justify-center gap-2">
          <div className="flex flex-col p-4 bg-gray-100 rounded-sm w-fit">
            <span className="text-sm">Total this week</span>
            {orderStats?.thisWeek.weekTotal && (
              <span className="font-medium text-sm">
                VND {(orderStats?.thisWeek.weekTotal / 1_000_000).toFixed(1)} Tr
              </span>
            )}
          </div>

          <div className="flex flex-col p-4 bg-gray-100 rounded-sm w-fit">
            <span className="text-sm">Total this month</span>
            {orderStats?.sameWeekLastMonth.weekTotal && (
              <span className="font-medium text-sm text-green-500">
                VND {(orderStats?.sameWeekLastMonth.weekTotal / 1_000_000).toFixed(1)} Tr
              </span>
            )}
          </div>

          <div className="flex flex-col p-4 bg-gray-100 rounded-sm w-fit">
            <span className="text-sm">Total this year</span>
            {orderStats?.sameWeekLastYear.weekTotal && (
              <span className="font-medium text-sm text-red-500">
                VND {(orderStats?.sameWeekLastYear.weekTotal / 1_000_000).toFixed(1)} Tr
              </span>
            )}
          </div>
        </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={10}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              dataKey="thisWeek"
              stackId="orders"
              fill="#3b82f6"
              name="This Week"
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="thisMonth"
              stackId="orders"
              fill="#a855f7"
              name="This Month"
              radius={[4, 4, 4, 4]}
            />

            <Bar
              dataKey="thisYear"
              stackId="orders"
              fill="#f97316"
              name="This Year"
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StackedOrderChart;
