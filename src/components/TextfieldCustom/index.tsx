import styles from "./TextfieldCustom.module.scss"

interface TextfieldCustomProps {
  placeholder: string
  required: boolean
  value: string
  onChange: (name: string, value: string) => void
  name: string
}

const TextfieldCustom = ({
  placeholder,
  required,
  value,
  onChange,
  name,
}: TextfieldCustomProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    onChange(value, name)
  }

  return (
    <input
      className={styles.textfield}
      type="text"
      placeholder={placeholder}
      required={required}
      name={name}
      value={value}
      onChange={handleChange}
    />
  )
}

export default TextfieldCustom
