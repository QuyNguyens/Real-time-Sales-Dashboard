// src/features/users/usersThunks.ts
import userApi from "../../api/users";
import type { AppDispatch } from "../../app/store";
import {
  setTotal,
  setPageItems,
  setCurrentPage,
  setItemsPerPage,
} from "./usersSlice"; // slice bạn đã tạo

export const fetchUsersPage =
  (page: number = 1, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await userApi.getOrders(page, limit);
      dispatch(setTotal(res.total));
      dispatch(setPageItems({ page, items: res.data }));
      dispatch(setItemsPerPage(limit));
      dispatch(setCurrentPage(page));
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);
    }
  };

export const deleteUser =
  (userId: string) =>
  async (dispatch: AppDispatch, getState: () => any) => {
    try {

      await userApi.deleteUser(userId);

      const state = getState();
      const currentPage = state.users.currentPage;
      const currentItems = state.users.pages[currentPage] || [];

      if (currentItems.length <= 1 && currentPage > 1) {
        dispatch(fetchUsersPage(currentPage - 1, state.users.itemsPerPage));
      }
    } catch (err) {
      console.error("❌ Failed to delete user:", err);
    }
  };