import styles from "./Filter.module.scss";
import chevron from "../../assets/images/chevron_right.svg";
import search from "../../assets/images/search-gray.svg";

const CONTINENTS = [
  "Африка",
  "Азія",
  "Австралія",
  "Європа",
  "Південна Америка",
  "Північна Америка",
];

const Filter = () => {
  return (
    <div className={styles.filter}>
      <div className={styles["title-container"]}>
        <h4>Країни </h4>
        <span>
          <img src={chevron} alt="Arrow" />
        </span>
      </div>
      <div className={styles.search}>
        <img src={search} alt="" />
        <input type="text" placeholder="Пошук" />
      </div>
      {CONTINENTS.map((continent) => (
        <div className={styles.continents} key={continent}>
          <label className={styles["checkbox-container"]}>
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
            {continent}
          </label>
        </div>
      ))}
    </div>
  );
};
export default Filter;
