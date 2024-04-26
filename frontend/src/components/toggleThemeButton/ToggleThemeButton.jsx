import React from 'react';
import { Button } from 'antd';
import { SunOutlined, MoonOutlined} from '@ant-design/icons';

const ToggleThemeButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className='toggle-theme-button'>
      <Button onClick={toggleTheme}>
        {darkTheme ? <SunOutlined /> : <MoonOutlined />}
      </Button>
    </div>
  )
}

export default ToggleThemeButton;