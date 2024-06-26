import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Item {
  id: string
  cityEng: string
  cityUkr: string
  continentEng: string
  continentUkr: string
  countryEng: string
  countryUkr: string
  imageUrl: string
  latitude: string
  longitude: string
  purchaseDate: Date | null
  createdAt: Date | null
}

interface ItemsState {
  items: Item[]
  totalItems: number
  loading: boolean
  error: string | null
}

const initialState: ItemsState = {
  items: [],
  totalItems: 0,
  loading: false,
  error: null,
}

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setItems, setTotalItems, setLoading, setError } =
  itemsSlice.actions

export default itemsSlice.reducer
