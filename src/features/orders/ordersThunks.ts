// src/features/products/productsThunks.ts
import orderApi from "../../api/orders";
import type { AppDispatch } from "../../app/store";
import {
  setTotal,
  setPageItems,
  setCurrentPage,
} from "./ordersSlice"; // slice bạn đã tạo

export const fetchOrdersPage =
  (page: number = 1, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await orderApi.getOrders(page, limit);
      dispatch(setTotal(res.total));
      dispatch(setPageItems({ page, items: res.data }));
      dispatch(setCurrentPage(page));
    } catch (err) {
      console.error("❌ Failed to fetch orders:", err);
    }
  };

