import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
  isLoggedIn: boolean
  email: string | null
  userName: string | null
  userId: string | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userId: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.isLoggedIn = true
      state.email = action.payload.email
      state.userName = action.payload.displayName
      state.userId = action.payload.uid
    },
    removeActiveUser: (state) => {
      state.isLoggedIn = false
      state.email = null
      state.userName = null
      state.userId = null
    },
  },
})

export const { setActiveUser, removeActiveUser } = authSlice.actions

export default authSlice.reducer
