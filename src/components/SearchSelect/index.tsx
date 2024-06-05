import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  MultiValue,
  OptionProps,
  default as ReactSelect,
  SingleValue,
  StylesConfig,
  components,
} from "react-select"
import CheckboxCustom from "../CheckboxCustom"
import styles from "./SearchSelect.module.scss"
import countryList from "./countries"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../redux/store"
import {
  CountryOption,
  setSelectedCountry,
} from "../../redux/slices/adminFormSlice"

const Option = (props: OptionProps<CountryOption, boolean>) => {
  return (
    <div>
      <components.Option {...props}>
        <CheckboxCustom
          isReactSelect={true}
          label={props.label}
          isSelected={props.isSelected}
          onChange={() => {}}
        />
      </components.Option>
    </div>
  )
}

interface SearchSelectProps {
  isMulti: boolean
  // onChange: (nameEng: string, nameUkr: string) => void

  // setSelectedCountry?: React.Dispatch<
  //   React.SetStateAction<SingleValue<CountryOption> | MultiValue<CountryOption>>
  // >
}

const SearchSelect = ({
  isMulti = false,
}: // onChange,
SearchSelectProps) => {
  const [inputValue, setInputValue] = useState<string>("")
  const { selectedCountry } = useSelector((state: RootState) => state.admin)
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  const list: CountryOption[] = useMemo(
    () =>
      countryList.map((country) => ({
        label: i18n.language === "uk" ? country.nameUkr : country.nameEng,
        value: country.nameEng,
      })),
    [countryList, i18n.language]
  )

  const handleSelect = (
    selectedCountry: SingleValue<CountryOption> | MultiValue<CountryOption>
  ) => {
    console.log("selectedCountry", selectedCountry)
    if (!isMulti) {
    }
    //   if (setSelectedCountry) {
    //     dispatch(
    //       setSelectedCountry(selectedCountry!)
    //     )
    //   }
    //   if (selectedCountry !== null) {
    //     if (!Array.isArray(selectedCountry)) {
    //       const singleCountryOption =
    //         selectedCountry as SingleValue<CountryOption>
    //       const value = countryList.find(
    //         (countryItem) => countryItem.nameEng === singleCountryOption?.value
    //       )
    //       if (value) {
    //         onChange(value.nameEng, value.nameUkr)
    //       }
    //     } else {
    //       const multiCountryOption = selectedCountry as MultiValue<CountryOption>
    //       multiCountryOption.forEach((option) => {
    //         const value = countryList.find(
    //           (countryItem) => countryItem.nameEng === option.value
    //         )
    //         if (value) {
    //           onChange(value.nameEng, value.nameUkr)
    //         }
    //       })
    //     }
    //   }
    // }
  }
  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
  }

  return (
    <div className={styles["search-select"]}>
      {/* {selectedCountry || inputValue ? null : <img src={search} alt="Search" />} */}
      <ReactSelect
        options={list}
        isMulti={isMulti}
        closeMenuOnSelect={!isMulti}
        components={{
          Option,
        }}
        onChange={handleSelect}
        value={selectedCountry}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        styles={customStyles}
        placeholder="Пошук"
      />
    </div>
  )
}

export default SearchSelect

const customStyles: StylesConfig<CountryOption, true> = {
  control: (provided, state) => ({
    ...provided,
    width: "128px",
    minHeight: "27px",
    maxHeight: "27px",
    padding: 0,
    margin: 0,
    border: "1px solid #141414",
    borderRadius: "5px",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px !important",
    lineHeight: "150%",
    color: "#141414",
    transition: "all 0.2s ease-in-out",
    ...(state.isFocused && {
      width: "128px",
      height: "27px !important",
      border: "none",
      borderBottom: "1px solid #1712EC",
      borderRadius: 0,
      boxShadow: "none",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px !important",
      lineHeight: "150%",
      color: "#141414",
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
  multiValue: (provided) => ({
    ...provided,
    display: "none",
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
}
