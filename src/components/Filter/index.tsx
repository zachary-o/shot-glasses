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
  const { filteredItems } = useSelector((state: RootState) => state.filter)
  const { loading } = useSelector((state: RootState) => state.items)

  if (filteredItems.length === 0 && !loading) {
    return null
  }

  return (
    <div className={styles["filter-container"]}>
      {loading ? (
        <FilterSkeleton />
      ) : (
        <>
          <div>
            <FilterTitle title={t("filter.continentsHeader")} />
            <Continents isMulti={true} />
          </div>
          <div>
            <FilterTitle title={t("filter.countriesHeader")} />
            <SearchSelect isMulti={true} />
          </div>
        </>
      )}
    </div>
  )
}

export default Filter
