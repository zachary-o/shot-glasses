import Highcharts from "highcharts/highstock"
import PieChart from "highcharts-react-official"
import FilterTitle from "../../FilterTitle"

const PieChartCustom = () => {
  const piechartOptions = {
    chart: {
      type: "pie",
      borderRadius: 10,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    title: null,
    series: [
      {
        name: "Continents",
        data: [
          {
            name: "Spain",
            y: 505370,
            z: 92.9,
          },
          {
            name: "France",
            y: 551500,
            z: 118.7,
          },
          {
            name: "Poland",
            y: 312685,
            z: 124.6,
          },
          {
            name: "Czech Republic",
            y: 78867,
            z: 137.5,
          },
          {
            name: "Italy",
            y: 301340,
            z: 201.8,
          },
          {
            name: "Switzerland",
            y: 41277,
            z: 214.5,
          },
          {
            name: "Germany",
            y: 357022,
            z: 235.6,
          },
        ],
      },
    ],
  }

  return (
    <div>
      <FilterTitle title="Статистика по континентам" />
      <PieChart highcharts={Highcharts} options={piechartOptions} />
    </div>
  )
}

export default PieChartCustom
