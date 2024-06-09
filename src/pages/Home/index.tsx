import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import refresh from "../../assets/images/refresh.png";
import Card from "../../components/Card";
import Skeleton from "../../components/Card/Skeleton";
import Filter from "../../components/Filter";
import Loader from "../../components/Loader";
import { db } from "../../firebase/config";
import {
  Item,
  setError,
  setItems,
  setLoading,
} from "../../redux/slices/itemsSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import styles from "./Home.module.scss";
import sadImg from "../../assets/images/shot-glass-sad.png";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading } = useSelector((state: RootState) => state.items);
  const { filteredItems } = useSelector((state: RootState) => state.filter);
  console.log("filteredItems", filteredItems);

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchItems = () => {
      try {
        const itemsRef = collection(db, "shot-glasses");
        const q = query(itemsRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
          const allItems = snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data(),
          }));
          dispatch(setItems(allItems as Item[]));
          dispatch(setLoading(false));
        });
      } catch (error) {
        dispatch(setError("Failed to fetch items"));
        dispatch(setLoading(false));
      }
    };

    fetchItems();
  }, [dispatch]);

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
                    countryEng={item.countryEng}
                    imageUrl={item.imageUrl}
                  />
                ))
              )}
            </div>
          </div>
          <button className={styles["show-more-btn"]}>
            <img src={refresh} alt="Show more" />
            Показати ще
          </button>
        </div>
      </div>
    </>
  );
};
export default Home;
