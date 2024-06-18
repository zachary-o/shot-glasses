import { useTranslation } from "react-i18next"
import Continents from "../Continents"
import FilterTitle from "../FilterTitle"
import SearchSelect from "../SearchSelect"
import styles from "./Filter.module.scss"
import { useFetchItems } from "../../firebase/useFetchItems"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

const Filter = () => {
  const { t } = useTranslation()
  const { displayedItems } = useSelector((state: RootState) => state.filter)
  const { totalItems } = useFetchItems(displayedItems)

  return (
    <div className={styles["filter-container"]}>
      <p className={styles.total}>
        {t("homePage.total")}: {totalItems}
      </p>
      <div>
        <FilterTitle title={t("filter.continentsHeader")} />
        <Continents isMulti={true} />
      </div>
      <div>
        <FilterTitle title={t("filter.countriesHeader")} />
        <SearchSelect isMulti={true} />
      </div>
    </div>
  )
}
export default Filter
