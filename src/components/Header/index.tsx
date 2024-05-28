import styles from "./Header.module.scss";
import search from "../../assets/images/search-red.svg";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles["header-inner"]}>
          <div className={styles["header-left"]}>
            <h3 className={styles.logo}>Рюмки</h3>
            <div className={styles.languages}>
              <p>EN</p>
              <p className={styles.active}>УКР</p>
            </div>
          </div>
          <p className={styles["header-map"]}>Карта</p>
          <div className={styles["header-right"]}>
            {/* <input /> */}
            <img src={search} alt="Search" className={styles.search} />
            <button className={styles.login}>Admin Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
