import search from "../../assets/images/search-red.svg"
import { auth } from "../../firebase/config"
import styles from "./Header.module.scss"

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { toast } from "react-toastify"

const Header = () => {
  const provider = new GoogleAuthProvider()
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Login Successful")
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles["header-inner"]}>
          <div className={styles["header-left"]}>
            <h3 className={styles.logo}>Рюмки</h3>
            <div className={styles.languages}>
              <p>EN</p>
              <p className={styles.active}>УКР</p>
            </div>
          </div>
          <p className={styles["header-map"]}>Карта</p>
          <div className={styles["header-right"]}>
            {/* <input /> */}
            <img src={search} alt="Search" className={styles.search} />
            <button className={styles.login} onClick={signInWithGoogle}>
              Admin Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
