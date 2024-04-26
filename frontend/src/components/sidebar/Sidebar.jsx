import {React, useState} from 'react';
import { Button, Layout, theme } from 'antd';
import Logo from '../logo/Logo';
import MenuList from '../menuList/MenuList';
import ToggleThemeButton from '../toggleThemeButton/ToggleThemeButton';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './Sidebar.css';

const { Header, Sider } = Layout;

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
            <Button type='text' className='toggle' icon={ collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> } onClick={() => setCollapsed(!collapsed)} />
          </Header>
        </Layout>
      </Layout>
    </>
  );
};

export default Sidebar;
