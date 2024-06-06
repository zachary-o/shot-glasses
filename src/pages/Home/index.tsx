import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import refresh from "../../assets/images/refresh.png"
import Card from "../../components/Card"
import Filter from "../../components/Filter"
import { RootState, useAppDispatch } from "../../redux/store"
import styles from "./Home.module.scss"
import { setItems } from "../../redux/slices/itemsSlice"
setItems

const Home = () => {
  const { t } = useTranslation()
  const { items } = useSelector((state: RootState) => state.items)
  // const [items, setItems] = useState<any>([])
  console.log("items", items)
  const dispatch = useAppDispatch()
  // useEffect(() => {
  //   fetchItems()
  // }, [])

  // const fetchItems = () => {
  //   try {
  //     const itemsRef = collection(db, "shot-glasses")
  //     const q = query(itemsRef, orderBy("cityEng", "desc"))
  //     onSnapshot(q, (snapshot) => {
  //       const allItems = snapshot.docs.map((item) => ({
  //         id: item.id,
  //         ...item.data(),
  //       }))
  //       setItems(allItems)
  //     })
  //   } catch (error) {}
  // }

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div className="container">
        <h1 className={styles.title}>{t("homePage.title")}</h1>
        <div className={styles.content}>
          <Filter />
          <div className={styles.cards}>
            {[...Array(8)].map((_, index) => (
              <Card key={index} />
            ))}
          </div>
        </div>
        <button className={styles["show-more-btn"]}>
          <img src={refresh} alt="Show more" />
          Показати ще
        </button>
      </div>
    </>
  )
}
export default Home
