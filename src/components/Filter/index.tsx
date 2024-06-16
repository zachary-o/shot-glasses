import { useTranslation } from "react-i18next";
import Continents from "../Continents";
import FilterTitle from "../FilterTitle";
import SearchSelect from "../SearchSelect";
import styles from "./Filter.module.scss";

const Filter = () => {
  const { t } = useTranslation();

  return (
    <div className={styles["filter-container"]}>
      <div>
        <FilterTitle title={t("filter.continentsHeader")} />
        <Continents isMulti={true} />
      </div>
      <div>
        <FilterTitle title={t("filter.countriesHeader")} />
        <SearchSelect isMulti={true} />
      </div>
    </div>
  );
};
export default Filter;
