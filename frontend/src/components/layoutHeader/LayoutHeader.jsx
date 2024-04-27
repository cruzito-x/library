import React from 'react';
import { Layout, Typography, theme } from 'antd';

const LayoutHeader = () => {
  const { Header } = Layout;
  const { Title } = Typography;

  const {
    token : { colorBgContainer }
  } = theme.useToken();

  return (
    <Header style={{ padding: 0, background : colorBgContainer, marginTop: "-10px" }}>
      <Title level={4} style={{ marginLeft: "15px" }}> Bienvenido(a) de nuevo, username </Title>
    </Header>
  )
}

export default LayoutHeader;