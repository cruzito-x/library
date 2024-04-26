import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Content, Menu, theme } from 'antd';

const Dashboard = () => {
  const { Content } = Layout;
  const {
    token : { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  return (
    <>
      <Content style={{ margin: '0 16px' }} >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item> username </Breadcrumb.Item>
            <Breadcrumb.Item> Dashboard </Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 764, background: colorBgContainer, borderRadius: borderRadiusLG }} >
            Bill is a cat.
          </div>
        </Content>
    </>
  )
}

export default Dashboard;