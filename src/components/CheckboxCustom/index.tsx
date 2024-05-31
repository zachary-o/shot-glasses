import styles from "./CheckboxCustom.module.scss"

interface CheckboxCustomProps {
  label: string
  isSelected?: boolean
  isReactSelect?: boolean
  onChange?: (e: any) => void
}

const CheckboxCustom = ({
  label,
  isSelected,
  isReactSelect,
  onChange,
}: CheckboxCustomProps) => {
  if (isReactSelect) {
    return (
      <div className={styles["checkbox-container"]}>
        <input type="checkbox" checked={isSelected} onChange={onChange} />
        <span className={styles.checkmark}></span>
        {label}
      </div>
    )
  } else {
  }
  return (
    <label className={styles["checkbox-container"]}>
      <input type="checkbox" checked={isSelected} onChange={onChange} />
      <span className={styles.checkmark}></span>
      {label}
    </label>
  )
}

export default CheckboxCustom
