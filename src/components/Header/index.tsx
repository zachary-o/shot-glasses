import { useEffect } from "react";
import { auth } from "../../firebase/config";
import styles from "./Header.module.scss";

import { onAuthStateChanged } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  loginWithGoogle,
  logoutUser,
  setActiveUser,
} from "../../redux/slices/authSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { AdminOnlyLink } from "../AdminOnlyRoute";
import ButtonCustom from "../ButtonCustom";
import { resetForm } from "../../redux/slices/adminFormSlice";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // Change language
  const handleChangelLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // Monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setActiveUser(user));
      }
    });
  }, [dispatch]);

  return (
    <div className={styles.header}>
      <div className="container">
        {/* LEFT PART OF THE HEADER */}
        <div className={styles["header-inner"]}>
          <div className={styles["header-left"]}>
            <h3
              className={styles.logo}
              onClick={() => {
                navigate("/");
                dispatch(resetForm());
              }}
            >
              {t("header.logo")}
            </h3>
            <div className={styles.languages}>
              <button
                className={i18n?.language === "en" ? styles.active : ""}
                onClick={() => {
                  handleChangelLanguage("en");
                  dispatch(resetForm());
                }}
              >
                EN
              </button>
              <button
                className={i18n?.language === "uk" ? styles.active : ""}
                onClick={() => {
                  handleChangelLanguage("uk");
                  dispatch(resetForm());
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
              onClick={() => dispatch(resetForm())}
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
                    className={styles.admin}
                    onClick={() => navigate("/admin")}
                    children={t("header.admin")}
                  />
                </AdminOnlyLink>
                <ButtonCustom
                  className={styles.login}
                  onClick={() => dispatch(logoutUser())}
                  children={t("header.logout")}
                />
              </>
            ) : (
              <ButtonCustom
                className={styles.login}
                onClick={() => dispatch(loginWithGoogle())}
                children={t("header.login")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
