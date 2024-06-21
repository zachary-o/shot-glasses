import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import refresh from "../../assets/images/refresh.png"
import search from "../../assets/images/search-red.svg"
import sadImg from "../../assets/images/shot-glass-sad.png"
import Card from "../../components/Card"
import Skeleton from "../../components/Card/Skeleton"
import Filter from "../../components/Filter"
import Loader from "../../components/Loader"
import Search from "../../components/Search"

import {
  filterBySearch,
  setDisplayedItems,
} from "../../redux/slices/filterSlice"
import { RootState, useAppDispatch } from "../../redux/store"
import styles from "./Home.module.scss"

const Home = () => {
  const { t } = useTranslation()
  const { loading, items } = useSelector((state: RootState) => state.items)
  const { filteredItems, displayedItems } = useSelector(
    (state: RootState) => state.filter
  )
  const [searchValue, setSearchValue] = useState("")
  const [isActiveSearch, setIsActiveSearch] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  // Function to fetch more items
  const fetchMoreItems = () => {
    dispatch(setDisplayedItems(displayedItems + 8))
  }

  // Toggles search input when clicking outside or on it
  useEffect(() => {
    const handleSearchClick = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsActiveSearch(false)
        setSearchValue("")
      }
    }

    document.body.addEventListener("click", handleSearchClick)

    return () => {
      document.body.removeEventListener("click", handleSearchClick)
    }
  }, [isActiveSearch])

  // Search
  useEffect(() => {
    dispatch(filterBySearch({ items, searchValue }))
  }, [dispatch, searchValue, items])

  return (
    <>
      {loading && <Loader />}
      <div className={styles["home-inner"]}>
        <h1 className={styles.title}>{t("homePage.title")}</h1>
        <div className={styles.content}>
          <Filter />
          <div className={styles["cards-container"]}>
            <div className={styles["search-container"]}>
              <Search
                className={styles["search-input"]}
                placeholder={t("homePage.placeholder")}
                ref={searchRef}
                onClick={(event) => {
                  event.stopPropagation()
                }}
                spellCheck={false}
                value={searchValue}
                onChange={setSearchValue}
              />
              {searchValue ? null : (
                <img
                  className={styles.search}
                  src={search}
                  alt="Search"
                  onClick={(e) => {
                    setIsActiveSearch(true)
                    searchRef.current?.focus()
                    e.stopPropagation()
                  }}
                />
              )}
            </div>
            {loading ? (
              <div className={styles.cards}>
                {[...Array(8)].map((_, index) => (
                  <Skeleton key={index} />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className={styles["no-items"]}>
                <img
                  className={styles["no-items-image"]}
                  src={sadImg}
                  alt="No results"
                />
                <h2 className={styles["no-items-header"]}>
                  {t("homePage.noItems")}
                </h2>
              </div>
            ) : (
              <div className={styles.cards}>
                {filteredItems.slice(0, displayedItems).map((item) => (
                  <Card
                    key={item.id}
                    cityEng={item.cityEng}
                    cityUkr={item.cityUkr}
                    latitude={item.latitude}
                    longitude={item.longitude}
                    countryEng={item.countryEng}
                    countryUkr={item.countryUkr}
                    imageUrl={item.imageUrl}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {filteredItems.length > 0 && (
          <button className={styles["show-more-btn"]} onClick={fetchMoreItems}>
            <img src={refresh} alt="Show more" />
            {t("homePage.showMore")}
          </button>
        )}
      </div>
    </>
  )
}
export default Home
