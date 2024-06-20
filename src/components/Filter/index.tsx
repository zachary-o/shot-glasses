import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import Continents from "../Continents"
import FilterTitle from "../FilterTitle"
import SearchSelect from "../SearchSelect"
import styles from "./Filter.module.scss"
import { useFetchItems } from "../../hooks/useFetchItems"

const Filter = () => {
  const { t } = useTranslation()
  const { displayedItems, filteredItems } = useSelector(
    (state: RootState) => state.filter
  )
  const { totalItems } = useFetchItems(displayedItems)

  return (
    <div className={styles["filter-container"]}>
      <p className={styles.total}>
        {t("homePage.total")}:{" "}
        {filteredItems ? filteredItems.length : totalItems}
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
