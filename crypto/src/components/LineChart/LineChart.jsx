import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];

    if (historicalData.prices) {
      historicalData.prices.forEach((item) => {
        const date = new Date(item[0]).toLocaleDateString();
        const price = item[1];
        dataCopy.push([date, price]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="400px"
      options={{
        legend: { position: "bottom" },
        hAxis: { title: "Date" },
        vAxis: { title: "Prices" },
      }}
    />
  );
};

export default LineChart;
