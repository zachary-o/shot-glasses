import { useTranslation } from "react-i18next"
import CheckboxCustom from "../CheckboxCustom"
import styles from "./Continents.module.scss"

interface Continent {
  title: string
  value: string
}

const Continents = () => {
  const { t, i18n } = useTranslation()
  const continents: Continent[] = [
    {
      title: t("continent.Africa"),
      value: t("continent.Africa"),
    },
    {
      title: t("continent.Asia"),
      value: t("continent.Asia"),
    },
    {
      title: t("continent.Australia"),
      value: t("continent.Australia"),
    },
    {
      title: t("continent.Europe"),
      value: t("continent.Europe"),
    },
    {
      title: t("continent.SouthAmerica"),
      value: t("continent.SouthAmerica"),
    },
    {
      title: t("continent.NorthAmerica"),
      value: t("continent.NorthAmerica"),
    },
  ]

  return (
    <div className={styles["continents-container"]}>
      {continents.map((continent) => (
        <div key={continent.title} className={styles.continents}>
          <CheckboxCustom label={continent.title} isReactSelect={false} />
        </div>
      ))}
    </div>
  )
}

export default Continents
