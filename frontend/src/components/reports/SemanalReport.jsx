import React, { useEffect, useState } from "react";
import ReportTemplate from "./ReportTemplate";

const SemanalReport = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/sales?period=7`)
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

  return <ReportTemplate reportData={reportData} />;
};

export default SemanalReport;
