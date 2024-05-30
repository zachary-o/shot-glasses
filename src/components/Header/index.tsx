import { useEffect, useRef, useState } from "react"
import search from "../../assets/images/search-red.svg"
import { auth } from "../../firebase/config"
import styles from "./Header.module.scss"

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { removeActiveUser, setActiveUser } from "../../redux/slices/authSlice"
import { RootState, useAppDispatch } from "../../redux/store"
import ButtonCustom from "../ButtonCustom"
import i18next from "i18next"
import { useTranslation } from "react-i18next"

const Header = () => {
  const { t, i18n } = useTranslation()
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const searchRef = useRef<HTMLInputElement>(null)
  const [isActiveSearch, setIsActiveSearch] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  console.log(i18n.language)

  //Change language
  const handleCheckFlagLanguage = (lang: string) => {
    i18next.changeLanguage(lang)
  }

  //Monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setActiveUser(user))
      }
    })
  }, [])

  //Login with Google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Login Successful")
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  //Logout
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully")
        navigate("/")
        dispatch(removeActiveUser())
      })
      .catch((error) => toast.error(error.message))
  }

  //Closes Search Input when clicking outside
  useEffect(() => {
    const handleSearchClick = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsActiveSearch(false)
        setSearchValue("")
      }
    }

    document.body.addEventListener("click", handleSearchClick)

    return () => {
      document.body.removeEventListener("click", handleSearchClick)
    }
  }, [isActiveSearch])

  console.log("isActiveSearch", isActiveSearch)

  return (
    <div className={styles.header}>
      <div className="container">
        {/* LEFT PART OF THE HEADER */}
        <div className={styles["header-inner"]}>
          <div className={styles["header-left"]}>
            <h3 className={styles.logo} onClick={() => navigate("/")}>
              Рюмки
            </h3>
            <div className={styles.languages}>
              <button
                className={i18n?.language === "en" ? styles.active : ""}
                onClick={() => handleCheckFlagLanguage("en")}
              >
                EN
              </button>
              <button
                className={i18n?.language === "uk" ? styles.active : ""}
                onClick={() => handleCheckFlagLanguage("uk")}
              >
                УКР
              </button>
            </div>
          </div>

          {/* RIGHT PART OF THE HEADER */}
          <div className={styles["header-right"]}>
            <p
              className={styles["header-map"]}
              style={{ marginRight: isActiveSearch ? "6px" : "" }}
            >
              Карта
            </p>
            <input
              className={
                isActiveSearch
                  ? styles["search-input"]
                  : styles["search-input-inactive"]
              }
              ref={searchRef}
              onClick={(event) => event.stopPropagation()}
              spellCheck={false}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <img
              className={styles.search}
              style={{ display: isActiveSearch ? "none" : "" }}
              src={search}
              alt="Search"
              onClick={(e) => {
                e.stopPropagation()
                setIsActiveSearch(true)
              }}
            />
            {isLoggedIn ? (
              <>
                <ButtonCustom
                  className={styles.admin}
                  onClick={() => navigate("/admin")}
                  children={"Admin Panel"}
                />
                <ButtonCustom
                  className={styles.login}
                  onClick={logoutUser}
                  children={"Admin Logout"}
                />
              </>
            ) : (
              <ButtonCustom
                className={styles.login}
                onClick={signInWithGoogle}
                children={"Admin Login"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
