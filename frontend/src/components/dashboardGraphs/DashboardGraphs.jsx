import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Card, Divider, Typography, Row, Col } from "antd";

const DashboardGraphs = () => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  let lineChartInstance = useRef(null);
  let barChartInstance = useRef(null);
  let doughnutChartInstance = useRef(null);
  const { Title } = Typography;

  useEffect(() => {
    // Line Chart
    const lineCtx = lineChartRef.current.getContext("2d");

    const lineData = {
      labels: [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ],
      datasets: [
        {
          label: "Aumento",
          data: [65, 69, 80, 81, 56, 85, 70],
          borderColor: "#05b0ff",
          backgroundColor: "#a8e3ff",
          borderWidth: 2.5,
        },
        {
          label: "Decremento",
          data: [40, 55, 56, 12, 20, 39, 35],
          borderColor: "#ff4040",
          backgroundColor: "#ffb3b3",
          borderWidth: 2.5,
        },
      ],
    };

    const lineConfig = {
      type: "line",
      data: lineData,
      options: {
        responsive: true,
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
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
        },
      },
    };

    if (lineChartInstance.current !== null) {
      lineChartInstance.current.destroy();
    }

    lineChartInstance.current = new Chart(lineCtx, lineConfig);

    // Bar Chart
    const barCtx = barChartRef.current.getContext("2d");

    const barData = {
      labels: ['Libro 1', 'Libro 2', 'Libro 3', 'Libro 4', 'Libro 5', 'Libro 6', 'Libro 7', 'Libro 8', 'Libro 9', 'Libro 10'],
      datasets: [
        {
          label: "Ventas del mes",
          data: [20, 30, 40, 50, 60, 70, 80, 50, 80, 102],
          backgroundColor: ["#3cba9f", "#05b0ff"],
          borderWidth: 1,
        },
      ],
    };

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];

    const barConfig = {
      type: "bar",
      data: barData,
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: monthNames[new Date().getMonth()],
              color: "black",
              font: {
                weight: "regular",
              },
            },
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
        },
      },
    };

    if (barChartInstance.current !== null) {
      barChartInstance.current.destroy();
    }

    barChartInstance.current = new Chart(barCtx, barConfig);

    // Doughnut Chart
    const doughnutCtx = doughnutChartRef.current.getContext("2d");

    const doughnutData = {
      labels: ['Libro 1', 'Libro 2', 'Libro 3', 'Libro 4', 'Libro 5'],
      datasets: [{
        label: ['Cantidad vendida'],
        data: [150, 100, 80, 70, 60],
        backgroundColor: [
          '#ff6384',
          '#36a2Eb',
          '#ffce56',
          '#59ac59',
          '#6666ff'
        ],
        hoverBackgroundColor: [
          '#ff6384',
          '#36a2Eb',
          '#ffce56',
          '#59ac59',
          '#6666ff'
        ]
      }]
    };

    const doughnutConfig = {
      type: 'doughnut',
      data: doughnutData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      },
    };

    if (doughnutChartInstance.current !== null) {
      doughnutChartInstance.current.destroy();
    }

    doughnutChartInstance.current = new Chart(doughnutCtx, doughnutConfig);

    return () => {
      if (lineChartInstance.current !== null) {
        lineChartInstance.current.destroy();
      }

      if (barChartInstance.current !== null) {
        barChartInstance.current.destroy();
      }

      if (doughnutChartInstance.current !== null) {
        doughnutChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Card style={{ marginTop: "20px" }}>
          <Title level={5} style={{ marginTop: "0" }}> Progreso de ventas </Title>
            <div>
              <canvas ref={lineChartRef} width="100" height="20"></canvas>
            </div>
          </Card>
        </Col>
      </Row>
      <>
        <Row gutter={16}>
          <Col span={17}>
            <Card style={{ marginTop: "20px" }}>
            <Title level={5} style={{ marginTop: "0" }}> Resumen del mes </Title>
              <div>
                <canvas ref={barChartRef} width="100" height="38"></canvas>
              </div>
            </Card>
          </Col>
          <Col span={7}>
            <Card style={{ marginTop: "20px" }}>
            <Title level={5} style={{ marginTop: "0" }}> Libros más vendidos </Title>
              <div>
                <canvas ref={doughnutChartRef} width="100" height="10"></canvas>
              </div>
            </Card>
          </Col>
        </Row>
      </>
      <>
      <Row gutter={16}>
        <Col span={24}>
          <Card style={{ marginTop: "20px" }}>
          <Title level={5} style={{ marginTop: "0" }}> Recientemente añadido </Title>
          </Card>
        </Col>
      </Row>
      </>
    </>
  );
};

export default DashboardGraphs;
