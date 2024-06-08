import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "./itemsSlice";
import { Continent } from "./adminFormSlice";

interface FilterState {
  filteredItems: Item[];
}

interface SearchPayload {
  items: Item[];
  searchValue: string;
}

interface FilterContinentsPayload {
  items: Item[];
  continents: Continent[];
}

const initialState: FilterState = {
  filteredItems: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterBySearch: (state, action: PayloadAction<SearchPayload>) => {
      const { items, searchValue } = action.payload;
      const tempItems = items.filter(
        (item: Item) =>
          item.cityEng.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.cityUkr.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.countryEng.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.countryUkr.toLowerCase().includes(searchValue.toLowerCase())
      );
      state.filteredItems = tempItems;
    },
    filterByContinents: (
      state,
      action: PayloadAction<FilterContinentsPayload>
    ) => {
      const { items, continents } = action.payload;
      if (continents.length === 0) {
        state.filteredItems = items;
      } else {
        const tempItems = items.filter((item: Item) =>
          continents.some(
            (continent: Continent) =>
              continent.nameEng === item.continentEng ||
              continent.nameUkr === item.continentUkr
          )
        );
        state.filteredItems = tempItems;
      }
    },
  },
});

export const { filterBySearch, filterByContinents } = filterSlice.actions;

export default filterSlice.reducer;
