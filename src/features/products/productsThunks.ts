// src/features/products/productsThunks.ts
import productApi from "../../api/product";
import type { AppDispatch } from "../../app/store";
import {
  setTotal,
  setPageItems,
  setCurrentPage,
} from "./productsSlice"; // slice bạn đã tạo

export const fetchProductsPage =
  (page: number = 1, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await productApi.getProducts(page, limit);
      dispatch(setTotal(res.total));
      dispatch(setPageItems({ page, items: res.data }));
      dispatch(setCurrentPage(page));
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
    }
  };

