import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import BarChartCustom from "../../components/Highcharts/BarChart"
import PieChartCustom from "../../components/Highcharts/PieChart"
import Loader from "../../components/Loader"
import Map from "../../components/Map"
import { RootState } from "../../redux/store"
import styles from "./Dashboard.module.scss"
import { useFetchItems } from "../../hooks/useFetchItems"
import useWindowWidth from "../../hooks/useWindowWidth"

const Dashboard = () => {
  const windowWidth = useWindowWidth()
  const { t } = useTranslation()
  useFetchItems()
  const { loading, items } = useSelector((state: RootState) => state.items)

  const customStyles = {
    width: "100%",
    height: windowWidth <= 425 ? 300 : 540,
    borderRadius: 10,
    backgroundColor: "none",
    marginBottom: 40,
  }

  return (
    <>
      {loading && <Loader />}

      <h4 className={styles["dashboard-title"]}>{t("dashboard.title")}</h4>
      <Map isMulti={false} zoom={2} items={items} customStyles={customStyles} />
      <div className={styles["highcharts-container"]}>
        <PieChartCustom />
        <BarChartCustom />
      </div>
    </>
  )
}

export default Dashboard
