// src/features/products/productsSlice.ts
import { createPaginatedSlice } from "../../utils/createPaginatedSlice";
import type { User } from "../../types/user";
import type { RootState } from "../../app/store";

const usersSlice = createPaginatedSlice<User>("users");

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
} = usersSlice.actions;

export default usersSlice.reducer;

export const selectCurrentUsers = (state: RootState) => {
  const currentPage = state.users.currentPage;
  return state.users.pages[currentPage] ?? [];
};
