import React from 'react';
import { Layout } from 'antd';
import './Sidebar.css';

const { Header, Sider } = Layout;

const Sidebar = () => {
  return (
    <>
      <Layout>
        <Sider className='sidebar'> Sidebar </Sider>
      </Layout>
    </>
  );
};

export default Sidebar;
