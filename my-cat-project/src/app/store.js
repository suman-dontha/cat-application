import { configureStore } from "@reduxjs/toolkit";
import { catApi } from "../api/catApi";
import catsReducer from "../features/catSlice";

export const store = configureStore({
  reducer: {
    [catApi.reducerPath]: catApi.reducer,
    cats: catsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catApi.middleware),
});