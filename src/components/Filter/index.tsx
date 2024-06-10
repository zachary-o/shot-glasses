import { useEffect, useState } from "react"
import Continents from "../Continents"
import FilterTitle from "../FilterTitle"
import SearchSelect from "../SearchSelect"
import styles from "./Filter.module.scss"
import { Continent, CountryOption } from "../../redux/slices/adminFormSlice"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../redux/store"
import {
  filterByContinents,
  filterByCountries,
} from "../../redux/slices/filterSlice"

const Filter = () => {
  const dispatch = useAppDispatch()
  const { items } = useSelector((state: RootState) => state.items)
  const [continents, setContinents] = useState<Continent[] | []>([])
  const [countries, setCountries] = useState<CountryOption[] | []>([])
  // console.log("Filter continents", continents)
  // console.log("Filter countries", countries)

  useEffect(() => {
    dispatch(filterByContinents({ items, continents }))
  }, [dispatch, continents, items])

  useEffect(() => {
    dispatch(filterByCountries({ items, countries }))
  }, [dispatch, countries, items])

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
        <SearchSelect
          isMulti={true}
          countries={countries}
          setCountries={setCountries}
        />
      </div>
    </div>
  )
}
export default Filter
