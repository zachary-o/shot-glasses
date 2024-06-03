import styles from "./CheckboxCustom.module.scss";

interface CheckboxCustomProps {
  label: string;
  isReactSelect: boolean;
  checked: boolean;
  onChange: () => void;
}

const CheckboxCustom = ({
  label,
  isReactSelect,
  checked,
  onChange,
}: CheckboxCustomProps) => {
  const handleCheck = () => {
    onChange();
  };

  if (isReactSelect) {
    return (
      <div className={styles["checkbox-container"]}>
        <input type="checkbox" checked={checked} onChange={handleCheck} />
        <span className={styles.checkmark}></span>
        {label}
      </div>
    );
  } else {
    return (
      <label className={styles["checkbox-container"]}>
        <input type="checkbox" checked={checked} onChange={handleCheck} />
        <span className={styles.checkmark}></span>
        {label}
      </label>
    );
  }
};

export default CheckboxCustom;
