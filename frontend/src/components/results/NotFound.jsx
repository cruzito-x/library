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
        style={{ marginTop: "10%" }}
      />

      <Footer style={{ backgroundColor: '#ffffff', marginTop: '11%', textAlign: "center" }}>
        cruzito's Design ©{new Date().getFullYear()} - Created by David Cruz
      </Footer>
    </>
  );
};

export default NotFound;