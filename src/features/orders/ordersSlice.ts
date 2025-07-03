// src/features/products/productsSlice.ts
import type { RootState } from "../../app/store";
import type { Order } from "../../types/order";
import { createPaginatedSlice } from "../../utils/createPaginatedSlice";

const ordersSlice = createPaginatedSlice<Order>("orders");

export const {
  setTotal,
  incrementTotal,
  setCurrentPage,
  setPageItems,
  prependToPageOne,
  incrementOneTotal,
  invalidatePage,
  setItemsPerPage,
  deleteItemFromPage,
  decrementTotal,
  updateItemStatus
} = ordersSlice.actions;

export default ordersSlice.reducer;

export const selectCurrentOrders = (state: RootState) => {
  const currentPage = state.orders.currentPage;
  return state.orders.pages[currentPage] ?? [];
};
