import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import Logo from '../logo/Logo';
import LayoutHeader from '../layoutHeader/LayoutHeader';
import MenuList from '../menuList/MenuList';
import Dashboard from '../../views/dashboard/Dashboard';
import Products from '../../views/products/Products';
import Users from '../../views/users/Users';
import ToggleThemeButton from '../toggleThemeButton/ToggleThemeButton';
import './Sidebar.css';
import { Route, Routes } from 'react-router-dom';

const { Sider, Content, Footer } = Layout;

const Sidebar = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const toggleTheme = () => { setDarkTheme(!darkTheme); };
  const [collapsed, setCollapsed] = useState(false);

  const { token: { colorBgContainer } } = theme.useToken();

  const layoutStyle = {
    marginLeft: collapsed ? 80 : 200,
    transition: 'all .25s ease-in-out'
  };

  return (
    <Layout hasSider>
      <Sider theme={darkTheme ? 'dark' : 'light'} collapsed={collapsed} collapsible trigger={null} className='sidebar' style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0
      }}>
        <Logo />
        <Routes>
          <Route path='/*' element={<MenuList darkTheme={darkTheme} collapsed={collapsed} setCollapsed={setCollapsed} />} />
        </Routes>
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout style={layoutStyle}>
        <LayoutHeader />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/books' element={<Products />} />
            <Route path='/users' element={<Users />} />
            {/* Agrega otras rutas aquí si es necesario */}
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          cruzito's Design ©{new Date().getFullYear()} - Created by David Cruz
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
