import PieChart from "highcharts-react-official"
import Highcharts from "highcharts/highstock"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Item } from "../../../redux/slices/itemsSlice"
import { RootState } from "../../../redux/store"
import styles from "./PieChart.module.scss"

interface PieChartDataItem {
  nameEng: string
  nameUkr: string
  count: number
}

const PieChartCustom = () => {
  const { t, i18n } = useTranslation()
  const { items } = useSelector((state: RootState) => state.items)
  const [pieChartData, setPieChartData] = useState<PieChartDataItem[] | []>([])

  useEffect(() => {
    const calculatePieChartData = () => {
      const result = items.reduce<Record<string, PieChartDataItem>>(
        (acc, obj: Item) => {
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
        },
        {}
      )

      setPieChartData(Object.values(result))
    }
    calculatePieChartData()
  }, [items])

  const piechartOptions = {
    chart: {
      type: "pie",

      borderRadius: 10,
      height: 350,
    },
    title: {
      text: t("dashboard.continentsStats"),
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
        data: pieChartData.map((item: PieChartDataItem) => {
          return {
            name: i18n.language === "uk" ? item.nameUkr : item.nameEng,
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
