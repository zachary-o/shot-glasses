import styles from "./Continents.module.scss";
import CheckboxCustom from "../CheckboxCustom";

const CONTINENTS = [
  "Африка",
  "Азія",
  "Австралія",
  "Європа",
  "Південна Америка",
  "Північна Америка",
];

const Continents = () => {
  return CONTINENTS.map((continent) => (
    <div key={continent} className={styles.continents}>
      <CheckboxCustom label={continent} isReactSelect={false} />
    </div>
  ));
};

export default Continents;
