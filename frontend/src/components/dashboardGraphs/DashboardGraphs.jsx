import { React, useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Card, Spin, Typography, Row, Col, Table } from "antd";

const DashboardGraphs = () => {
  const { Title } = Typography;
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  let lineChartInstance = useRef(null);
  let barChartInstance = useRef(null);
  let doughnutChartInstance = useRef(null);

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
        "Domingo"
      ],
      datasets: [
        {
          label: "Aumento",
          data: [],
          borderColor: "#05b0ff",
          backgroundColor: "#05b0ff",
          borderWidth: 2.5
        },
        {
          label: "Decremento",
          data: [],
          borderColor: "#ff4040",
          backgroundColor: "#ff4040",
          borderWidth: 2.5
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
      labels: [
        
      ],
      datasets: [
        {
          label: "Ventas del mes",
          data: [],
          backgroundColor: [
            "#05b0ff",
            "#3cba9f",
            "#34495e",
            "#e74c3c",
            "#f4d03f",
            "#117baa",
            "#9b59b6",
            "#2ecc71",
            "#e67e22",
            "#1abc9c",
            "#95a5a6",
          ],
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
      "Diciembre",
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
      labels: [],
      datasets: [
        {
          label: ["Cantidad vendida"],
          data: [],
          backgroundColor: [
            "#ff6384",
            "#36a2Eb",
            "#ffce56",
            "#59ac59",
            "#6666ff",
          ],
          hoverBackgroundColor: [
            "#ff6384",
            "#36a2Eb",
            "#ffce56",
            "#59ac59",
            "#6666ff",
          ],
        },
      ],
    };

    const doughnutConfig = {
      type: "doughnut",
      data: doughnutData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
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

  const columns = [
    {
      title: "Nombre del libro",
      dataIndex: "titulo",
      key: "name",
    },
    {
      title: "Autor",
      dataIndex: "autor",
      key: "author",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "price",
    },
  ];

  useEffect(() => {
    fetch("http://localhost:3001/books/latest")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al obtener la lista de libros");
        }
        return response.json();
      })
      .then(data => {
        setBooks(data);
        setLoading(false);
        console.log(data);
      })
      .catch(error => {
        console.error("Error al obtener la lista de libros:", error);
        setLoading(false);
        message.error("Error al obtener la lista de libros");
      });
  }, []);


  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Card style={{ marginTop: "20px" }}>
            <Title level={5} style={{ marginTop: "0" }}>
              Progreso de ventas
            </Title>
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
              <Title level={5} style={{ marginTop: "0" }}>
                Resumen del mes
              </Title>
              <div>
                <canvas ref={barChartRef} width="100" height="38"></canvas>
              </div>
            </Card>
          </Col>
          <Col span={7}>
            <Card style={{ marginTop: "20px" }}>
              <Title level={5} style={{ marginTop: "0" }}>
                Libros más vendidos
              </Title>
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
              <Title level={5} style={{ marginTop: "0" }}>
                Añadido recientemente
              </Title>
              <Spin spinning={loading} size='large' tip='Cargando...'>
              <Table
                columns={columns}
                expandable={{
                  expandedRowRender: (record) => (
                    <p
                      style={{
                        margin: 0,
                      }}
                    >
                      {record.sinopsis}
                    </p>
                  ),
                  rowExpandable: (record) => record.name !== "Not Expandable",
                }}
                dataSource={books}
              />
              </Spin>
            </Card>
          </Col>
        </Row>
      </>
    </>
  );
};

export default DashboardGraphs;
