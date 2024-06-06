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

const continents: Continent[] = [
  {
    nameEng: "Africa",
    nameUkr: "Африка",
  },
  {
    nameEng: "Asia",
    nameUkr: "Азія",
  },
  {
    nameEng: "Australia",
    nameUkr: "Австралія",
  },
  {
    nameEng: "Europe",
    nameUkr: "Європа",
  },
  {
    nameEng: "South America",
    nameUkr: "Південна Америка",
  },
  {
    nameEng: "North America",
    nameUkr: "Північна Америка",
  },
]

interface ContinentsProps {
  isMulti: boolean
}

const Continents = ({ isMulti }: ContinentsProps) => {
  const { selectedContinent } = useSelector((state: RootState) => state.admin)

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const handleCheckboxChange = (continent: Continent) => {
    console.log(selectedContinent, continent)
    const { nameEng, nameUkr } = continent
    if (!isMulti) {
      if (selectedContinent === null) {
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
  }

  return (
    <div className={styles["continents-container"]}>
      {continents.map((continent) => {
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
