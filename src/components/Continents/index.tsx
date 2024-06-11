import { useTranslation } from "react-i18next"
import CheckboxCustom from "../CheckboxCustom"
import styles from "./Continents.module.scss"
import {
  Continent,
  handleContinentSelect,
  setSelectedContinent,
} from "../../redux/slices/adminFormSlice"
import { RootState, useAppDispatch } from "../../redux/store"
import { useSelector } from "react-redux"
import { useEffect, useMemo, useState } from "react"
import geoList from "../../geoData"
import {
  filterByContinents,
  serPrevSelectedCountries,
} from "../../redux/slices/filterSlice"
import { Item } from "../../redux/slices/itemsSlice"

interface ContinentsProps {
  isMulti: boolean
}

const Continents = ({ isMulti }: ContinentsProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { selectedContinent } = useSelector((state: RootState) => state.admin)
  const { items } = useSelector((state: RootState) => state.items)
  const [continents, setContinents] = useState<Continent[] | []>([])

  useEffect(() => {
    dispatch(filterByContinents({ items, continents }))
  }, [dispatch, continents, items])

  const continentsList = useMemo(() => {
    const uniqueContinentsSet = new Set(
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
  }, [])

  const handleCheckboxChange = (continent: Continent) => {
    console.log(selectedContinent, continent)
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
      dispatch(serPrevSelectedCountries(itemsBasedOnContinents))
    }
  }

  return (
    <div className={styles["continents-container"]}>
      {continentsList.map((continent) => {
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
                selectedContinent !== null &&
                (selectedContinent as Continent).nameEng ===
                  continent.nameEng &&
                (selectedContinent as Continent).nameUkr === continent.nameUkr
              }
            />
          </div>
        )
      })}
    </div>
  )
}

export default Continents
