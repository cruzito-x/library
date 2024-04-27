import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import $ from "jquery";
import { Card } from "antd";

const DashboardGraphs = () => {
  const chartRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Vienna', 'Sábado', 'Domingo'],
      datasets: [
        {
          label: "Aumento",
          data: [65, 69, 80, 81, 56, 85, 70],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, .2)",
          borderWidth: 2.5,
        },
        {
          label: "Decremento",
          data: [40, 55, 56, 12, 20, 39, 35],
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, .2)",
          borderWidth: 2.5,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Ventas",
              color: "black",
              font: {
                weight: "regular",
              },
            },
            grid: {
              display: false
          }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false
          }
          },
        },
      },
    };

    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <Card style={{ marginTop: "20px" }}>
      <div>
        <canvas ref={chartRef} width="100" height="20"></canvas>
      </div>
    </Card>
  );
};

export default DashboardGraphs;
