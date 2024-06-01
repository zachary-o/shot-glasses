import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import ButtonCustom from "../ButtonCustom";
import styles from "./AdminOnlyRoute.module.scss";

interface AdminOnlyRouteProps {
  children: ReactNode | null;
}

const AdminOnlyRoute = ({ children }: AdminOnlyRouteProps) => {
  const { email } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  if (email === import.meta.env.VITE_APP_ADMIN_EMAIL) {
    return children;
  }
  return (
    <div className="container">
      <h2>Permission denied.</h2>
      <p>This page can only be viewed by an Admin.</p>
      <br />
      <ButtonCustom
        className={styles.admin}
        children="Go back"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export const AdminOnlyLink = ({ children }: AdminOnlyRouteProps) => {
  const { email } = useSelector((state: RootState) => state.auth);

  if (email === import.meta.env.VITE_APP_ADMIN_EMAIL) {
    return children;
  } else {
    return null;
  }
};

export default AdminOnlyRoute;
