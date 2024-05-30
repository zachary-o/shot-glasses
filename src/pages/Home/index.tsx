import Card from "../../components/Card";
import Filter from "../../components/Filter";
import styles from "./Home.module.scss";
import refresh from "../../assets/images/refresh.png";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
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
  );
};
export default Home;
