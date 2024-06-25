import { StylesConfig } from "react-select"
import { CountryOption } from "../../redux/slices/adminFormSlice"

export const getCustomStyles = (
  isMulti: boolean
): StylesConfig<CountryOption, true> => ({
  control: (provided, state) => ({
    ...provided,
    minWidth: "128px",
    width: "max-content",
    maxWidth: "190px",
    minHeight: "27px",
    maxHeight: isMulti ? "120px" : "27px",
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
  // Other style definitions...
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
    display: "flex",
    flexWrap: "wrap",
    minHeight: "27px",
    padding: "2px 8px",
    width: "100%",
    gap: "5px",
  }),
  multiValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    margin: "2px 0",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    whiteSpace: "normal",
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
})
