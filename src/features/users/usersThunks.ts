// src/features/products/productsThunks.ts
import userApi from "../../api/users";
import type { AppDispatch } from "../../app/store";
import {
  setTotal,
  setPageItems,
  setCurrentPage,
} from "./usersSlice"; // slice bạn đã tạo

export const fetchUsersPage =
  (page: number = 1, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await userApi.getOrders(page, limit);
      dispatch(setTotal(res.total));
      dispatch(setPageItems({ page, items: res.data }));
      dispatch(setCurrentPage(page));
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);
    }
  };

