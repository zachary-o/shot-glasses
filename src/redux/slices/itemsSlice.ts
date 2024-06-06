import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../../firebase/config"

interface Item {
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
}

interface ItemsState {
  items: Item[]
}

const initialState: ItemsState = {
  items: [],
}

export const getItems = createAsyncThunk(
  "items/getItems",
  async (_, { dispatch }) => {
    try {
      const itemsRef = collection(db, "shot-glasses")
      const q = query(itemsRef, orderBy("cityEng", "desc"))
      onSnapshot(q, (snapshot) => {
        const allItems = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
        console.log("allItems", allItems)
        dispatch(setItems(allItems))
      })
    } catch (error) {
      console.log("error", error)
    }
  }
)

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action) => {
      console.log("faction.payloadirst", action.payload)
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.fulfilled, (state) => {
      return { ...state }
    })
  },
})

export const { setItems } = itemsSlice.actions

export default itemsSlice.reducer
