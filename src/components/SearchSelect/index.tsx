import { useState } from "react";
import { default as ReactSelect, StylesConfig, components } from "react-select";
import CheckboxCustom from "../CheckboxCustom";
import countryOptions from "./countries";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <CheckboxCustom
          isReactSelect={true}
          label={props.label}
          isSelected={props.isSelected}
          onChange={props.onChange}
        />
      </components.Option>
    </div>
  );
};

const SearchSelect = () => {
  const [state, setState] = useState({ optionSelected: null });

  const handleChange = (selected) => {
    setState({
      optionSelected: selected,
    });
  };

  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      width: "128px",
      maxHeight: "27px !important",
      padding: "3px 10px",
      paddingLeft: "20px",
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
      width: "110%",
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
    option: (provided, state) => ({
      ...provided,

      backgroundColor: state.isDisabled
        ? "#fff"
        : state.isSelected
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
    <ReactSelect
      options={countryOptions}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{
        Option,
        IndicatorsContainer: () => {
          return null;
        },
        MultiValue: () => {
          return null;
        },
      }}
      onChange={handleChange}
      value={state.optionSelected}
      styles={customStyles}
      placeholder="Пошук"
    />
  );
};

export default SearchSelect;
