import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import auth from "./slices/authSlice"
import admin from "./slices/adminFormSlice"

const store = configureStore({
  reducer: { auth, admin },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store
