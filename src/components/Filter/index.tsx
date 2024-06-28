import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import Continents from "../Continents"
import FilterTitle from "../FilterTitle"
import SearchSelect from "../SearchSelect"
import styles from "./Filter.module.scss"

const Filter = () => {
  const { t } = useTranslation()
  const { filteredItems } = useSelector((state: RootState) => state.filter)

  if (filteredItems.length === 0) {
    return null
  }

  return (
    <div className={styles["filter-container"]}>
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
