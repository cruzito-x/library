import { React, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button, Layout, theme } from 'antd';
import Logo from '../logo/Logo';
import MenuList from '../menuList/MenuList';
import Dashboard from '../../views/dashboard/Dashboard';
import Products from '../../views/products/Products';
import ToggleThemeButton from '../toggleThemeButton/ToggleThemeButton';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './Sidebar.css';
const { Sider, Header, Content, Footer } = Layout;

const Sidebar = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const toggleTheme = () => { setDarkTheme(!darkTheme);};
  const [collapsed, setCollapsed] = useState(false);

  const {
    token : { colorBgContainer }
  } = theme.useToken();

  return (
    <Router>
      <Layout>
        <Sider theme={ darkTheme? 'dark' : 'light' } collapsed={ collapsed } collapsible trigger={ null } className='sidebar'>
          <Logo/>
          <Routes>
            <Route path='/*' element={<MenuList darkTheme={darkTheme} collapsed={collapsed} setCollapsed={setCollapsed} />} />
          </Routes>
          <ToggleThemeButton darkTheme={ darkTheme } toggleTheme={toggleTheme}/>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background : colorBgContainer }}>
          </Header>
          <Content>
            <Routes>
              <Route exact path='/dashboard' element={<Dashboard />} />
              <Route path='/products' element={<Products />} />
              <Route path='/*' element={<MenuList darkTheme={darkTheme} collapsed={collapsed} setCollapsed={setCollapsed} />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            cruzito's Design ©{ new Date().getFullYear() } - Created by David Cruz
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Sidebar;