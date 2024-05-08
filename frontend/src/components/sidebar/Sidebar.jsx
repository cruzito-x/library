import React, { useState, useEffect } from 'react';
import { Layout, theme } from 'antd';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Logo from '../logo/Logo';
import LayoutHeader from '../layoutHeader/LayoutHeader';
import MenuList from '../menuList/MenuList';
import Dashboard from '../../views/dashboard/Dashboard';
import Products from '../../views/products/Products';
import Bills from '../../views/bills/Bills';
import Users from '../../views/users/Users';
import Help from '../../views/help/Help';
import Genres from '../../views/extras/Genres';
import Stock from '../../views/extras/Stock';
import NotFound from '../results/NotFound';
import ToggleThemeButton from '../toggleThemeButton/ToggleThemeButton';
import './Sidebar.css';

const { Sider, Content, Footer } = Layout;

const Sidebar = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const toggleTheme = () => { setDarkTheme(!darkTheme); };
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username && location.pathname === "/") {
      navigate("/dashboard");
    } else if (!username && location.pathname !== "/") {
      navigate("/");
    }
  }, [location.pathname]);

  const navigate = (path) => {
    window.location.href = path;
  };

  const { token: { colorBgContainer } } = theme.useToken();

  const layoutStyle = {
    marginLeft: collapsed ? 80 : 200,
    transition: 'all .25s ease-in-out'
  };

  const allowedRoutes = [
    '/dashboard',
    '/books',
    '/bills',
    '/7-days',
    '/14-days',
    '/1-month',
    '/6-months',
    '/1-year',
    '/users',
    '/extras',
    '/extras/gender',
    '/extras/stock',
    '/help'
  ];

  const shouldRenderLayout = allowedRoutes.includes(location.pathname);

  if (!shouldRenderLayout) {
    return <Routes> <Route path='*' element={<NotFound />} /> </Routes>;
  }

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
            <Route path='/bills' element={<Bills />} />
            <Route path='/users' element={<Users />} />
            <Route path='/extras/gender' element={<Genres />} />
            <Route path='/extras/stock' element={<Stock />} />
            <Route path='/help' element={<Help />} />
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
