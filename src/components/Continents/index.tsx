import i18n from "i18next"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import geoList from "../../geoData"
import {
  Continent,
  handleContinentSelect,
  setSelectedContinent,
} from "../../redux/slices/adminFormSlice"
import {
  filterByContinents,
  setPrevSelectedCountries,
} from "../../redux/slices/filterSlice"
import { Item } from "../../redux/slices/itemsSlice"
import { RootState, useAppDispatch } from "../../redux/store"
import CheckboxCustom from "../CheckboxCustom"
import styles from "./Continents.module.scss"

interface ContinentsProps {
  isMulti: boolean
}

const Continents = ({ isMulti }: ContinentsProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { selectedContinent } = useSelector((state: RootState) => state.admin)
  const { items } = useSelector((state: RootState) => state.items)
  const [continents, setContinents] = useState<Continent[] | []>([])

  // Filter items by continents
  useEffect(() => {
    dispatch(filterByContinents({ items, continents }))
  }, [dispatch, continents, items])

  // Create a list of all continents
  const continentsList = useMemo(() => {
    let uniqueContinentsSet
    if (!isMulti) {
      uniqueContinentsSet = new Set(
        geoList.map((item) =>
          JSON.stringify({
            nameEng: item.continentEng,
            nameUkr: item.continentUkr,
          })
        )
      )

      return Array.from(uniqueContinentsSet)!.map((continentString) =>
        JSON.parse(continentString)
      )
    } else if (isMulti) {
      uniqueContinentsSet = new Set(
        items.map((item) =>
          JSON.stringify({
            nameEng: item.continentEng,
            nameUkr: item.continentUkr,
          })
        )
      )

      return Array.from(uniqueContinentsSet)!.map((continentString) =>
        JSON.parse(continentString)
      )
    }
  }, [])
  console.log("items", items)

  const handleCheckboxChange = (continent: Continent) => {
    const { nameEng, nameUkr } = continent
    if (!isMulti) {
      if (
        selectedContinent === null ||
        (selectedContinent as Continent).nameEng !== nameEng
      ) {
        dispatch(setSelectedContinent({ nameEng, nameUkr }))
        dispatch(handleContinentSelect({ nameEng, nameUkr }))
      } else if (
        (selectedContinent as Continent).nameEng === nameEng &&
        (selectedContinent as Continent).nameUkr === nameUkr
      ) {
        dispatch(setSelectedContinent(null))
        dispatch(handleContinentSelect({ nameEng: "", nameUkr: "" }))
      }
    }
    if (isMulti) {
      let updatedContinents: Continent[]
      if (continents?.some((c) => c.nameEng === nameEng)) {
        updatedContinents = continents.filter((c) => c.nameEng !== nameEng)
      } else {
        updatedContinents = [...continents, continent]
      }
      setContinents(updatedContinents)
      const itemsBasedOnContinents = items.filter((item: Item) =>
        updatedContinents.some(
          (continent) => continent.nameEng === item.continentEng
        )
      )
      dispatch(setPrevSelectedCountries(itemsBasedOnContinents))
    }
  }

  // Reset state on language change
  useEffect(() => {
    const handleLanguageChange = () => {
      setContinents([])
      dispatch(setSelectedContinent(null))
    }

    i18n.on("languageChanged", handleLanguageChange)

    return () => {
      i18n.off("languageChanged", handleLanguageChange)
    }
  }, [dispatch, i18n])

  return (
    <div className={styles["continents-container"]}>
      {continentsList?.map((continent) => {
        const translatedLabel = t(
          `continent.${continent.nameEng.replace(/\s/g, "")}`
        )

        return (
          <div key={continent.nameEng} className={styles.continents}>
            <CheckboxCustom
              label={translatedLabel}
              isReactSelect={false}
              onChange={() => handleCheckboxChange(continent)}
              checked={
                isMulti
                  ? continents.some((c) => c.nameEng === continent.nameEng)
                  : selectedContinent !== null &&
                    (selectedContinent as Continent).nameEng ===
                      continent.nameEng &&
                    (selectedContinent as Continent).nameUkr ===
                      continent.nameUkr
              }
            />
          </div>
        )
      })}
    </div>
  )
}

export default Continents
