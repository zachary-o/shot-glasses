import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Item } from "./itemsSlice"
import { Continent, CountryOption } from "./adminFormSlice"
import i18n from "i18next"

interface FilterState {
  filteredItems: Item[]
  prevSelectedCountries: Item[]
  displayedItems: number
}

interface SearchPayload {
  items: Item[]
  searchValue: string
}

interface FilterContinentsPayload {
  items: Item[]
  continents: Continent[]
}

interface FilterCountriesPayload {
  items: Item[]
  countries: CountryOption[]
}

const initialState: FilterState = {
  filteredItems: [],
  prevSelectedCountries: [],
  displayedItems: 8,
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterBySearch: (state, action: PayloadAction<SearchPayload>) => {
      const { items, searchValue } = action.payload
      const searchLower = searchValue.toLowerCase()
      const tempItems = items.filter((item: Item) => {
        if (i18n.language === "uk") {
          return (
            item.countryUkr.toLowerCase().includes(searchLower) ||
            item.cityUkr.toLowerCase().includes(searchLower)
          )
        } else if (i18n.language === "en") {
          return (
            item.countryEng.toLowerCase().includes(searchLower) ||
            item.cityEng.toLowerCase().includes(searchLower)
          )
        }
      })
      state.filteredItems = tempItems
    },
    filterByContinents: (
      state,
      action: PayloadAction<FilterContinentsPayload>
    ) => {
      const { items, continents } = action.payload
      if (continents.length === 0) {
        state.filteredItems = items
      } else {
        const tempItems = items.filter((item: Item) =>
          continents.some(
            (continent: Continent) =>
              continent.nameEng === item.continentEng ||
              continent.nameUkr === item.continentUkr
          )
        )
        state.filteredItems = tempItems
      }
    },
    filterByCountries: (
      state,
      action: PayloadAction<FilterCountriesPayload>
    ) => {
      const { items, countries } = action.payload
      if (countries.length === 0) {
        state.filteredItems = items
      } else {
        const tempItems = items.filter((item: Item) =>
          countries.some(
            (country: CountryOption) => country.value === item.countryEng
          )
        )
        state.filteredItems = tempItems
      }
    },
    setPrevSelectedCountries: (state, action: PayloadAction<Item[]>) => {
      state.prevSelectedCountries = action.payload
    },
    setDisplayedItems: (state, action: PayloadAction<number>) => {
      state.displayedItems = action.payload
    },
  },
})

export const {
  filterBySearch,
  filterByContinents,
  filterByCountries,
  setPrevSelectedCountries,
  setDisplayedItems,
} = filterSlice.actions

export default filterSlice.reducer
