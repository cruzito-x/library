import React from "react";
import { Result, Layout } from "antd";

const NotFound = () => {
  const { Footer } = Layout;

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Lo sentimos, la página deseada no existe."
        style={{ marginTop: "9.8%" }}
      />

      <Footer style={{ backgroundColor: '#ffffff', marginTop: '11%', textAlign: "center" }}>
        &copy;PagePal {new Date().getFullYear()} - All rights reserved.
      </Footer>
    </>
  );
};

export default NotFound;