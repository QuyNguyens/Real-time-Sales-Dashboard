// src/features/products/productsThunks.ts
import orderApi from "../../api/orders";
import type { AppDispatch } from "../../app/store";
import {
  setTotal,
  setPageItems,
  setCurrentPage,
  setItemsPerPage,
} from "./ordersSlice"; // slice bạn đã tạo

export const fetchOrdersPage =
  (page: number = 1, limit: number = 5) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await orderApi.getOrders(page, limit);
      dispatch(setTotal(res.total));
      dispatch(setItemsPerPage(limit));
      dispatch(setPageItems({ page, items: res.data }));
      dispatch(setCurrentPage(page));
    } catch (err) {
      console.error("❌ Failed to fetch orders:", err);
    }
  };

export const deleteOrder =
  (orderId: string) =>
  async (dispatch: AppDispatch, getState: () => any) => {
    try {

      await orderApi.deleteOrder(orderId);

      const state = getState();
      const currentPage = state.orders.currentPage;
      const currentItems = state.orders.pages[currentPage] || [];

      if (currentItems.length <= 1 && currentPage > 1) {
        dispatch(fetchOrdersPage(currentPage - 1, state.orders.itemsPerPage));
      }
    } catch (err) {
      console.error("❌ Failed to delete order:", err);
    }
  };

