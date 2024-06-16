import { Timestamp } from "firebase/firestore";
import { FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import ButtonCustom from "../../components/ButtonCustom";
import Continents from "../../components/Continents";
import FilterTitle from "../../components/FilterTitle";
import Loader from "../../components/Loader";
import SearchSelect from "../../components/SearchSelect";
import TextfieldCustom from "../../components/TextfieldCustom";
import UploadCustom from "../../components/UploadCustom";
import {
  addItem,
  handleCityEngChange,
  handleCityUkrChange,
  handleDateChange,
  handleLatitudeChange,
  handleLongitudeChange,
  uploadImage,
} from "../../redux/slices/adminFormSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import styles from "./Admin.module.scss";
import "./datePickerStyles.scss";

const Admin = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    cityEng,
    cityUkr,
    countryEng,
    countryUkr,
    continentEng,
    continentUkr,
    longitude,
    latitude,
    purchaseDate,
    imageUrl,
    preview,
    selectedContinent,
    selectedCountry,
    uploadProgress,
    isLoading,
  } = useSelector((state: RootState) => state.admin);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addItem({
        cityEng,
        cityUkr,
        countryEng,
        countryUkr,
        continentEng,
        continentUkr,
        longitude,
        latitude,
        purchaseDate,
        imageUrl,
        createdAt: Timestamp.now().toDate(),
        preview,
        selectedContinent,
        selectedCountry,
        uploadProgress,
        isLoading,
      })
    );
  };

  const handleImageUpload = (file: File[]) => {
    dispatch(uploadImage(file[0]));
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="container">
        <h4 className={styles["admin-title"]}>{t("admin.addItem")}</h4>
        <form className={styles["admin-inner"]} onSubmit={handleFormSubmit}>
          <UploadCustom onImageUpload={handleImageUpload} />
          <div className={styles["admin-right"]}>
            <div className={styles.inputs}>
              <div className={styles.textfields}>
                <FilterTitle title={t("admin.additionalInfo")} />
                <TextfieldCustom
                  placeholder={t("admin.cityEng")}
                  required={true}
                  value={cityEng}
                  onChange={(value) => dispatch(handleCityEngChange(value))}
                  name="cityEng"
                />
                <TextfieldCustom
                  placeholder={t("admin.cityUkr")}
                  required={true}
                  value={cityUkr}
                  onChange={(value) => dispatch(handleCityUkrChange(value))}
                  name="cityUkr"
                />
                <TextfieldCustom
                  placeholder={t("admin.latitude")}
                  required={true}
                  value={latitude}
                  onChange={(value) => dispatch(handleLatitudeChange(value))}
                  name="latitude"
                />
                <div className={styles.longitude}>
                  <span className={styles.info} data-tooltip-id="longitude-id">
                    i
                  </span>
                  <TextfieldCustom
                    placeholder={t("admin.longitude")}
                    required={true}
                    value={longitude}
                    onChange={(value) => dispatch(handleLongitudeChange(value))}
                    name="longitude"
                  />
                  <Tooltip
                    className={styles["longitude-tooltip"]}
                    id="longitude-id"
                    noArrow
                    place="right"
                    delayHide={0}
                    render={() => <TooltipChild />}
                  />
                </div>

                <DatePicker
                  selected={purchaseDate}
                  onChange={(date) => dispatch(handleDateChange(date))}
                  className={styles["custom-datepicker"]}
                  dateFormat="dd/MM/yyyy"
                  placeholderText={t("admin.purchaseDate")}
                />
              </div>
              <div>
                <FilterTitle title={t("filter.countriesHeader")} />
                <SearchSelect isMulti={false} />
              </div>
              <div>
                <FilterTitle title={t("filter.continentsHeader")} />
                <Continents isMulti={false} />
              </div>
            </div>
            <ButtonCustom
              type="submit"
              children={t("admin.uploadBtn")}
              className={styles["upload-btn"]}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Admin;

const TooltipChild = () => {
  const { t } = useTranslation();

  return <p>{t("admin.tooltip")}</p>;
};
