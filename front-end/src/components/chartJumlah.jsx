import React from "react";
import ApexCharts from "apexcharts";

const Chart = () => {
  const options = {
    chart: {
      height: 250,
      type: "line",
    },
    series: [
      {
        name: "Income",
        data: [0, 27000, 25000, 27000, 40000],
      },
      {
        name: "Outcome",
        data: [19500, 10000, 19000, 17500, 26000],
      },
      {
        name: "Others",
        data: [8000, 2200, 6000, 9000, 10000],
      },
    ],
    xaxis: {
      categories: [
        "25 January 2023",
        "28 January 2023",
        "31 January 2023",
        "1 February 2023",
        "3 February 2023",
      ],
    },
  };

  return (
    <div>
      <ApexCharts options={options} series={options.series} type="line" height={250} />
    </div>
  );
};

export default Chart;
