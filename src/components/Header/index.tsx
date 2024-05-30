import { useEffect, useState } from "react";
import search from "../../assets/images/search-red.svg";
import { auth } from "../../firebase/config";
import styles from "./Header.module.scss";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";

//Monitor currently signed in user
const Header = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("user.displayName", typeof user.displayName);
        if (user) {
          setUserName(user.displayName!);
        }
      } else {
        setUserName("");
      }
    });
  }, []);

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Login Successful");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully");
      })
      .catch((error) => toast.error(error.message));
  };

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
            {userName ? (
              <p>{userName}</p>
            ) : (
              <button className={styles.login} onClick={signInWithGoogle}>
                Admin Log in
              </button>
            )}
            <button className={styles.login} onClick={logoutUser}>
              Admin Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
