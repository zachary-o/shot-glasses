import styles from "./FilterTitle.module.scss";

interface FilterTitleProps {
  title: string;
  isChevronVisible?: boolean;
}
const FilterTitle = ({ title, isChevronVisible }: FilterTitleProps) => {
  return (
    <h4
      className={
        isChevronVisible ? styles.title : styles["title-chevron-hidden"]
      }
    >
      {title}
    </h4>
  );
};
export default FilterTitle;
