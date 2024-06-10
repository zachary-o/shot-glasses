import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  MultiValue,
  OptionProps,
  default as ReactSelect,
  SingleValue,
  StylesConfig,
  components,
} from "react-select"
import geoList from "../../geoData"
import {
  CountryOption,
  handleCountrySelect,
  setSelectedCountry,
} from "../../redux/slices/adminFormSlice"
import { RootState, useAppDispatch } from "../../redux/store"
import CheckboxCustom from "../CheckboxCustom"
import styles from "./SearchSelect.module.scss"
import { filterByCountries } from "../../redux/slices/filterSlice"

const Option = memo((props: OptionProps<CountryOption, boolean>) => {
  return (
    <div>
      <components.Option {...props}>
        <CheckboxCustom
          isReactSelect={true}
          label={props.label}
          isSelected={props.isSelected}
        />
      </components.Option>
    </div>
  )
})

interface SearchSelectProps {
  isMulti: boolean
}

const SearchSelect = ({ isMulti }: SearchSelectProps) => {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const { selectedCountry } = useSelector((state: RootState) => state.admin)
  const { filteredItems } = useSelector((state: RootState) => state.filter)
  const { items } = useSelector((state: RootState) => state.items)
  const [inputValue, setInputValue] = useState<string>("")
  const [countries, setCountries] = useState<CountryOption[] | []>([])

  useEffect(() => {
    dispatch(filterByCountries({ items, countries }))
  }, [dispatch, countries, items])

  // Handle language change and alphabetic order inside the country list
  const list: CountryOption[] = useMemo(() => {
    let sortedList: CountryOption[] = geoList.map((country) => ({
      label: i18n.language === "uk" ? country.nameUkr : country.nameEng,
      value: country.nameEng,
      continentUkr: country.continentUkr,
      continentEng: country.continentEng,
    }))

    if (filteredItems.length > 0 && isMulti) {
      sortedList = sortedList.filter((country) =>
        filteredItems.some((item) => item.countryEng === country.value)
      )
    }

    const locale = i18n.language === "uk" ? "uk" : "en"
    sortedList.sort((a, b) => a.label.localeCompare(b.label, locale))
    console.log("sortedList", sortedList)
    return sortedList
  }, [i18n.language, filteredItems, geoList])

  // Handle select from the dropdown
  const handleSelect = useCallback(
    (newValue: SingleValue<CountryOption> | MultiValue<CountryOption>) => {
      console.log("newValue", newValue)
      if (isMulti) {
        if (Array.isArray(newValue)) {
          setCountries?.(newValue)
        }
      } else {
        dispatch(setSelectedCountry(newValue as SingleValue<CountryOption>))
        const value = geoList.find(
          (countryItem) =>
            countryItem.nameEng ===
            (newValue as SingleValue<CountryOption>)?.value
        )
        if (value) {
          dispatch(handleCountrySelect(value))
        }
      }
    },
    [dispatch, isMulti, setCountries]
  )

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
  }

  return (
    <div className={styles["search-select"]}>
      <ReactSelect
        options={list}
        isMulti={isMulti}
        closeMenuOnSelect={!isMulti}
        components={{ Option }}
        onChange={handleSelect}
        value={isMulti ? countries : selectedCountry}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        styles={customStyles}
        placeholder="Пошук"
      />
    </div>
  )
}

export default SearchSelect

// Styles
const customStyles: StylesConfig<CountryOption, true> = {
  control: (provided, state) => ({
    ...provided,
    width: "128px",
    minHeight: "27px",
    maxHeight: "27px",
    margin: 0,
    border: "1px solid #141414",
    borderRadius: "5px",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px !important",
    lineHeight: "150%",
    color: "#141414",
    ...(state.isFocused && {
      border: "none",
      borderBottom: "1px solid #1712EC",
      borderRadius: 0,
      boxShadow: "none",
    }),
  }),
  menu: (provided) => ({
    ...provided,
    width: "100%",
  }),
  menuList: (provided) => ({
    ...provided,
    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    paddingLeft: "2px",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    display: "none",
  }),
  valueContainer: (provided) => ({
    ...provided,
    minHeight: "27px",
    maxHeight: "27px",
    padding: "0 8px",
  }),
  multiValue: (provided) => ({
    ...provided,
    maxHeight: "22px",
    display: "flex",
    alignItems: "center",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    ":hover": {
      cursor: "pointer",
      backgroundColor: "#fa9084",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled
      ? "#fff"
      : state.isFocused
      ? "#FEE4E1"
      : "",
    color: "#3D3A3A",
    padding: 5,
    ":active": {
      ...provided[":active"],
      backgroundColor: !state.isDisabled
        ? state.isSelected
          ? "#fa9084"
          : "#fee9e7"
        : undefined,
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    display: state.isFocused ? "none" : "",
  }),
}
