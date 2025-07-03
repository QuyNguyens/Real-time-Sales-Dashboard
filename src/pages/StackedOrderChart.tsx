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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
    <div className="p-4 bg-white dark:bg-black-primary rounded-xl shadow w-full max-w-4xl mx-auto">
      <h2 className="text-lg text-gray-600 dark:text-gray-200 font-semibold mb-4">
        {t("stackedChart.title")}
      </h2>

      <div className="flex flex-wrap justify-center gap-2 mb-5">
        <div className="flex flex-col p-4 bg-gray-100 dark:bg-gray-800 rounded-sm w-fit">
          <span className="text-sm text-gray-600 dark:text-gray-300">{t("stackedChart.totalThisWeek")}</span>
          {orderStats?.thisWeek.weekTotal && (
            <span className="font-medium text-sm text-gray-700 dark:text-gray-100">
              {t("stackedChart.currency", { value: (orderStats?.thisWeek.weekTotal / 1_000_000).toFixed(1) })}
            </span>
          )}
        </div>

        <div className="flex flex-col p-4 bg-gray-100 dark:bg-gray-800 rounded-sm w-fit">
          <span className="text-sm text-gray-600 dark:text-gray-300">{t("stackedChart.totalThisMonth")}</span>
          {orderStats?.sameWeekLastMonth.weekTotal && (
            <span className="font-medium text-sm text-green-500">
              {t("stackedChart.currency", { value: (orderStats?.thisWeek.weekTotal / 1_000_000).toFixed(1) })}
            </span>
          )}
        </div>

        <div className="flex flex-col p-4 bg-gray-100 dark:bg-gray-800 rounded-sm w-fit">
          <span className="text-sm text-gray-600 dark:text-gray-300">{t("stackedChart.totalThisYear")}</span>
          {orderStats?.sameWeekLastYear.weekTotal && (
            <span className="font-medium text-sm text-red-500">
              {t("stackedChart.currency", { value: (orderStats?.thisWeek.weekTotal / 1_000_000).toFixed(1) })}
            </span>
          )}
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={10}>
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937", // dark:bg-gray-800
                borderColor: "#4b5563", // dark:border-gray-600
                color: "#f9fafb", // dark:text-white
              }}
              labelStyle={{ color: "#f9fafb" }}
              itemStyle={{ color: "#f9fafb" }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: "#f9fafb" }} />
            <Bar dataKey="thisWeek" stackId="orders" fill="#3b82f6" name={t("stackedChart.tooltip.thisWeek")} radius={[4, 4, 4, 4]} />
            <Bar dataKey="thisMonth" stackId="orders" fill="#a855f7" name={t("stackedChart.tooltip.thisMonth")} radius={[4, 4, 4, 4]} />
            <Bar dataKey="thisYear" stackId="orders" fill="#f97316" name={t("stackedChart.tooltip.thisYear")} radius={[4, 4, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

  );
};

export default StackedOrderChart;
