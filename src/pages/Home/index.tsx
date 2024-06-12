import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import refresh from "../../assets/images/refresh.png"
import sadImg from "../../assets/images/shot-glass-sad.png"
import Card from "../../components/Card"
import Skeleton from "../../components/Card/Skeleton"
import Filter from "../../components/Filter"
import Loader from "../../components/Loader"
import { useFetchItems } from "../../firebase/useFetchItems"
import { RootState } from "../../redux/store"
import styles from "./Home.module.scss"

const Home = () => {
  const { t } = useTranslation()
  const { loading } = useSelector((state: RootState) => state.items)
  const { filteredItems } = useSelector((state: RootState) => state.filter)
  const [displayedItems, setDisplayedItems] = useState<number>(8)

  useFetchItems(displayedItems)

  // Function to fetch more items
  const fetchMoreItems = () => {
    setDisplayedItems((prevCount) => prevCount + 8)
  }

  return (
    <>
      {loading && <Loader />}
      <div className="container">
        <div className={styles["home-inner"]}>
          <h1 className={styles.title}>{t("homePage.title")}</h1>
          <div className={styles.content}>
            <Filter />
            <div className={filteredItems.length === 0 ? "" : styles.cards}>
              {loading ? (
                [...Array(8)].map((_, index) => <Skeleton key={index} />)
              ) : filteredItems.length === 0 ? (
                <div className={styles["no-items"]}>
                  <img
                    className={styles["no-items-image"]}
                    src={sadImg}
                    alt="No results"
                  />
                  <h2 className={styles["no-items-header"]}>
                    No shot glasses found
                  </h2>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    cityEng={item.cityEng}
                    cityUkr={item.cityUkr}
                    latitude={item.latitude}
                    longitude={item.longitude}
                    countryEng={item.countryEng}
                    imageUrl={item.imageUrl}
                  />
                ))
              )}
            </div>
          </div>
          <button className={styles["show-more-btn"]} onClick={fetchMoreItems}>
            <img src={refresh} alt="Show more" />
            Показати ще
          </button>
        </div>
      </div>
    </>
  )
}
export default Home
