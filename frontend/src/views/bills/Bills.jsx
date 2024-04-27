import { React, useState } from 'react';
import { PlusCircleOutlined, PlusCircleFilled, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Input, InputNumber, Space, Button, Modal, Form, Radio, Row, Col, Table, theme, Popconfirm, message } from "antd";

const Bills = () => {
  const { Content } = Layout;
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [size, setSize] = useState("medium");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "0 0 16px 0" }}>
        <Breadcrumb.Item>
          <UserOutlined /> {localStorage.getItem("username")}{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item> Facturar </Breadcrumb.Item>
      </Breadcrumb>

      <div
        style={{
          padding: 24,
          minHeight: 764,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Row gutter={16}>
          <Col span={18}>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              size={size}
            >
              Nueva factura
            </Button>
          </Col>
          <Col span={6}>
            <Search
              placeholder="Buscar"
              onSearch={onSearch}
              enterButton
            />
          </Col>
        </Row>
      </div>
      </Content>
  )
}

export default Bills;