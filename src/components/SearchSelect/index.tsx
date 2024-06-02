import { useState } from "react";
import {
  MultiValue,
  OnChangeValue,
  OptionProps,
  default as ReactSelect,
  SingleValue,
  StylesConfig,
  components,
} from "react-select";
import search from "../../assets/images/search-gray.svg";
import CheckboxCustom from "../CheckboxCustom";
import styles from "./SearchSelect.module.scss";
import countryOptions from "./countries";

interface CountryOption {
  value: string;
  label: string;
}

const Option = (props: OptionProps<CountryOption, boolean>) => {
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
  );
};

interface SearchSelectProps {
  isMulti: boolean;
}

const SearchSelect = ({ isMulti = false }: SearchSelectProps) => {
  const [selectedOption, setSelectedOption] = useState<
    SingleValue<CountryOption> | MultiValue<CountryOption>
  >(isMulti ? [] : null);

  const handleChange = (selected: OnChangeValue<CountryOption, boolean>) => {
    setSelectedOption(selected);
  };

  const customStyles: StylesConfig<CountryOption, true> = {
    control: (provided, state) => ({
      ...provided,
      width: "128px",
      minHeight: "27px",
      maxHeight: "27px",
      padding: "0 5px",
      paddingLeft: "20px",
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
      padding: "1px 10px",
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
  };

  return (
    <div className={styles["search-select"]}>
      {selectedOption && <img src={search} alt="Search" />}
      <ReactSelect
        options={countryOptions}
        isMulti={isMulti}
        closeMenuOnSelect={!isMulti}
        hideSelectedOptions={false}
        components={{
          Option,
        }}
        onChange={handleChange}
        value={selectedOption}
        styles={customStyles}
        placeholder="Пошук"
      />
    </div>
  );
};

export default SearchSelect;
