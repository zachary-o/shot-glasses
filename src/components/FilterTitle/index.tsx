import styles from "./FilterTitle.module.scss"

interface FilterTitleProps {
  title: string
}
const FilterTitle = ({ title }: FilterTitleProps) => {
  return <h4 className={styles.title}>{title}</h4>
}
export default FilterTitle
