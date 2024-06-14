import PieChart from "highcharts-react-official"
import Highcharts from "highcharts/highstock"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Item } from "../../../redux/slices/itemsSlice"
import { RootState } from "../../../redux/store"
import styles from "./Piechart.module.scss"

const PieChartCustom = () => {
  const { items } = useSelector((state: RootState) => state.items)
  const [pieChartData, setPieChartData] = useState([])

  useEffect(() => {
    const calculatePieChartData = () => {
      const result = items.reduce((acc: any, obj: Item) => {
        if (!acc[obj.continentEng]) {
          acc[obj.continentEng] = {
            nameEng: obj.continentEng,
            nameUkr: obj.continentUkr,
            count: 1,
          }
        } else {
          acc[obj.continentEng].count += 1
        }

        return acc
      }, {})

      setPieChartData(Object.values(result))
    }
    calculatePieChartData()
  }, [items])

  const piechartOptions = {
    chart: {
      type: "pie",

      borderRadius: 10,
      width: 505,
      height: 350,
    },
    title: {
      text: "Статистика по континентам",
      align: "left",
      verticalAlign: "top",
      style: {
        color: "#141414",
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        showInLegend: true,
        allowPointSelect: true,
        cursor: "pointer",
        size: "100%",
        borderWidth: 1,
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "Continents",
        data: pieChartData.map((item: any) => {
          return {
            name: item.nameEng,
            y: item.count,
          }
        }),
      },
    ],
    legend: {
      enabled: true,
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      itemStyle: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    tooltip: {
      enabled: true,
      headerFormat: "",
      pointFormat: "{point.name}: <b>{point.y}</b>",
    },
  }

  return (
    <div className={styles["piechart-container"]}>
      <PieChart highcharts={Highcharts} options={piechartOptions} />
    </div>
  )
}

export default PieChartCustom
