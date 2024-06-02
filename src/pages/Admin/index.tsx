import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonCustom from "../../components/ButtonCustom";
import Continents from "../../components/Continents";
import FilterTitle from "../../components/FilterTitle";
import SearchSelect from "../../components/SearchSelect";
import TextfieldCustom from "../../components/TextfieldCustom";
import UploadCustom from "../../components/UploadCustom";

import { useState } from "react";
import styles from "./Admin.module.scss";
import "./datePickerStyles.scss";

const Admin = () => {
  const [item, setItem] = useState({
    cityEng: "",
    cityUkr: "",
    countryUkr: "",
    countryEng: "",
    continentUkr: "",
    continentEng: "",
    longitude: "",
    latitude: "",
    purchaseDate: null as Date | null,
    imageUrl: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleImageChange = (url: string | ArrayBuffer | null) => {
    setItem((prevItem) => ({
      ...prevItem,
      imageUrl: url as string,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setItem((prevItem) => ({
      ...prevItem,
      purchaseDate: date,
    }));
  };

  const handleSubmit = () => {};

  console.log("item", item);

  return (
    <div className="container">
      <h4 className={styles["admin-title"]}>Додати новеньку рюмочку</h4>
      <form className={styles["admin-inner"]}>
        <UploadCustom onImageUpload={handleImageChange} />
        <div className={styles["admin-right"]}>
          <div className={styles.inputs}>
            <div className={styles.textfields}>
              <FilterTitle title="Additional info" isChevronVisible={false} />
              <TextfieldCustom
                placeholder="Місто англійською"
                required={true}
                value={item.cityEng}
                onChange={(value) => handleInputChange("cityEng", value)}
                name="cityEng"
              />
              <TextfieldCustom
                placeholder="Місто українською"
                required={true}
                value={item.cityUkr}
                onChange={(value) => handleInputChange("cityUkr", value)}
                name="cityUkr"
              />
              <TextfieldCustom
                placeholder="Широта"
                required={true}
                value={item.latitude}
                onChange={(value) => handleInputChange("latitude", value)}
                name="latitude"
              />
              <TextfieldCustom
                placeholder="Довгота"
                required={true}
                value={item.longitude}
                onChange={(value) => handleInputChange("longitude", value)}
                name="longitude"
              />
              <DatePicker
                selected={item.purchaseDate}
                onChange={handleDateChange}
                className={styles["custom-datepicker"]}
                dateFormat="dd/MM/yyyy"
                placeholderText={"Дата покупки"}
              />
            </div>
            <div>
              <FilterTitle title="Континент" isChevronVisible={false} />
              <Continents />
            </div>
            <div>
              <FilterTitle title="Країнa" isChevronVisible={false} />
              <SearchSelect isMulti={false} />
            </div>
          </div>
          <ButtonCustom
            children="Upload"
            className={styles["upload-btn"]}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default Admin;
