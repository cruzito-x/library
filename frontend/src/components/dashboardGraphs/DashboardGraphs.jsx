import { React, useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Card, Spin, Typography, Row, Col, Table, Empty, message } from "antd";

const DashboardGraphs = ({ period }) => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [recentBooks, setRecentBooks] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [recentSales, setRecentSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentRevenue, setRecentRevenue] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [recentInvoices, setRecentInvoices] = useState(0);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lineDataEmpty, setLineDataEmpty] = useState(false);
  const [barDataEmpty, setBarDataEmpty] = useState(false);
  const [doughnutDataEmpty, setDoughnutDataEmpty] = useState(false);
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);

  // Supongamos que el rol de superadmin está representado por "superadmin"
  const isSuperAdmin = localStorage.getItem("rol") === "superadmin";
  const { Title } = Typography;
  let lineChartInstance = useRef(null);
  let barChartInstance = useRef(null);
  let doughnutChartInstance = useRef(null);

  useEffect(() => {
    const lineCtx = lineChartRef.current.getContext("2d"); // Line Chart
    const barCtx = barChartRef.current.getContext("2d"); // Bar Chart
    const doughnutCtx = doughnutChartRef.current.getContext("2d"); // Rengoku's Chart

    // Graphs configuration

    const lineConfig = {
      type: "line",
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
      data: {
        datasets: [
          {
            label: "Total obtenido",
            backgroundColor: [
              "#ff9aa8",
              "#a3cfff",
              "#ffe8a6",
              "#8ad6d6",
              "#9999ff",
              "#ffd3b6",
              "#c9a0dc",
              "#aad8b0",
              "#ffb3e6",
              "#ffd966",
              "#84dcc6",
              "#ffc9de",
            ],
            borderColor: [
              "#ff9aa8",
              "#a3cfff",
              "#ffe8a6",
              "#8ad6d6",
              "#9999ff",
              "#ffd3b6",
              "#c9a0dc",
              "#aad8b0",
              "#ffb3e6",
              "#ffd966",
              "#84dcc6",
              "#ffc9de",
            ],
            borderWidth: 2.5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Fechas",
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
              text: "Total de ventas",
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
      data: {
        datasets: [
          {
            label: ["Cantidad vendida"],
            backgroundColor: [
              "#ff9aa8",
              "#a3cfff",
              "#ffe8a6",
              "#8AD6D6",
              "#9999ff",
            ],
            hoverBackgroundColor: [
              "#ff6384",
              "#36a2Eb",
              "#ffce56",
              "#4bc0c0",
              "#6666ff",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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

  useEffect(() => {
    setLoading(true);
    // Obtener datos de total de libros
    fetch(`http://localhost:3001/dashboard/totalBooks?period=${period}`)
      .then((response) => response.json())
      .then((data) => {
        setTotalBooks(data[0].totalBooks);
        setRecentBooks(data[0].recentBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el total de libros:", error);
        setLoading(false);
        message.error("Error al obtener el total de libros");
      });

    // Obtener datos de total de libros vendidos
    fetch(`http://localhost:3001/dashboard/totalSales?period=${period}`)
      .then((response) => response.json())
      .then((data) => {
        setTotalSales(data[0].totalSales);
        setRecentSales(data[0].recentSales);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error("Error al obtener el total de libros vendidos");
      });

    // Obtener datos de total de ganancias
    fetch(`http://localhost:3001/dashboard/totalRevenue?period=${period}`)
      .then((response) => response.json())
      .then((data) => {
        setTotalRevenue(data[0].totalRevenue);
        setRecentRevenue(data[0].recentRevenue);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error("Error al obtener el total de ganancias");
      });

    // Obtener datos de total de facturas emitidas
    fetch(`http://localhost:3001/dashboard/totalInvoices?period=${period}`)
      .then((response) => response.json())
      .then((data) => {
        setTotalInvoices(data[0].totalInvoices);
        setRecentInvoices(data[0].recentInvoices);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error("Error al obtener el total de facturas emitidas");
      });
  }, [period]);

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
        const genres = data.map((item) => item.genre);
        const sales = data.map((item) => item.totalSales);

        if (sales.length === 0) {
          setLineDataEmpty(true);
        } else {
          setLineDataEmpty(false);
          const lineData = {
            labels: genres,
            datasets: [
              {
                label: "Ganancias por género",
                data: sales,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, .5)",
                borderWidth: 2.5,
                fill: true,
                pointStyle: "circle",
                pointRadius: 7,
                pointHoverRadius: 10,
                tension: 0.8
              },
            ],
          };

          // Actualizar datos del gráfico de línea
          if (lineChartInstance.current !== null) {
            lineChartInstance.current.data = lineData;
            lineChartInstance.current.update();
          }
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de ventas por género", error);
        setLoading(false);
        message.error(error.message);
      });
  }, [period]);

  // Obtener la lista de las ventas
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/dashboard/salesResume?period=${period}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la lista de ventas");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          setBarDataEmpty(true);
        } else {
          setBarDataEmpty(false);
          const formattedData = data.map((sale) => {
            let formattedDate;
            if (sale.fecha.includes("T")) {
              const saleDate = new Date(sale.fecha);
              const day = saleDate.getDate().toString().padStart(2, "0");
              const month = (saleDate.getMonth() + 1)
                .toString()
                .padStart(2, "0");
              const year = saleDate.getFullYear();
              formattedDate = `${day}-${month}-${year}`;
            } else {
              formattedDate = sale.fecha;
            }

            return {
              fecha: formattedDate,
              total_venta: sale.total_venta,
            };
          });

          const labels = formattedData.map((sale) => sale.fecha);
          const values = formattedData.map((sale) => sale.total_venta);

          // Actualizar los datos del gráfico de barras
          if (barChartInstance.current !== null) {
            barChartInstance.current.data.labels = labels;
            barChartInstance.current.data.datasets[0].data = values;
            barChartInstance.current.update();
          }
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error al obtener la lista de ventas del mes actual: ",
          error
        );
        setLoading(false);
        message.error(error.message);
      });
  }, [period]);

  // Obtener la lista de los libros más vendidos.
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/dashboard/topSellers?period=${period}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la lista de libros más vendidos");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          setDoughnutDataEmpty(true);
        } else {
          setDoughnutDataEmpty(false);
          const labels = data.map((book) => book.titulo); // Títulos  de los datos obtenidos
          const values = data.map((book) => book.totalVendido); // Cantidades vendidas de los datos obtenidos

          // Actualizar datos del Rengoku's graph.
          if (doughnutChartInstance.current !== null) {
            doughnutChartInstance.current.data.labels = labels;
            doughnutChartInstance.current.data.datasets[0].data = values;
            doughnutChartInstance.current.update();
          }
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error al obtener la lista de libros más vendidos:",
          error
        );
        setLoading(false);
        message.error(error.message);
      });
  }, [period]);

  // Obtener la lista de los últimos libros añadidos a stock.
  useEffect(() => {
    fetch("http://localhost:3001/dashboard/latest")
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
        setLoading(false);
        message.error(error.message);
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
      render: (precio) => `$${precio}`,
    },
  ];

  return (
    <Row gutter={16}>
      {isSuperAdmin && (
        <>
          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <Card
              style={{
                marginTop: "20px",
                backgroundColor: "#ff9aa8",
                textAlign: "center",
              }}
              actions={[
                <Title level={5} style={{ marginTop: "0" }}>
                  Recientes
                </Title>,
                <Title level={5} style={{ marginTop: "0" }}>
                  {recentBooks}
                </Title>,
              ]}
            >
              <Spin spinning={loading} size="large" tip="Cargando...">
                <div style={{ fontSize: "28px" }}>
                  <Title level={5} style={{ marginTop: "0" }}>
                    Total de unidades
                  </Title>

                  {loading ? (
                    <Spin size="small" />
                  ) : (
                    <strong>{totalBooks}</strong>
                  )}
                </div>
              </Spin>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <Card
              style={{
                marginTop: "20px",
                backgroundColor: "#a3cfff",
                textAlign: "center",
              }}
              actions={[
                <Title level={5} style={{ marginTop: "0" }}>
                  Recientes
                </Title>,
                <Title level={5} style={{ marginTop: "0" }}>
                  {recentSales}
                </Title>,
              ]}
            >
              <Spin spinning={loading} size="large" tip="Cargando...">
                <Title level={5} style={{ marginTop: "0" }}>
                  Total de unidades vendidas
                </Title>
                <div style={{ fontSize: "28px" }}>
                  {loading ? (
                    <Spin size="small" />
                  ) : (
                    <strong> {totalSales} </strong>
                  )}
                </div>
              </Spin>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <Card
              style={{
                marginTop: "20px",
                backgroundColor: "#ffe8a6",
                textAlign: "center",
              }}
              actions={[
                <Title level={5} style={{ marginTop: "0" }}>
                  Recientes
                </Title>,
                <Title level={5} style={{ marginTop: "0" }}>
                  ${recentRevenue}
                </Title>,
              ]}
            >
              <Spin spinning={loading} size="large" tip="Cargando...">
                <Title level={5} style={{ marginTop: "0" }}>
                  Total de ganancias
                </Title>
                <div style={{ fontSize: "28px" }}>
                  {loading ? (
                    <Spin size="small" />
                  ) : (
                    <strong>${totalRevenue}</strong>
                  )}
                </div>
              </Spin>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <Card
              style={{
                marginTop: "20px",
                backgroundColor: "#8ad6d6",
                textAlign: "center",
              }}
              actions={[
                <Title level={5} style={{ marginTop: "0" }}>
                  Recientes
                </Title>,
                <Title level={5} style={{ marginTop: "0" }}>
                  {recentInvoices}
                </Title>,
              ]}
            >
              <Spin spinning={loading} size="large" tip="Cargando...">
                <div style={{ fontSize: "28px" }}>
                  <Title level={5} style={{ marginTop: "0" }}>
                    Total de facturas emitidas
                  </Title>
                  {loading ? (
                    <Spin size="small" />
                  ) : (
                    <strong>{totalInvoices}</strong>
                  )}
                </div>
              </Spin>
            </Card>
          </Col>
        </>
      )}
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Card style={{ marginTop: "20px" }}>
          <Spin spinning={loading} size="large" tip="Cargando...">
            <Title level={5} style={{ marginTop: "0" }}>
              Escala de ventas por género
            </Title>
            {lineDataEmpty ? (
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  alignContent: "center",
                }}
              >
                <Empty description="No hay datos disponibles" />
              </div>
            ) : (
              <div style={{ width: "100%", height: "300px" }}>
                <canvas ref={lineChartRef} width="100" height="20"></canvas>
              </div>
            )}
          </Spin>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={24} lg={17} xl={17}>
        <Card style={{ marginTop: "20px" }}>
          <Spin spinning={loading} size="large" tip="Cargando...">
            <Title level={5} style={{ marginTop: "0" }}>
              Resumen de ventas
            </Title>
            {barDataEmpty ? (
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  alignContent: "center",
                }}
              >
                <Empty description="No hay datos disponibles" />
              </div>
            ) : (
              <div style={{ width: "100%", height: "300px" }}>
                <canvas ref={barChartRef} width="100" height="38"></canvas>
              </div>
            )}
          </Spin>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={24} lg={7} xl={7}>
        <Card style={{ marginTop: "20px" }}>
          <Spin spinning={loading} size="large" tip="Cargando...">
            <Title level={5} style={{ marginTop: "0" }}>
              Libros más vendidos
            </Title>
            {doughnutDataEmpty ? (
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  alignContent: "center",
                }}
              >
                <Empty description="No hay datos disponibles" />
              </div>
            ) : (
              <div style={{ width: "100%", height: "300px" }}>
                <canvas ref={doughnutChartRef} width="100" height="10"></canvas>
              </div>
            )}
          </Spin>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
              dataSource={
                books.length === 0
                  ? null
                  : books.map((book, index) => ({
                      ...book,
                      key: index,
                    }))
              } // Asignar una clave única para cada registro
              pagination={false}
              locale={{
                emptyText: <Empty description="No hay libros disponibles" />,
              }}
              style={{ overflowX: "auto" }}
            />
          </Spin>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardGraphs;
