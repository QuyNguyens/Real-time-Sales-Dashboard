// src/features/products/productsSlice.ts
import type { RootState } from "../../app/store";
import type { Product } from "../../types/product";
import { createPaginatedSlice } from "../../utils/createPaginatedSlice";

const productsSlice = createPaginatedSlice<Product>("products");

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
  decrementTotal
} = productsSlice.actions;

export default productsSlice.reducer;

export const selectCurrentProducts = (state: RootState) => {
  const currentPage = state.products.currentPage;
  return state.products.pages[currentPage] ?? [];
};
