import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Item } from "./itemsSlice"

interface FilterState {
  filteredItems: Item[]
}

interface SearchPayload {
  items: Item[]
  searchValue: string
}

const initialState: FilterState = {
  filteredItems: [],
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterBySearch: (state, action: PayloadAction<SearchPayload>) => {
      const { items, searchValue } = action.payload
      const tempItems = items.filter(
        (item: Item) =>
          item.cityEng.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.cityUkr.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.continentEng.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.continentUkr.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.countryEng.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.countryUkr.toLowerCase().includes(searchValue.toLowerCase())
      )
      state.filteredItems = tempItems
    },
  },
})

export const { filterBySearch } = filterSlice.actions

export default filterSlice.reducer
