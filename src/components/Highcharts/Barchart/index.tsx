import BarChart from "highcharts-react-official"
import Highcharts from "highcharts/highstock"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styles from "./Barchart.module.scss"
import { Item } from "../../../redux/slices/itemsSlice"
import { RootState } from "../../../redux/store"

interface ChartDataItem {
  nameEng: string
  nameUkr: string
  count: number
}

const BarChartCustom = () => {
  const { items } = useSelector((state: RootState) => state.items)
  const [barChartData, setBarChartData] = useState<ChartDataItem[] | []>([])

  useEffect(() => {
    const calculateBarChartData = () => {
      const unsortedResult = items.reduce<Record<string, ChartDataItem>>(
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

      const result: ChartDataItem[] = Object.values(unsortedResult)
        .sort((a: ChartDataItem, b: ChartDataItem) => b.count - a.count)
        .slice(0, 10)
      setBarChartData(result)
    }
    calculateBarChartData()
  }, [items])

  console.log("barChartData", barChartData)

  const barchartOptions = {
    chart: {
      type: "column", // Change to "column" for vertical bars
      borderRadius: 10,
      width: 505,
      height: 350,
    },
    title: {
      text: "ТОП 10 країн",
      align: "left",
      verticalAlign: "top",
      style: {
        color: "#141414",
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: barChartData.map((item: ChartDataItem) => item.nameEng),
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Кількість",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " items",
    },
    plotOptions: {
      column: {
        // Specific options for column chart
        dataLabels: {
          enabled: true,
        },
        borderWidth: 2, // Adjust border width if needed
      },
    },
    series: [
      {
        name: "Countries",
        data: barChartData.map((item: ChartDataItem) => item.count),
      },
    ],
  }

  return (
    <div className={styles["barchart-container"]}>
      <BarChart highcharts={Highcharts} options={barchartOptions} />
    </div>
  )
}

export default BarChartCustom
