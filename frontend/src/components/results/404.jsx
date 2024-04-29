import React from 'react';
import { Result } from 'antd';

const NotFound = () => {
  return (
    <Result
    status="404"
    title="404"
    subTitle="Lo sentimos, la página deseada no existe."
  />
  )
}

export default NotFound;