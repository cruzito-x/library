import { React, useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Card, Spin, Typography, Row, Col, Table, message } from "antd";

const DashboardGraphs = ({ period }) => {
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
    const lineCtx = lineChartRef.current.getContext("2d"); // Line Chart
    const barCtx = barChartRef.current.getContext("2d"); // Bar Chart
    const doughnutCtx = doughnutChartRef.current.getContext("2d"); // Rengoku's Chart

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

    //Graphs data

    const lineData = {
      labels: [],
      datasets: [
        {
          label: "Ganancias por género",
          borderColor: "#05b0ff",
          backgroundColor: "#05b0ff",
          borderWidth: 2.5,
        }
      ],
    };

    const barData = {
      labels: [],
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
          borderColor: [
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
          borderWidth: 2.5,
        },
      ],
    };

    const doughnutData = {
      labels: [],
      datasets: [
        {
          label: ["Cantidad vendida"],
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

    // Graphs configuration

    const lineConfig = {
      type: "line",
      data: lineData,
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Géneros",
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
            title: {
              display: true,
              text: "Ventas por género",
              color: "black",
              font: {
                weight: "regular",
              },
            },
          },
        },
      },
    };

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
            title: {
              display: true,
              text: "Ventas diarias",
              color: "black",
              font: {
                weight: "regular",
              },
            },
          },
        },
      },
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

    if (lineChartInstance.current !== null) {
      lineChartInstance.current.destroy();
    }

    if (barChartInstance.current !== null) {
      barChartInstance.current.destroy();
    }

    if (doughnutChartInstance.current !== null) {
      doughnutChartInstance.current.destroy();
    }

    // Graphs instances

    lineChartInstance.current = new Chart(lineCtx, lineConfig);
    barChartInstance.current = new Chart(barCtx, barConfig);
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

  // Obtener datos de ventas por género
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/dashboard?period=${period}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos de ventas por género");
        }
        return response.json();
      })
      .then((data) => {
        const genres = data.map((item) => item.Genero); // Obtener nombres de género
        const sales = data.map((item) => item.VentasTotales); // Obtener ventas totales

        const lineData = {
          labels: genres,
          datasets: [
            {
              label: "Ganancias por género",
              data: sales,
              borderColor: "#8c8cff",
              backgroundColor: "#8c8cff",
              borderWidth: 2.5,
            },
          ],
        };

        // Actualizar datos del gráfico de línea
        if (lineChartInstance.current !== null) {
          lineChartInstance.current.data = lineData;
          lineChartInstance.current.update();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error al obtener los datos de ventas por género:",
          error
        );
        setLoading(false);
        message.error("Error al obtener los datos de ventas por género");
      });
  }, [period]);

  // Obtener la lista de las ventas del mes
  useEffect(() => {
    fetch("http://localhost:3001/dashboard/monthSales")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la lista de ventas del mes actual");
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((sale) => {
          const saleDate = new Date(sale.fecha); // Convertir la fecha a objeto Date y luego obtener partes de la fecha
          const day = saleDate.getDate().toString().padStart(2, "0"); // Día con dos dígitos
          const month = (saleDate.getMonth() + 1).toString().padStart(2, "0"); // Mes con dos dígitos (se suma 1 porque en JavaScript los meses van de 0 a 11)
          const year = saleDate.getFullYear(); // Año

          const formattedDate = `${day}-${month}-${year}`;

          return {
            fecha: formattedDate,
            total_venta: sale.total_venta,
          };
        });

        const labels = formattedData.map((sale) => sale.fecha);
        const dataValues = formattedData.map((sale) => sale.total_venta);

        // Update Bar Chart data
        if (barChartInstance.current !== null) {
          barChartInstance.current.data.labels = labels;
          barChartInstance.current.data.datasets[0].data = dataValues;
          barChartInstance.current.update();
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error al obtener la lista de ventas del mes actual:",
          error
        );
        setLoading(false);
        message.error("Error al obtener la lista de ventas del mes actual");
      });
  }, []);

  // Obtener la lista de los libros más vendidos.
  useEffect(() => {
    fetch("http://localhost:3001/dashboard/topSellers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la lista de libros más vendidos");
        }
        return response.json();
      })
      .then((data) => {
        const labels = data.map((book) => book.titulo); // Títulos  de los datos obtenidos
        const dataValues = data.map((book) => book.totalVendido); // Cantidades vendidas de los datos obtenidos

        // Actualizar datos del Rengoku's graph.
        doughnutChartInstance.current.data.labels = labels;
        doughnutChartInstance.current.data.datasets[0].data = dataValues;
        doughnutChartInstance.current.update();

        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error al obtener la lista de libros más vendidos:",
          error
        );
        setLoading(false);
        message.error("Error al obtener la lista de libros más vendidos");
      });
  }, []);

  // Obtener la lista de los últimos libros añadidos a stock.
  useEffect(() => {
    fetch("http://localhost:3001/books/latest")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la lista de libros");
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de libros:", error);
        setLoading(false);
        message.error("Error al obtener la lista de libros");
      });
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
      render: (precio) => `$${precio}`
    },
  ];

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Card style={{ marginTop: "20px" }}>
            <Spin spinning={loading} size="large" tip="Cargando...">
              <Title level={5} style={{ marginTop: "0" }}>
                Progreso de ventas
              </Title>
              <div>
                <canvas ref={lineChartRef} width="100" height="20"></canvas>
              </div>
            </Spin>
          </Card>
        </Col>
      </Row>
      <>
        <Row gutter={16}>
          <Col span={17}>
            <Card style={{ marginTop: "20px" }}>
              <Spin spinning={loading} size="large" tip="Cargando...">
                <Title level={5} style={{ marginTop: "0" }}>
                  Resumen del mes
                </Title>
                <div>
                  <canvas ref={barChartRef} width="100" height="38"></canvas>
                </div>
              </Spin>
            </Card>
          </Col>
          <Col span={7}>
            <Card style={{ marginTop: "20px" }}>
              <Spin spinning={loading} size="large" tip="Cargando...">
                <Title level={5} style={{ marginTop: "0" }}>
                  Libros más vendidos
                </Title>
                <div>
                  <canvas
                    ref={doughnutChartRef}
                    width="100"
                    height="10"
                  ></canvas>
                </div>
              </Spin>
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
              <Spin spinning={loading} size="large" tip="Cargando...">
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
                  dataSource={books.map((book, index) => ({ ...book, key: index }))} // Asignar una clave única para cada registro
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
