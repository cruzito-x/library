import React from 'react';
import { Layout, Typography, theme } from 'antd';
import $ from 'jquery';

const LayoutHeader = () => {
  const { Header } = Layout;
  const { Title } = Typography;

  const {
    token : { colorBgContainer }
  } = theme.useToken();

  return (
    <Header style={{ padding: 0, background : colorBgContainer, marginTop: "-10px", marginLeft: "-7px", position: "fixed", width: "100%", zIndex: "1"}}>
      <Title level={4} style={{ marginLeft: "15px" }}> Bienvenido(a) de nuevo, {localStorage.getItem('username')} </Title>
    </Header>
  );
}

export default LayoutHeader;