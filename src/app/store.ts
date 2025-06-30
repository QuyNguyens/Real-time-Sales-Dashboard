// store.ts
import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../features/products/productsSlice';
import productStatusSlice from '../features/products/productStatusSlice';
import usersSlice from '../features/users/usersSlice';
import ordersSlice from '../features/orders/ordersSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // lưu vào localStorage

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  products: productsSlice,
  orders: ordersSlice,
  users: usersSlice,
  productStatus: productStatusSlice
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products', 'orders', 'users', 'productStatus'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

