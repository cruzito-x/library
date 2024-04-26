import React from 'react';
import { Menu } from 'antd';
import { AreaChartOutlined, ProductOutlined, GoldOutlined, FileTextOutlined, ExportOutlined, PrinterOutlined, UserOutlined, PoweroffOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const MenuList = ({ darkTheme }) => {
  const navigate = useNavigate();

  return (
    <Menu theme={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar' onClick={({ key }) => {
      if (key === '/sign-out') {
        window.location.href = '/';
      } else {
        navigate(key);
      }
    }}>
      <Menu.Item key='/dashboard' icon={<AreaChartOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key='/products' icon={<GoldOutlined />}>
        Productos
      </Menu.Item>
      <Menu.Item key='/bill' icon={<PrinterOutlined />}>
        Generar factura
      </Menu.Item>
      <Menu.SubMenu key='/sales' title='Ventas' icon={<FileTextOutlined />}>
        <Menu.Item key='7-days'>
          Últimos 7 días
        </Menu.Item>
        <Menu.Item key='14-days'>
          Últimos 14 días
        </Menu.Item>
        <Menu.Item key='1-month'>
          Último mes
        </Menu.Item>
        <Menu.Item key='6-months'>
          Últimos 6 meses
        </Menu.Item> 
        <Menu.Item key='1-year'>
          Último año
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key='/users' icon={<UserOutlined />}>
        Usuarios
      </Menu.Item>
      <Menu.Item key='/sign-out' icon={<PoweroffOutlined />}>
        Salir
      </Menu.Item>
    </Menu>
  );
}

export default MenuList;
