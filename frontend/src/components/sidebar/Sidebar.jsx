import {React, useState} from 'react';
import { Button, Layout, theme } from 'antd';
import Logo from '../logo/Logo';
import MenuList from '../menuList/MenuList';
import ToggleThemeButton from '../toggleThemeButton/ToggleThemeButton';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './Sidebar.css';

const { Header, Sider, Footer } = Layout;

const Sidebar = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const toggleTheme = () => { setDarkTheme(!darkTheme);};
  const [collapsed, setCollapsed] = useState(false);

  const {
    token : { colorBgContainer }
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Sider theme={ darkTheme ? 'dark' : 'light' } collapsed={ collapsed } collapsible trigger={ null } className='sidebar'>
         <Logo/>
         <MenuList darkTheme={ darkTheme } />
         <ToggleThemeButton darkTheme={ darkTheme } toggleTheme={toggleTheme}/>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background : colorBgContainer }}>
            {/* <h2> Bienvenido(a) de vuelta, username </h2> */}
            <Button type='text' className='toggle' icon={ collapsed ? <RightOutlined /> : <LeftOutlined /> } onClick={() => setCollapsed(!collapsed)} />
          </Header>
          
          <Footer style={{ textAlign: 'center' }}>
            cruzito's Design ©{ new Date().getFullYear() } - Created by David Cruz
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Sidebar;
