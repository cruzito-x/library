import React, { useEffect, useState } from "react";
import ReportTemplate from "./ReportTemplate";

const Report = ({ period }) => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.0.6:3001/sales/getSalesReportData?period=${period}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos de ventas");
        }
        return response.json();
      })
      .then((data) => {
        setReportData(data);
      })
      .catch((error) => {
        console.error(
          "Error al obtener los datos de ventas por género:",
          error
        );
      });
  }, []);

  return <ReportTemplate reportData={reportData} period={period} />;
};

export default Report;
