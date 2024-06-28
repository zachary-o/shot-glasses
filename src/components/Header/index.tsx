import { useEffect, useRef } from "react"
import { auth } from "../../firebase/config"
import styles from "./Header.module.scss"

import { onAuthStateChanged } from "firebase/auth"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  loginWithGoogle,
  logoutUser,
  setActiveUser,
} from "../../redux/slices/authSlice"
import { RootState, useAppDispatch } from "../../redux/store"
import { AdminOnlyLink } from "../AdminOnlyRoute"
import ButtonCustom from "../ButtonCustom"
import { resetForm } from "../../redux/slices/adminFormSlice"
import { resetFilters } from "../../redux/slices/filterSlice"
import menuIcon from "../../assets/images/menu-icon.svg"
import menuClose from "../../assets/images/close-icon.svg"
import useWindowWidth from "../../hooks/useWindowWidth"

const Header = () => {
  const { t, i18n } = useTranslation()
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  const { items } = useSelector((state: RootState) => state.items)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navRef = useRef<HTMLDivElement>(null)
  const windowWidth = useWindowWidth()
  console.log("windowWidth", windowWidth)

  // Change language
  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  // Monitor currently signed-in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setActiveUser(user))
      }
    })
  }, [dispatch])

  // Toggle header's class name
  const showHeader = () => {
    if (navRef.current) {
      navRef.current.classList.toggle(`${styles["responsive-header"]}`)
    }
  }

  useEffect(() => {})

  return (
    <header className={styles.header}>
      {/* LEFT PART OF THE HEADER */}
      <div className={styles["header-inner"]} ref={navRef}>
        <div className={styles["header-left"]}>
          <h3
            className={styles.logo}
            onClick={() => {
              navigate("/")
              showHeader()
              dispatch(resetForm())
            }}
          >
            {t("header.logo")}
          </h3>
          <div className={styles.languages}>
            <button
              className={i18n?.language === "en" ? styles.active : ""}
              onClick={() => {
                handleChangeLanguage("en")
                dispatch(resetForm())
                dispatch(resetFilters(items))
              }}
            >
              EN
            </button>
            <button
              className={i18n?.language === "uk" ? styles.active : ""}
              onClick={() => {
                handleChangeLanguage("uk")
                dispatch(resetForm())
                dispatch(resetFilters(items))
              }}
            >
              УКР
            </button>
          </div>
        </div>
        {location.pathname !== "/dashboard" && (
          <Link
            to="/dashboard"
            className={styles["header-dashboard"]}
            onClick={() => {
              showHeader()
              dispatch(resetForm())
            }}
          >
            {t("header.dashboard")}
          </Link>
        )}
        {/* RIGHT PART OF THE HEADER */}
        <div className={styles["header-right"]}>
          {isLoggedIn ? (
            <>
              <AdminOnlyLink>
                <ButtonCustom
                  className={
                    location.pathname === "/admin"
                      ? styles.hidden
                      : styles.admin
                  }
                  onClick={() => {
                    showHeader()
                    navigate("/admin")
                  }}
                  children={t("header.admin")}
                />
              </AdminOnlyLink>
              <ButtonCustom
                className={styles.login}
                onClick={() => {
                  showHeader()
                  dispatch(logoutUser())
                }}
                children={t("header.logout")}
              />
            </>
          ) : (
            <ButtonCustom
              className={styles.login}
              onClick={() => {
                showHeader()
                dispatch(loginWithGoogle())
              }}
              children={t("header.login")}
            />
          )}
        </div>
        <ButtonCustom
          className={styles["close-menu"]}
          type="button"
          onClick={showHeader}
          children={<img src={menuClose} alt="Menu close" />}
        />
      </div>

      <div className={styles["header-mobile"]}>
        <h3
          className={styles["logo-mobile"]}
          onClick={() => {
            navigate("/")
            // showHeader();
            dispatch(resetForm())
          }}
        >
          {t("header.logo")}
        </h3>
        <div className={styles["header-mobile-right"]}>
          <div className={styles["header-mobile-languages"]}>
            <button
              className={i18n?.language === "en" ? styles.active : ""}
              onClick={() => {
                handleChangeLanguage("en")
                dispatch(resetForm())
                dispatch(resetFilters(items))
              }}
            >
              EN
            </button>
            <button
              className={i18n?.language === "uk" ? styles.active : ""}
              onClick={() => {
                handleChangeLanguage("uk")
                dispatch(resetForm())
                dispatch(resetFilters(items))
              }}
            >
              УКР
            </button>
          </div>
          <ButtonCustom
            className={styles["burger-menu"]}
            type="button"
            onClick={showHeader}
            children={<img src={menuIcon} alt="Menu" />}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
