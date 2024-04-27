import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import $ from 'jquery';
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://570b-190-150-105-30.ngrok-free.app/srvr/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        message.success(data.message);
        localStorage.setItem("username", values.username);
        navigate('/dashboard');
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Hubo un problema al iniciar sesión");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        name="loginForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: 300 }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu nombre de usuario",
            },
          ]}
        >
          <Input placeholder="Nombre de Usuario" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Por favor ingresa tu contraseña" },
          ]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
