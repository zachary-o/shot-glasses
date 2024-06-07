import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import auth from "./slices/authSlice"
import admin from "./slices/adminFormSlice"
import items from "./slices/itemsSlice"
import filter from "./slices/filterSlice"

const store = configureStore({
  reducer: { auth, admin, items, filter },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store
