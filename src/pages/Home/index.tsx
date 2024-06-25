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

import ButtonCustom from "../../components/ButtonCustom"
import {
  filterBySearch,
  setDisplayedItems,
} from "../../redux/slices/filterSlice"
import { RootState, useAppDispatch } from "../../redux/store"
import styles from "./Home.module.scss"
import filterIcon from "../../assets/images/filter-icon.svg"

const Home = () => {
  const { t } = useTranslation()
  const { loading, items } = useSelector((state: RootState) => state.items)
  const { filteredItems, displayedItems } = useSelector(
    (state: RootState) => state.filter
  )
  const [searchValue, setSearchValue] = useState("")
  const panelRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  // Function to fetch more items
  const fetchMoreItems = () => {
    dispatch(setDisplayedItems(displayedItems + 8))
  }

  // Search
  useEffect(() => {
    dispatch(filterBySearch({ items, searchValue }))
  }, [dispatch, searchValue, items])

  const showPanel = () => {
    if (panelRef.current) {
      panelRef.current.classList.toggle(`${styles["filters-panel"]}`)
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className={styles["home-inner"]}>
        <h1 className={styles.title}>{t("homePage.title")}</h1>
        <div className={styles.content}>
          <div className={styles["filters-container"]}>
            <Filter />
          </div>
          <div className={styles["cards-container"]}>
            <div className={styles["search-container"]}>
              <ButtonCustom
                className={styles["filters-button"]}
                type="button"
                onClick={showPanel}
                children={
                  <div className={styles["filters-button-text"]}>
                    <span>Filters</span> <img src={filterIcon} alt="Filters" />
                  </div>
                }
              />
              <Search
                className={styles["search-input"]}
                placeholder={t("homePage.placeholder")}
                onClick={(event) => {
                  event.stopPropagation()
                }}
                spellCheck={false}
                value={searchValue}
                onChange={setSearchValue}
              />

              <img
                className={styles.search}
                src={search}
                alt="Search"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              />
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
          {/* <div className={styles["filters-panel"]} ref={panelRef}>
            <Filter />
          </div> */}
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
