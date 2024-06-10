import Continents from "../Continents"
import FilterTitle from "../FilterTitle"
import SearchSelect from "../SearchSelect"
import styles from "./Filter.module.scss"

const Filter = () => {
  return (
    <div className={styles["filter-container"]}>
      <div>
        <FilterTitle title="Континенти" isChevronVisible={true} />
        <Continents isMulti={true} />
      </div>
      <div>
        <FilterTitle title="Країни" isChevronVisible={true} />
        <SearchSelect isMulti={true} />
      </div>
    </div>
  )
}
export default Filter
