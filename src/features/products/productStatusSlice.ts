// src/features/products/productTypeStatsSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductTypeStats } from "../../types/product";

interface ProductTypeStatsState {
  data?: ProductTypeStats;
}

const initialState: ProductTypeStatsState = {
  data: undefined,
};

const productTypeStatsSlice = createSlice({
  name: "productTypeStats",
  initialState,
  reducers: {
    setProductTypeStats(state, action: PayloadAction<ProductTypeStats>) {
      state.data = action.payload;
    },
    clearProductTypeStats(state) {
      state.data = undefined;
    },
  },
});

export const { setProductTypeStats, clearProductTypeStats } = productTypeStatsSlice.actions;

export default productTypeStatsSlice.reducer;
