import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log('Received values:', values);
    setLoading(true);

    // Aquí puedes enviar una solicitud HTTP para autenticar al usuario
    // Por ejemplo, utilizando fetch o axios

    // Simulación de una solicitud asíncrona (reemplázala con tu lógica real)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
