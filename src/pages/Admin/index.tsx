import { FormEvent } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useSelector } from "react-redux"
import ButtonCustom from "../../components/ButtonCustom"
import Continents from "../../components/Continents"
import FilterTitle from "../../components/FilterTitle"
import Loader from "../../components/Loader"
import SearchSelect from "../../components/SearchSelect"
import TextfieldCustom from "../../components/TextfieldCustom"
import UploadCustom from "../../components/UploadCustom"
import {
  addItem,
  handleCityEngChange,
  handleCityUkrChange,
  handleDateChange,
  handleLatitudeChange,
  handleLongitudeChange,
  uploadImage,
} from "../../redux/slices/adminFormSlice"
import { RootState, useAppDispatch } from "../../redux/store"
import styles from "./Admin.module.scss"
import "./datePickerStyles.scss"
import { Timestamp } from "firebase/firestore"
import { Tooltip } from "react-tooltip"

const Admin = () => {
  const dispatch = useAppDispatch()
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
  } = useSelector((state: RootState) => state.admin)

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
    )
  }

  const handleImageUpload = (file: File[]) => {
    dispatch(uploadImage(file[0]))
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="container">
        <h4 className={styles["admin-title"]}>Додати новеньку рюмочку</h4>
        <form className={styles["admin-inner"]} onSubmit={handleFormSubmit}>
          <UploadCustom onImageUpload={handleImageUpload} />
          <div className={styles["admin-right"]}>
            <div className={styles.inputs}>
              <div className={styles.textfields}>
                <FilterTitle title="Additional info" />
                <TextfieldCustom
                  placeholder="Місто англійською"
                  required={true}
                  value={cityEng}
                  onChange={(value) => dispatch(handleCityEngChange(value))}
                  name="cityEng"
                />
                <TextfieldCustom
                  placeholder="Місто українською"
                  required={true}
                  value={cityUkr}
                  onChange={(value) => dispatch(handleCityUkrChange(value))}
                  name="cityUkr"
                />
                <TextfieldCustom
                  placeholder="Широта"
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
                    placeholder="Довгота"
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
                  placeholderText={"Дата покупки"}
                />
              </div>
              <div>
                <FilterTitle title="Країнa" />
                <SearchSelect isMulti={false} />
              </div>
              <div>
                <FilterTitle title="Континент" />
                <Continents isMulti={false} />
              </div>
            </div>
            <ButtonCustom
              type="submit"
              children="Upload"
              className={styles["upload-btn"]}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default Admin

const TooltipChild = () => {
  return (
    <p>
      If the location is in the Western Hemisphere (west of the Prime Meridian),
      you must put a "-" (negative sign) before the longitude value. For
      example, for Dallas, USA, the longitude should be entered as "-96.7970".
    </p>
  )
}
