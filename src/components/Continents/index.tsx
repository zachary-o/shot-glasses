import CheckboxCustom from "../CheckboxCustom";
import styles from "./Continents.module.scss";

const CONTINENTS = [
  "Африка",
  "Азія",
  "Австралія",
  "Європа",
  "Південна Америка",
  "Північна Америка",
];

const Continents = () => {
  return (
    <div className={styles["continents-container"]}>
      {CONTINENTS.map((continent) => (
        <div key={continent} className={styles.continents}>
          <CheckboxCustom label={continent} isReactSelect={false} />
        </div>
      ))}
    </div>
  );
};

export default Continents;
