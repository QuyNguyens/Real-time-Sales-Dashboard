// src/features/products/productsThunks.ts
import productApi from "../../api/product";
import type { AppDispatch } from "../../app/store";
import {
  setTotal,
  setPageItems,
  setCurrentPage,
  setItemsPerPage,
} from "./productsSlice"; // slice bạn đã tạo

export const fetchProductsPage =
  (page: number = 1, limit: number = 5) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await productApi.getProducts(page, limit);
      dispatch(setTotal(res.total));
      dispatch(setItemsPerPage(limit));
      dispatch(setPageItems({ page, items: res.data }));
      dispatch(setCurrentPage(page));
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
    }
  };

  export const deleteOrder =
  (productId: string) =>
  async (dispatch: AppDispatch, getState: () => any) => {
    try {

      await productApi.deleteProduct(productId);

      const state = getState();
      const currentPage = state.products.currentPage;
      const currentItems = state.products.pages[currentPage] || [];

      if (currentItems.length <= 1 && currentPage > 1) {
        dispatch(fetchProductsPage(currentPage - 1, state.products.itemsPerPage));
      }
    } catch (err) {
      console.error("❌ Failed to delete order:", err);
    }
  };
