import { useSelector } from "react-redux"
import { useFetchItems } from "../../firebase/useFetchItems"
import { RootState } from "../../redux/store"
import styles from "./Dashboard.module.scss"
import Loader from "../../components/Loader"
import Map from "../../components/Map"
import PieChartCustom from "../../components/Highcharts/Piechart"
import BarChartCustom from "../../components/Highcharts/Barchart"

const Dashboard = () => {
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
        <h4 className={styles["dashboard-title"]}>Статистика по світу</h4>
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
