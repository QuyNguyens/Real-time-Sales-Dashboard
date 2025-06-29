import React, { useMemo } from "react";
import type { ProductTypeStats } from "../types/product";
import OrderDaySelector from "../components/OrderDaySelector";
import productApi from "../api/product";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

interface Props {
    data: ProductTypeStats;
    setProductStatus: React.Dispatch<React.SetStateAction<ProductTypeStats | undefined>>;
}

const GROWTH_COLORS = [
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-blue-500",
];

const BORDER_GROWTH_COLORS = [
  "border-green-500",
  "border-yellow-500",
  "border-purple-500",
  "border-pink-500",
  "border-blue-500",
];


const TopSellingCategories = ({ data, setProductStatus }: Props) => {
  const entries = useMemo(() => Object.entries(data), [data]);

  const totalSales = useMemo(() => {
    return entries.reduce((sum, [, stat]) => sum + stat.amount, 0);
  }, [entries]);

  const handleFilterChange = async (filter: string) => {
    try {
      const res = await productApi.getProductsTypeCount(filter.toLowerCase());
      setProductStatus(res);
    } catch (err) {
      console.error("❌ Failed to fetch filtered status:", err);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-[16px]">Top Selling Categories</h2>
            <OrderDaySelector iconOnly={false} onSelect={handleFilterChange}/>
        </div>

        {/* Progress Bar */}
        <div className="flex w-full gap-1 h-[6px] overflow-hidden bg-gray-100">
        {entries.map(([type, value], idx) => (
            <div
                key={type}
                className={`${GROWTH_COLORS[idx % GROWTH_COLORS.length]} h-full`}
                style={{ width: `${value.growth}%` }}
                title={`${type}: ${value.growth.toFixed(2)}%`}
                />
            ))}
        </div>

        {/* Overall Total */}
        <div className="mt-2 flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Overall Sales</span>
            <span className="text-[16px] font-semibold">
                {totalSales.toLocaleString()}
            </span>
        </div>

        {/* Category List */}
        <div className="flex flex-col gap-4">
            {/* Rows */}
            {entries.map(([type, info], idx) => {
                const borderColor = BORDER_GROWTH_COLORS[idx % BORDER_GROWTH_COLORS.length];
                const bgColor = GROWTH_COLORS[idx % GROWTH_COLORS.length];

                return (
                <div
                    key={type}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-2"
                >
                    {/* Cột 1: Tên loại */}
                    <div className="flex items-center gap-2 min-w-0">
                    <span
                        className={`w-3 h-3 rounded-full bg-white border-2 ${borderColor}`}
                    />
                    <span
                        className="text-sm font-medium text-gray-600 truncate"
                        title={type}
                    >
                        {type}
                    </span>
                    </div>

                    {/* Cột 2: Amount */}
                    <div className="text-sm font-semibold text-gray-600 text-left">
                    {info.amount.toLocaleString()}
                    </div>

                    {/* Cột 3: Gross */}
                    <div className="text-xs text-gray-500 text-left">
                    {info.growth.toFixed(0)}% Gross
                    </div>

                    {/* Cột 4: Compare */}
                    <div className="flex justify-end items-center">
                    <div
                        className={`flex items-center gap-1 px-1 py-0.5 text-[10px] text-white font-semibold rounded shrink-0 ${bgColor}`}
                    >
                        {(Math.random() * 4).toFixed(2)}%
                        <ArrowTrendingUpIcon className="w-3 h-3" />
                    </div>
                    </div>
                </div>
                );
            })}
        </div>
    </div>
    );
};

export default React.memo(TopSellingCategories);
