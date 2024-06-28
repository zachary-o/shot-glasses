import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import Continents from "../Continents"
import FilterTitle from "../FilterTitle"
import SearchSelect from "../SearchSelect"
import styles from "./Filter.module.scss"
import FilterSkeleton from "./FilterSkeleton"

const Filter = () => {
  const { t } = useTranslation()
  const { loading } = useSelector((state: RootState) => state.items)

  return (
    <div className={styles["filter-container"]}>
      {loading ? (
        <div className={styles["filter-container"]}>
          <FilterSkeleton />
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default Filter
