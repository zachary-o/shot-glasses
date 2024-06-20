import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import BarChartCustom from "../../components/Highcharts/BarChart"
import PieChartCustom from "../../components/Highcharts/PieChart"
import Loader from "../../components/Loader"
import Map from "../../components/Map"
import { RootState } from "../../redux/store"
import styles from "./Dashboard.module.scss"
import { useFetchItems } from "../../hooks/useFetchItems"

const Dashboard = () => {
  const { t } = useTranslation()
  useFetchItems()
  const { loading, items } = useSelector((state: RootState) => state.items)

  const customStyles = {
    width: "100%",
    height: "540px",
    borderRadius: "10px",
    backgroundColor: "none",
    marginBottom: "40px",
  }

  return (
    <>
      {loading && <Loader />}
      <div className="container">
        <h4 className={styles["dashboard-title"]}>{t("dashboard.title")}</h4>
        <Map
          isMulti={false}
          zoom={2}
          items={items}
          customStyles={customStyles}
        />
        <div className={styles["highcharts-container"]}>
          <PieChartCustom />
          <BarChartCustom />
        </div>
      </div>
    </>
  )
}

export default Dashboard
