import chevron from "../../assets/images/chevron_right.svg"
import search from "../../assets/images/search-gray.svg"
import Continents from "../Continents"
import SearchSelect from "../SearchSelect"
import styles from "./Filter.module.scss"

interface FilterTitleProps {
  title: string
}

const FilterTitle = ({ title }: FilterTitleProps) => {
  return (
    <div className={styles["title-container"]}>
      <h4>{title} </h4>
      <span>
        <img src={chevron} alt="Arrow" />
      </span>
    </div>
  )
}

const Filter = () => {
  return (
    <div className={styles["filter-container"]}>
      <div className={styles.filter}>
        <FilterTitle title="Континенти" />
        <Continents />
      </div>

      <div className={styles.filter}>
        <FilterTitle title="Країни" />
        <div className={styles.search}>
          <img src={search} alt="Search" />
          <SearchSelect />
        </div>
      </div>
    </div>
  )
}
export default Filter
