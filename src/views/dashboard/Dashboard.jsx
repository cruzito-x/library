import { React, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Space, Select, theme } from "antd";
import DashboardGraphs from "../../components/dashboardGraphs/DashboardGraphs";

const Dashboard = () => {
  const { Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [period, setPeriod] = useState("7");

  const handleChange = (value) => {
    setPeriod(value);
  };

  return (
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "50px 0 16px 0" }}>
          <Breadcrumb.Item> <UserOutlined /> { localStorage.getItem('username') } </Breadcrumb.Item>
          <Breadcrumb.Item> Dashboard </Breadcrumb.Item>
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
            Fecha
            <Select
              defaultValue="7"
              name="period"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "7",
                  label: "7 días",
                },
                {
                  value: "14",
                  label: "14 días",
                },
                {
                  value: "30",
                  label: "1 mes",
                },
                {
                  value: "90",
                  label: "3 meses",
                },
                {
                  value: "180",
                  label: "6 meses",
                },
                {
                  value: "365",
                  label: "1 año",
                },
              ]}
            />
          </Space>
          <Content>
              <DashboardGraphs period={period} />
            </Content>
        </div>
      </Content>
  );
};

export default Dashboard;