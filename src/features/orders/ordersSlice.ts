// src/features/products/productsSlice.ts
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
} = ordersSlice.actions;

export default ordersSlice.reducer;
