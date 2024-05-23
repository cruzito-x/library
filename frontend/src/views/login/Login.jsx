import { React, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  localStorage.clear();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.status === 200) {
        message.success(data.message);
        localStorage.setItem("idUsuario", data.id);
        localStorage.setItem("username", values.username);
        localStorage.setItem("rol", data.rol);
        navigate("/dashboard");
      } else {
        if (response.status === 401 || response.status === 500) {
          message.error(data.message);
        }
      }
    } catch (error) {
      message.error("Ha ocurrido un error inesperado, por favor intente de nuevo");
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
            style={{ width: "150px", height: "75px", borderRadius: "50%" }}
            alt="Product photo"
          />
        </div>
        <Form
          name="loginForm"
          layout={"vertical"}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ width: 300 }}
        >
          <Form.Item
            label="Usuario:"
            name="username"
            rules={[
              {
                message: "Por favor ingrese su usuario",
              },
            ]}
          >
            <Input placeholder="Usuario" />
          </Form.Item>

          <Form.Item
            label="Contraseña:"
            name="password"
            rules={[{ message: "Por favor ingrese su contraseña" }]}
          >
            <Input.Password
              placeholder="Contraseña"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
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
