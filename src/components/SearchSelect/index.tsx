import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  components,
  MultiValue,
  OptionProps,
  default as ReactSelect,
  SingleValue,
} from "react-select"
import geoList, { convertData, GeoType } from "../../geoData"
import {
  CountryOption,
  handleCountrySelect,
  setSelectedCountry,
} from "../../redux/slices/adminFormSlice"
import { filterByCountries } from "../../redux/slices/filterSlice"
import { Item } from "../../redux/slices/itemsSlice"
import { RootState, useAppDispatch } from "../../redux/store"
import CheckboxCustom from "../CheckboxCustom"
import styles from "./SearchSelect.module.scss"
import { getCustomStyles } from "./customStyles"

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
  const { t, i18n } = useTranslation()

  const dispatch = useAppDispatch()
  const { selectedCountry } = useSelector((state: RootState) => state.admin)
  const { prevSelectedCountries } = useSelector(
    (state: RootState) => state.filter
  )
  const { items } = useSelector((state: RootState) => state.items)
  const [inputValue, setInputValue] = useState<string>("")
  const [countries, setCountries] = useState<CountryOption[] | []>([])

  const customStyles = useMemo(() => getCustomStyles(isMulti), [isMulti])

  useEffect(() => {
    dispatch(filterByCountries({ items, countries }))
  }, [dispatch, countries, items])

  // Handle language change and alphabetic order inside the country list
  const list: CountryOption[] = useMemo(() => {
    const availableCountries = Array.from(
      new Set(items.map((item: Item) => item.countryEng))
    )

    let filteredList: CountryOption[] = convertData()
      .filter((country: GeoType) =>
        availableCountries.includes(country.nameEng)
      )
      .map((country: GeoType) => ({
        label: i18n.language === "uk" ? country.nameUkr : country.nameEng,
        value: country.nameEng,
        continentUkr: country.continentUkr,
        continentEng: country.continentEng,
      }))
    if (isMulti && prevSelectedCountries.length > 0) {
      filteredList = filteredList.filter((country: CountryOption) =>
        prevSelectedCountries.some(
          (item: Item) => item.countryEng === country.value
        )
      )
    } else if (!isMulti) {
      filteredList = convertData().map((country: GeoType) => ({
        label: i18n.language === "uk" ? country.nameUkr : country.nameEng,
        value: country.nameEng,
        continentUkr: country.continentUkr,
        continentEng: country.continentEng,
      }))
    }

    const locale = i18n.language === "uk" ? "uk" : "en"
    filteredList.sort((a, b) => a.label.localeCompare(b.label, locale))

    return filteredList
  }, [items, prevSelectedCountries, isMulti, i18n.language])

  // Handle select from the dropdown
  const handleSelect = useCallback(
    (newValue: SingleValue<CountryOption> | MultiValue<CountryOption>) => {
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

  useEffect(() => {
    const handleLanguageChange = () => {
      setCountries([])
      dispatch(setSelectedCountry(null))
    }

    i18n.on("languageChanged", handleLanguageChange)

    return () => {
      i18n.off("languageChanged", handleLanguageChange)
    }
  }, [dispatch, i18n])

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
        placeholder={t("homePage.placeholder")}
      />
    </div>
  )
}

export default SearchSelect
