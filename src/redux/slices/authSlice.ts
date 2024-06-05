import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../../firebase/config"
import { toast } from "react-toastify"

interface AuthState {
  isLoggedIn: boolean
  email: string | null
  userName: string | null
  userId: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userId: null,
  loading: false,
  error: null,
}

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { dispatch, rejectWithValue }) => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      dispatch(setActiveUser(user))
      toast.success("Login successful")
    } catch (error: any) {
      toast.error(`Login failed: ${error.message}`)
      return rejectWithValue(error.message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await signOut(auth)
      dispatch(removeActiveUser())
      toast.success("Logout successful")
    } catch (error: any) {
      toast.error(`Logout failed: ${error.message}`)
      return rejectWithValue(error.message)
    }
  }
)

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
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginWithGoogle.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setActiveUser, removeActiveUser } = authSlice.actions

export default authSlice.reducer
