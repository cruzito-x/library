import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  AreaChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Input, Space, theme } from "antd";

const Products = () => {
  const { Content } = Layout;
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "0 0 16px 0" }}>
          <Breadcrumb.Item> <UserOutlined /> { localStorage.getItem('username') } </Breadcrumb.Item>
          <Breadcrumb.Item> Libros </Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 764,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Space wrap>
          <Search placeholder="input search text" onSearch={onSearch} enterButton />
          </Space>
        </div>
      </Content>
  );
};

export default Products