import UploadCustom from "../../components/UploadCustom";
import styles from "./Admin.module.scss";

const Admin = () => {
  return (
    <div className="container">
      <h4 className={styles["admin-title"]}>Додати новеньку рюмочку</h4>
      <div className={styles["admin-inner"]}>
        <UploadCustom />
      </div>
    </div>
  );
};

export default Admin;
