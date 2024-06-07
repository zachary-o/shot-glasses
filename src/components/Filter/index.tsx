import { useState } from "react"
import Continents from "../Continents"
import FilterTitle from "../FilterTitle"
import SearchSelect from "../SearchSelect"
import styles from "./Filter.module.scss"
import { Continent } from "../../redux/slices/adminFormSlice"

const Filter = () => {
  const [continents, setContinents] = useState<Continent[] | []>([])
  console.log("continents", continents)

  return (
    <div className={styles["filter-container"]}>
      <div>
        <FilterTitle title="Континенти" isChevronVisible={true} />
        <Continents
          isMulti={true}
          continents={continents}
          setContinents={setContinents}
        />
      </div>
      <div>
        <FilterTitle title="Країни" isChevronVisible={true} />
        <SearchSelect isMulti={true} />
      </div>
    </div>
  )
}
export default Filter
