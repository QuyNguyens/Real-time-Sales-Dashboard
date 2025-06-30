import { createSlice, type PayloadAction, type Draft } from "@reduxjs/toolkit";

interface HasId {
  _id: string;
  orderId?: string;
}


export interface PaginatedState<T> {
  total: number;
  pages: Record<number, T[]>;
  currentPage: number;
  itemsPerPage: number;
}

export function createPaginatedSlice<T extends HasId>(name: string) {
  const getInitialState = (): PaginatedState<T> => ({
    total: 0,
    pages: {},
    currentPage: 1,
    itemsPerPage: 5
  });

  return createSlice({
    name,
    initialState: getInitialState(),
    reducers: {
      setTotal(state, action: PayloadAction<number>) {
        state.total = action.payload;
      },
      incrementTotal(state, action: PayloadAction<number>) {
        state.total += action.payload;
      },
      incrementOneTotal: (state) => {
        state.total += 1;
      },
      setCurrentPage(state, action: PayloadAction<number>) {
        state.currentPage = action.payload;
      },
      setPageItems(
        state,
        action: PayloadAction<{ page: number; items: T[] }>
      ) {
        const { page, items } = action.payload;
        state.pages[page] = items as unknown as Draft<T[]>;
      },
      prependToPageOne(state, action: PayloadAction<T>) {
        const pageOne = state.pages[1] ?? [];
        state.pages[1] = ([action.payload, ...pageOne] as unknown as Draft<T[]>).slice(0, 10);
      },
      invalidatePage(state, action: PayloadAction<number>) {
        delete state.pages[action.payload];
      },
      setItemsPerPage(state, action: PayloadAction<number>) {
        state.itemsPerPage = action.payload;
      },
     deleteItemFromPage(state, action: PayloadAction<string>) {
      const page = state.currentPage;
      if (state.pages[page]) {
        const idToDelete = action.payload;
        state.pages[page] = state.pages[page].filter((item: any) => {
          return item.orderId !== idToDelete && item._id !== idToDelete;
        });
      }
    },
      decrementTotal(state) {
        state.total = state.total - 1;
      },
    },
  });
}
