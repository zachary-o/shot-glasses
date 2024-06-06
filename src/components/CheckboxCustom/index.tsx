import styles from "./CheckboxCustom.module.scss"

interface CheckboxCustomProps {
  label?: string
  isSelected?: boolean
  isReactSelect?: boolean
  checked?: boolean
  onChange?: () => void
}

const CheckboxCustom = ({
  label,
  isSelected,
  isReactSelect,
  checked,
  onChange,
}: CheckboxCustomProps) => {
  const handleCheck = () => {
    if (onChange) {
      onChange()
    }
  }

  if (isReactSelect) {
    return (
      <div className={styles["checkbox-container"]}>
        <input
          type="checkbox"
          checked={checked || isSelected}
          onChange={handleCheck}
        />
        <span className={styles.checkmark}></span>
        {label}
      </div>
    )
  } else {
    return (
      <label className={styles["checkbox-container"]}>
        <input
          type="checkbox"
          checked={checked || isSelected}
          onChange={handleCheck}
        />
        <span className={styles.checkmark}></span>
        {label}
      </label>
    )
  }
}

export default CheckboxCustom
