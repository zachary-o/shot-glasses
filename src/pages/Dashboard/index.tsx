import { useSelector } from "react-redux"
import { useFetchItems } from "../../firebase/useFetchItems"
import { RootState } from "../../redux/store"
import styles from "./Dashboard.module.scss"
import Loader from "../../components/Loader"
import Map from "../../components/Map"

const Dashboard = () => {
  useFetchItems()
  const { loading, items } = useSelector((state: RootState) => state.items)

  const mapItems = items.map((item) => {
    return {
      latitude: item.latitude,
      longitude: item.longitude,
      cityEng: item.cityEng,
      cityUkr: item.cityUkr,
    }
  })

  console.log(mapItems, items)

  return (
    <>
      {loading && <Loader />}
      <div className="container">
        <h4 className={styles["dashboard-title"]}>Статистика по світу</h4>
        <Map
          cityEng={mapItems[0].cityEng}
          cityUkr={mapItems[0].cityUkr}
          latitude={mapItems[0].latitude}
          longitude={mapItems[0].longitude}
          isMulti={false}
          zoom={1}
        />
      </div>
    </>
  )
}

export default Dashboard
