import styles from "./Header.module.scss"

const Header = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles["header-inner"]}>
          <div className={styles["header-left"]}>
            <h3 className={styles.logo}>Рюмки</h3>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
