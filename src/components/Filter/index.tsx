import styles from "./Filter.module.scss";
import chevron from "../../assets/images/chevron_right.svg";
import search from "../../assets/images/search-gray.svg";
import Search from "../Search";

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
    <div className={styles["filter-container"]}>
      <div className={styles.filter}>
        <div className={styles["title-container"]}>
          <h4>Континенти </h4>
          <span>
            <img src={chevron} alt="Arrow" />
          </span>
        </div>

        {CONTINENTS.map((continent) => (
          <div className={styles.continents}>
            <label className={styles["checkbox-container"]} key={continent}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
              {continent}
            </label>
          </div>
        ))}
      </div>

      <div className={styles.filter}>
        <div className={styles["title-container"]}>
          <h4>Країни </h4>
          <span>
            <img src={chevron} alt="Arrow" />
          </span>
        </div>
        <div className={styles.search}>
          <img src={search} alt="" />
          <Search placeholder="Пошук" spellCheck={false} />
        </div>
      </div>
    </div>
  );
};
export default Filter;
