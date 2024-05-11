import { React, useState } from 'react';
import { Menu, theme } from 'antd';
import { ProductOutlined, BookOutlined, DownloadOutlined, CalendarOutlined, PrinterOutlined, UserOutlined, PoweroffOutlined, LeftOutlined, QuestionCircleOutlined, SettingOutlined, TagOutlined, StockOutlined, SafetyOutlined, HistoryOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const MenuList = ({ darkTheme, collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const {
    token : { colorBgContainer }
  } = theme.useToken();

  return (
    <Menu theme={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar' onClick={({ key }) => {
      if (key === '/sign-out') {
        window.location.href = '/';
      }
      if(key === '/reports/weekly') {
        window.location.href = '/reports/weekly#';
      }
      if(key === '/reports/biweekly') {
        window.location.href = '/reports/biweekly#';
      }
      else {
        navigate(key);
      }
    }}>
      <Menu.Item key='/dashboard' icon={<ProductOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key='/books' icon={<BookOutlined />}>
        Libros
      </Menu.Item>
      <Menu.Item key='/bills' icon={<PrinterOutlined />}>
        Facturar
      </Menu.Item>
      <Menu.SubMenu key='/reports' title='Reportes' icon={<DownloadOutlined />}>
        <Menu.Item key='/reports/weekly' icon={<CalendarOutlined />}>
          Últ. 7 días
        </Menu.Item>
        <Menu.Item key='/reports/biweekly' icon={<CalendarOutlined />}>
          Últ. 14 días
        </Menu.Item>
        <Menu.Item key='/reports/monthly' icon={<CalendarOutlined />}>
          Últ. mes
        </Menu.Item>
        <Menu.Item key='/reports/semiannual' icon={<CalendarOutlined />}>
          Últ. 6 meses
        </Menu.Item> 
        <Menu.Item key='/reports/yearly' icon={<CalendarOutlined />}>
          Últ. año
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key='/users' icon={<UserOutlined />}>
        Usuarios
      </Menu.Item>
      <Menu.SubMenu key='/extras' title='Extras' icon={<SettingOutlined />}>
        <Menu.Item key='/extras/gender' icon={<TagOutlined />}>
          Géneros
        </Menu.Item>
        <Menu.Item key='/extras/stock' icon={<StockOutlined />}>
          Existencias
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key='/help' icon={<QuestionCircleOutlined />}>
        Ayuda
      </Menu.Item>
      <Menu.Item key='/sign-out' icon={<PoweroffOutlined />}>
        Salir
      </Menu.Item>
      <Menu.Item
        key={"#"}
        icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className='toggle'
      >
        Colapsar
      </Menu.Item>
    </Menu>
  );
}

export default MenuList;
