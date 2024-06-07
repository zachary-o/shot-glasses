import { useEffect, useRef, useState } from "react"
import search from "../../assets/images/search-red.svg"
import { auth } from "../../firebase/config"
import styles from "./Header.module.scss"

import { onAuthStateChanged } from "firebase/auth"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  loginWithGoogle,
  logoutUser,
  setActiveUser,
} from "../../redux/slices/authSlice"
import { RootState, useAppDispatch } from "../../redux/store"
import { AdminOnlyLink } from "../AdminOnlyRoute"
import ButtonCustom from "../ButtonCustom"
import Search from "../Search"
import { filterBySearch } from "../../redux/slices/filterSlice"

const Header = () => {
  const { i18n } = useTranslation()
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  const { items } = useSelector((state: RootState) => state.items)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const searchRef = useRef<HTMLInputElement>(null)
  const [isActiveSearch, setIsActiveSearch] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  //Change language
  const handleCheckFlagLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  //Monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setActiveUser(user))
      }
    })
  }, [dispatch])

  //Toggles search input when clicking outside or on it
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

  //Search
  useEffect(() => {
    dispatch(filterBySearch({ items, searchValue }))
  }, [dispatch, searchValue, items])

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
              // style={{ marginRight: isActiveSearch ? "4px" : "" }}
            >
              Карта
            </p>
            <Search
              className={
                isActiveSearch
                  ? styles["search-input"]
                  : styles["search-input-inactive"]
              }
              ref={searchRef}
              onClick={(event) => {
                event.stopPropagation()
              }}
              spellCheck={false}
              value={searchValue}
              onChange={setSearchValue}
            />
            <img
              className={styles.search}
              style={{ display: isActiveSearch ? "none" : "" }}
              src={search}
              alt="Search"
              onClick={(e) => {
                setIsActiveSearch(true)
                searchRef.current?.focus()
                e.stopPropagation()
              }}
            />
            {isLoggedIn ? (
              <>
                <AdminOnlyLink>
                  <ButtonCustom
                    className={styles.admin}
                    onClick={() => navigate("/admin")}
                    children={"Admin"}
                  />
                </AdminOnlyLink>
                <ButtonCustom
                  className={styles.login}
                  onClick={() => dispatch(logoutUser())}
                  children={"Logout"}
                />
              </>
            ) : (
              <ButtonCustom
                className={styles.login}
                onClick={() => dispatch(loginWithGoogle())}
                children={"Login"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
