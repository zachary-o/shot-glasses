import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "./itemsSlice";
import { Continent, CountryOption } from "./adminFormSlice";

interface FilterState {
  filteredItems: Item[];
  prevSelectedCountries: Item[];
  filterContinents: Continent[];
  filterCountries: CountryOption[];
}

interface SearchPayload {
  items: Item[];
  searchValue: string;
}

interface FilterContinentsPayload {
  items: Item[];
  continents: Continent[];
}

interface FilterCountriesPayload {
  items: Item[];
  countries: CountryOption[];
}

const initialState: FilterState = {
  filteredItems: [],
  prevSelectedCountries: [],
  filterContinents: [],
  filterCountries: [],
};

const filterItems = (
  items: Item[],
  countries: CountryOption[],
  continents: Continent[]
) => {
  let tempItems = items;

  if (continents.length > 0) {
    tempItems = tempItems.filter((item: Item) =>
      continents.some(
        (continent: Continent) =>
          continent.nameEng === item.continentEng ||
          continent.nameUkr === item.continentUkr
      )
    );
  }

  if (countries.length > 0) {
    tempItems = tempItems.filter((item: Item) =>
      countries.some(
        (country: CountryOption) => country.value === item.countryEng
      )
    );
  }

  return tempItems;
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterBySearch: (state, action: PayloadAction<SearchPayload>) => {
      const { items, searchValue } = action.payload;
      const regex = new RegExp(searchValue.toLowerCase(), "i");
      const tempItems = items.filter((item: Item) => {
        return [
          item.cityEng,
          item.cityUkr,
          item.countryEng,
          item.countryUkr,
        ].some((field) => regex.test(field.toLowerCase()));
      });

      state.filteredItems = tempItems;
    },
    filterByContinents: (
      state,
      action: PayloadAction<FilterContinentsPayload>
    ) => {
      const { items, continents } = action.payload;
      state.filterContinents = continents;
      state.filteredItems = filterItems(
        items,
        state.filterCountries,
        continents
      );
    },
    filterByCountries: (
      state,
      action: PayloadAction<FilterCountriesPayload>
    ) => {
      const { items, countries } = action.payload;
      state.filterCountries = countries;
      state.filteredItems = filterItems(
        items,
        countries,
        state.filterContinents
      );
    },
    serPrevSelectedCountries: (state, action: PayloadAction<Item[]>) => {
      state.prevSelectedCountries = action.payload;
    },
  },
});

export const {
  filterBySearch,
  filterByContinents,
  filterByCountries,
  serPrevSelectedCountries,
} = filterSlice.actions;

export default filterSlice.reducer;
