import Continents from "../Continents";
import FilterTitle from "../FilterTitle";
import SearchSelect from "../SearchSelect";
import styles from "./Filter.module.scss";

const Filter = () => {
  return (
    <div className={styles["filter-container"]}>
      <div>
        <FilterTitle title="Країни" isChevronVisible={true} />
        <Continents />
      </div>
      <div>
        <FilterTitle title="Континенти" isChevronVisible={true} />
        <SearchSelect isMulti={true} />
      </div>
    </div>
  );
};
export default Filter;
{
  /**/
}
{
  /* */
}
