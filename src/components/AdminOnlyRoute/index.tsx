import { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../redux/store"
import ButtonCustom from "../ButtonCustom"
import styles from "./AdminOnlyRoute.module.scss"

interface AdminOnlyRouteProps {
  children: ReactNode | null
}

const AdminOnlyRoute = ({ children }: AdminOnlyRouteProps) => {
  const { t } = useTranslation()
  const { email } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  if (email === import.meta.env.VITE_APP_ADMIN_EMAIL) {
    return children
  }
  return (
    <div className="container">
      <h2>{t("adminRoute.permissionDenied")}</h2>
      <p>{t("adminRoute.textInfo")}</p>
      <br />
      <ButtonCustom
        className={styles.admin}
        children={t("adminRoute.backBtn")}
        onClick={() => navigate("/")}
      />
    </div>
  )
}

export const AdminOnlyLink = ({ children }: AdminOnlyRouteProps) => {
  const { email } = useSelector((state: RootState) => state.auth)

  if (email === import.meta.env.VITE_APP_ADMIN_EMAIL) {
    return children
  } else {
    return null
  }
}

export default AdminOnlyRoute
