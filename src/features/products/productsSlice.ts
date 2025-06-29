// src/features/products/productsSlice.ts
import type { Product } from "../../types/product";
import { createPaginatedSlice } from "../../utils/createPaginatedSlice";

const productsSlice = createPaginatedSlice<Product>("products");

export const {
  setTotal,
  incrementTotal,
  setCurrentPage,
  setPageItems,
  prependToPageOne,
  invalidatePage,
} = productsSlice.actions;

export default productsSlice.reducer;
