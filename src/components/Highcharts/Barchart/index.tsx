import BarChart from "highcharts-react-official"
import Highcharts from "highcharts/highstock"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styles from "./BarChart.module.scss"
import { Item } from "../../../redux/slices/itemsSlice"
import { RootState } from "../../../redux/store"
import { useTranslation } from "react-i18next"

interface BarChartDataItem {
  nameEng: string
  nameUkr: string
  count: number
}

const BarChartCustom = () => {
  const { t, i18n } = useTranslation()
  const { items } = useSelector((state: RootState) => state.items)
  const [barChartData, setBarChartData] = useState<BarChartDataItem[] | []>([])
  const colors = [
    "#7cb5ec",
    "#434348",
    "#90ed7d",
    "#f7a35c",
    "#8085e9",
    "#f15c80",
    "#e4d354",
    "#2b908f",
    "#f45b5b",
    "#91e8e1",
  ]
  useEffect(() => {
    const calculateBarChartData = () => {
      const unsortedResult = items.reduce<Record<string, BarChartDataItem>>(
        (acc, obj: Item) => {
          if (!acc[obj.countryEng]) {
            acc[obj.countryEng] = {
              nameEng: obj.countryEng,
              nameUkr: obj.countryUkr,
              count: 1,
            }
          } else {
            acc[obj.countryEng].count += 1
          }

          return acc
        },
        {}
      )

      const result: BarChartDataItem[] = Object.values(unsortedResult)
        .sort((a: BarChartDataItem, b: BarChartDataItem) => b.count - a.count)
        .slice(0, 10)
      setBarChartData(result)
    }
    calculateBarChartData()
  }, [items])

  const barchartOptions = {
    chart: {
      type: "column",
      borderRadius: 10,
      // width: 505,
      height: 350,
    },
    title: {
      text: t("dashboard.countriesStats"),
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
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: barChartData.map((item: BarChartDataItem) =>
        i18n.language === "uk" ? item.nameUkr : item.nameEng
      ),
      title: {
        text: null,
      },
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
        align: "high",
      },
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
    },

    plotOptions: {
      column: {
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            rotation: -90,
            color: "#FFFFFF",
            align: "center",
            format: "{point.name}",
            style: {
              fontSize: "13px",
              textOutline: "0px",
            },
            inside: true,
            verticalAlign: "bottom",
            y: -5,
          },
          {
            enabled: true,
            format: "{point.y}",
            align: "center",
            verticalAlign: "bottom",
            inside: false,
            style: {
              color: "#141414",
              fontSize: "13px",
              fontWeight: 900,
              textOutline: "0px",
            },
          },
        ],
        borderWidth: 2,
      },
    },

    series: [
      {
        name: "",
        data: barChartData.map((item: BarChartDataItem, index: number) => {
          return {
            name: i18n.language === "uk" ? item.nameUkr : item.nameEng,
            y: item.count,
            color: colors[index % colors.length],
          }
        }),
      },
    ],
    tooltip: {
      enabled: true,
      headerFormat: "",
      pointFormat: "{point.name}: <b>{point.y}</b>",
    },
  }

  return (
    <div className={styles["barchart-container"]}>
      <BarChart highcharts={Highcharts} options={barchartOptions} />
    </div>
  )
}

export default BarChartCustom
