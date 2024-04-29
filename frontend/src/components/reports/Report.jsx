import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Template from './Template';

const Report = () => {
  const title = "Reporte de ventas";
  const data = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  ];

  return (
    <div style={{ height: "86vh", marginTop: "40px" }}>
      <PDFViewer width="100%" height="100%" style={{  }}>
      <Template title={title} data={data} />
    </PDFViewer>
    </div>
  );
};

export default Report;
