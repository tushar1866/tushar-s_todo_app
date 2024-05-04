import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./todo.slice";
import ThemeSlice from "./theme.slice";

export const store = configureStore({
  reducer: {
    TodoSlice,
    ThemeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
