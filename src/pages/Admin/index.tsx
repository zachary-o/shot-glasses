import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ButtonCustom from "../../components/ButtonCustom"
import Continents from "../../components/Continents"
import FilterTitle from "../../components/FilterTitle"
import SearchSelect from "../../components/SearchSelect"
import TextfieldCustom from "../../components/TextfieldCustom"
import UploadCustom from "../../components/UploadCustom"

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { FormEvent, useState } from "react"
import { db, storage } from "../../firebase/config"
import styles from "./Admin.module.scss"
import "./datePickerStyles.scss"
import { toast } from "react-toastify"
import { addDoc, collection } from "firebase/firestore"
import Loader from "../../components/Loader"

const initialState = {
  cityEng: "",
  cityUkr: "",
  countryEng: "",
  countryUkr: "",
  continentUkr: "",
  continentEng: "",
  longitude: "",
  latitude: "",
  purchaseDate: null as Date | null,
  imageUrl: "",
}

const Admin = () => {
  const [item, setItem] = useState({ ...initialState })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (name: string, value: string) => {
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }))
  }

  const handleImageChange = (file: File[]) => {
    const image = file[0]

    const storageRef = ref(storage, `shot-glasses/${Date.now()}${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadProgress(progress)
      },
      (error) => {
        toast.error(`Error occured while uploading an image: ${error.message}`)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setItem((prevItem) => ({
            ...prevItem,
            imageUrl: downloadURL,
          }))
          toast.success("Image uploaded successfully")
        })
      }
    )
  }

  const handleDateChange = (date: Date | null) => {
    setItem((prevItem) => ({
      ...prevItem,
      purchaseDate: date,
    }))
  }

  const handleContinentSelect = (nameEng: string, nameUkr: string) => {
    setItem((prevItem) => ({
      ...prevItem,
      continentEng: nameEng,
      continentUkr: nameUkr,
    }))
  }

  const handleCountrySelect = (nameEng: string, nameUkr: string) => {
    setItem((prevItem) => ({
      ...prevItem,
      countryEng: nameEng,
      countryUkr: nameUkr,
    }))
  }

  const addItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const docRef = await addDoc(collection(db, "shot-glasses"), {
        cityEng: item.cityEng,
        cityUkr: item.cityUkr,
        countryEng: item.continentEng,
        countryUkr: item.continentUkr,
        continentEng: item.continentEng,
        continentUkr: item.continentUkr,
        longitude: item.longitude,
        latitude: item.latitude,
        purchaseDate: item.purchaseDate,
        imageUrl: item.imageUrl,
      })
      setIsLoading(false)
      setUploadProgress(0)
      setItem({ ...initialState })
      toast.success("Item uploaded sucessfully")
    } catch (error) {
      setIsLoading(false)
      toast.error(`Error occured while uploading an item: ${error}`)
    }
  }

  // console.log("item", item);

  return (
    <>
      {isLoading && <Loader />}
      <div className="container">
        <h4 className={styles["admin-title"]}>Додати новеньку рюмочку</h4>
        <form className={styles["admin-inner"]} onSubmit={addItem}>
          <UploadCustom
            onImageUpload={handleImageChange}
            uploadProgress={uploadProgress}
          />
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
                <Continents onChange={handleContinentSelect} />
              </div>
              <div>
                <FilterTitle title="Країнa" isChevronVisible={false} />
                <SearchSelect isMulti={false} onChange={handleCountrySelect} />
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
