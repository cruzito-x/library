import React from "react";
import { Layout, Typography, Divider, Image } from "antd";
// import DashboardScreenshot from "./dashboard-screenshot.png";
// import RegistrationScreenshot from "./registration-screenshot.png";
// import BookRegistrationScreenshot from "./book-registration-screenshot.png";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Help = () => {
  return (
    <Content style={{ padding: "0 50px", marginTop: 64 }}>
      <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
        <Title level={2}>Centro de Ayuda</Title>
        <Divider />
        <div>
          <Title level={3}>Cómo Registrarse</Title>
          <Image src={""} />
          <Paragraph>
            Para registrarse en nuestro sistema, sigue estos pasos:
            <ol>
              <li>Ve a la página de registro.</li>
              <li>Rellena el formulario con tus datos.</li>
              <li>Confirma tu correo electrónico.</li>
            </ol>
          </Paragraph>
        </div>
        <Divider />
        <div>
          <Title level={3}>Cómo Registrar un Libro</Title>
          <Image src={""} />
          <Paragraph>
            Para registrar un libro, sigue estos pasos:
            <ol>
              <li>Inicia sesión en tu cuenta.</li>
              <li>Ve al panel de control.</li>
              <li>Haz clic en "Registrar Libro".</li>
              <li>Rellena el formulario con los detalles del libro.</li>
            </ol>
          </Paragraph>
        </div>
        <Divider />
        <div>
          <Title level={3}>Cómo Funciona el Dashboard</Title>
          <Image src={""} />
          <Paragraph>
            El panel de control te permite gestionar tus libros y tu cuenta.
            Desde aquí, puedes ver tus libros registrados, editar la
            información de tu cuenta y realizar otras acciones relacionadas con
            tu biblioteca personal.
          </Paragraph>
        </div>
      </div>
    </Content>
  );
};

export default Help;
