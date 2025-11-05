import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

import categoriesReducer from "./categoriesSlice/categoriesSlice";
import productsReducer from "./productsSlice/products.slice";
import recommendedReducer from "./recommended/recommendedSlice";
import cartReducer from './cart/cartSlice';
import userReducer from './user/userSlice';
import ordersReducer from './orders/ordersSlice';

const reducers = combineReducers({
  // Reducers para cada slice
  categories: categoriesReducer,
  products: productsReducer,
  recommended: recommendedReducer,
  cart: cartReducer,
  user: userReducer,
  orders: ordersReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['cart', 'user'], // Reducers que se deben persistir
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignorar acciones de redux-persist
      },
    }),
});

export const persistor = persistStore(store);
