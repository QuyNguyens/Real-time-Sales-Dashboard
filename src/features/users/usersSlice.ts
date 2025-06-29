// src/features/products/productsSlice.ts
import { createPaginatedSlice } from "../../utils/createPaginatedSlice";
import type { User } from "../../types/user";

const usersSlice = createPaginatedSlice<User>("users");

export const {
  setTotal,
  incrementTotal,
  setCurrentPage,
  setPageItems,
  prependToPageOne,
  invalidatePage,
} = usersSlice.actions;

export default usersSlice.reducer;
