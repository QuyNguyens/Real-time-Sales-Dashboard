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

interface SalesOverviewChartProps{
  salesData: SaleOverView[];
}

function SalesOverviewChart({ salesData }: SalesOverviewChartProps) {
  const data = salesData.map((item) => ({
    ...item,
    sales: Math.round(item.sales / 1_000_000),
    profit: Math.round(item.profit / 1_000_000),
  }));

  return (
    <div className="bg-white w-full p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-5">Sales Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `${value} tr`} domain={[0, "auto"]} />
          <Tooltip
            formatter={(value: number, name: string) => [`${value} triệu ₫`, name]}
            labelFormatter={(label) => `Tháng: ${label}`}
          />
          <Legend />
          <Bar dataKey="profit" barSize={10} fill="#6366F1" name="Profit" />
          <Line type="monotone" dataKey="sales" stroke="#EC4899" strokeWidth={3} name="Sales" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(SalesOverviewChart);