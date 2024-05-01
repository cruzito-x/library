import { React, useState } from 'react';
import { Menu, theme } from 'antd';
import { ProductOutlined, BookOutlined, DownloadOutlined, PrinterOutlined, UserOutlined, PoweroffOutlined, LeftOutlined, QuestionCircleOutlined, SettingOutlined, RightOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const MenuList = ({ darkTheme, collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const [showPDF, setShowPDF] = useState(false);
  const [reportData, setReportData] = useState([]);
  

  const handleClosePDF = () => {
    setShowPDF(false);
    setReportData([]);
  };

  const {
    token : { colorBgContainer }
  } = theme.useToken();

  return (
    <Menu theme={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar' onClick={({ key }) => {
      if (key === '/sign-out') {
        window.location.href = '/';
      } else {
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
      <Menu.Item key='/help' icon={<QuestionCircleOutlined />}>
        Ayuda
      </Menu.Item>
      <Menu.SubMenu key='/settings' title='Ajustes' icon={<SettingOutlined />}>
        <Menu.Item>
          Géneros
        </Menu.Item>
      </Menu.SubMenu>
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
