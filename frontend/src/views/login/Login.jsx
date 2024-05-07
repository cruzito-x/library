import { React, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"
import { Card, Form, Input, Checkbox, Button, message } from "antd";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  localStorage.clear();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3001/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.status === 200) {
        const data = await response.json();

        message.success(data.message);
        localStorage.setItem("username", values.username);
        navigate("/dashboard");
      } else if (response.status === 401) {
        message.error("Nombre de usuario o contraseña incorrectos");
      } else {
        message.error(response.status);
      }
    } catch (error) {
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
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <img
            src={"logo512.png"}
            style={{ width: "75px", height: "75px", borderRadius: "50%" }}
            alt="Product photo"
          />
        </div>
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
                message: "Por favor ingrese su usuario",
              },
            ]}
          >
            <Input placeholder="Usuario" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Por favor ingrese su contraseña" },
            ]}
          >
            <Input.Password placeholder="Contraseña" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Checkbox>Recuérdame</Checkbox>
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
      </Card>
    </div>
  );
};

export default Login;
