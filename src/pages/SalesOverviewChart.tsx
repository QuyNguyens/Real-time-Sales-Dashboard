import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import type { SaleOverView } from "../types/order";
import React from "react";

interface SalesOverviewChartProps {
  salesData: SaleOverView[];
}

function SalesOverviewChart({ salesData }: SalesOverviewChartProps) {
  const isDarkMode = document.documentElement.classList.contains("dark");

  const data = salesData.map((item) => ({
    ...item,
    sales: Math.round(item.sales / 1_000_000),
    profit: Math.round(item.profit / 1_000_000),
  }));

  const axisStyle = {
    stroke: isDarkMode ? "#b5b5b5" : "#636363",
    fill: isDarkMode ? "#b5b5b5" : "#636363",
  };

  return (
    <div className="bg-white dark:bg-black-primary w-full p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-5 text-gray-800 dark:text-white">Sales Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid stroke={isDarkMode ? "#444" : "#eee"} strokeDasharray="5 5" />
          <XAxis dataKey="month" tick={{ ...axisStyle }} />
          <YAxis
            tickFormatter={(value) => `${value} tr`}
            domain={[0, "auto"]}
            tick={{ ...axisStyle }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? "#19191c" : "#fff",
              borderColor: isDarkMode ? "#4b5563" : "#e5e7eb",  
              color: isDarkMode ? "#f3f4f6" : "#111827",     
            }}
            formatter={(value: number, name: string) => [`${value} triệu ₫`, name]}
            labelFormatter={(label) => `Tháng: ${label}`}
          />
          <Legend
            wrapperStyle={{
              color: isDarkMode ? "#f3f4f6" : "#111827", // text color
            }}
          />
          <Bar dataKey="profit" barSize={10} fill="#6366F1" name="Profit" />
          <Line type="monotone" dataKey="sales" stroke="#EC4899" strokeWidth={3} name="Sales" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(SalesOverviewChart);
