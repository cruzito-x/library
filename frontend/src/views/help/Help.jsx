import React from "react";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Layout, Breadcrumb, Typography, Card, Collapse, theme } from "antd";

import dashboard from "../../assets/images/dashboard.png";
import libros from "../../assets/images/libros.png";
import nuevoLibro from "../../assets/images/nuevoLibro.png";
import guardarLibro from "../../assets/images/guardarLibro.png";
import guardarLibroSuccess from "../../assets/images/guardarLibroSuccess.png";
import librosNuevaTabla from "../../assets/images/librosNuevaTabla.png";
import eliminarLibro from "../../assets/images/eliminarLibro.png";
import confirmarBorrarLibro from "../../assets/images/confirmarBorrarLibro.png";
import eliminarLibroSuccess from "../../assets/images/eliminarLibroSuccess.png";
import tablaRefreshEliminarLibro from "../../assets/images/tablaRefreshEliminarLibro.png";
import editarLibro from "../../assets/images/editarLibro.png";
import actualizarLibro from "../../assets/images/actualizarLibro.png";
import actualizarLibroSuccess from "../../assets/images/actualizarLibroSuccess.png";
import tablaRefreshActuaizarLibro from "../../assets/images/tablaRefreshActuaizarLibro.png";

const Help = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "0 0 16px 0" }}>
        <Breadcrumb.Item>
          <UserOutlined /> {localStorage.getItem("username")}
        </Breadcrumb.Item>
        <Breadcrumb.Item> Libros </Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: "86vh",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Title level={3}>
          <QuestionCircleOutlined /> Centro de ayuda
        </Title>
        <>
          <Card>
            <Title level={4}>Dashboard</Title>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={dashboard}
                style={{ width: "1180px", height: "620px" }}
              />
            </div>
            <p>
              {" "}
              En este apartado podrás visualizar de manera centralizada todo
              aquello referente a los datos más importantes registradas en el
              sistema, tales como: Tendencia de ventas por género, las ventas
              diarias registradas en el mes actual, las adiciones más recientes
              y los libros más vendidos de todo nuestro inventario.{" "}
            </p>
          </Card>
          <Title level={4}> Libros </Title>
          <Collapse
            size="large"
            items={[
              {
                key: "1",
                label: "Registrar un nuevo libro",
                children: (
                  <div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={libros}
                        style={{ width: "950px", height: "490px" }}
                      />
                    </div>
                    <p>
                      Para realizar el registro de un libro, debe dar clic sobre
                      el botón <strong> Añadir nuevo </strong> que se encuentra
                      en la parte superior del formulario:
                    </p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={nuevoLibro}
                        style={{ width: "430px", height: "120px" }}
                      />
                    </div>
                    <p> Esto desplegará el siguiente modal: </p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={guardarLibro}
                        style={{ width: "470px", height: "490px" }}
                      />
                    </div>
                    <p>
                      {" "}
                      Este debe ser rellenado con los campos solicitados para
                      proceder al registro de dicho libro, finalmente debe dar
                      clic sobre el botón <strong> Guardar </strong>. Lo cual
                      mostrará el siguiente mensaje en pantalla:{" "}
                    </p>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={guardarLibroSuccess}
                        style={{ width: "350px", height: "70px" }}
                      />
                    </div>
                    <p>
                      Mostrando que se ha registrado el libro
                      satisfactoriamente, junto con esto, se refrescará
                      automáticamente la tabla de datos.{" "}
                    </p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={librosNuevaTabla}
                        style={{ width: "1150px", height: "250px" }}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />

          <br />
          <Collapse
            size="large"
            items={[
              {
                key: "1",
                label: "Eliminar un libro",
                children: (
                  <div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={libros}
                        style={{ width: "950px", height: "490px" }}
                      />
                    </div>
                    <p>
                      Para realizar la eliminación del registro de un libro,
                      debe dar clic sobre el botón <strong> Eliminar </strong>{" "}
                      correspondiente al registro que desea eliminar
                    </p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={eliminarLibro}
                        style={{ width: "250px", height: "90px" }}
                      />
                    </div>
                    <p>
                      {" "}
                      Esto desplegará el siguiente cuadro de confirmación:{" "}
                    </p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={confirmarBorrarLibro}
                        style={{ width: "390px", height: "180px" }}
                      />
                    </div>
                    <p>
                      Si escoge la opción <strong>No</strong>, no ocurrirá nada,
                      sin embargo, si decide escoger la opción{" "}
                      <strong>Sí</strong>, esto desplegará la siguiente alerta:
                    </p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={eliminarLibroSuccess}
                        style={{ width: "350px", height: "70px" }}
                      />
                    </div>
                    <p>
                      Mostrando que se ha eliminado el registro
                      satisfactoriamente, junto con esto, se refrescará
                      automáticamente la tabla de datos.{" "}
                    </p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={tablaRefreshEliminarLibro}
                        style={{ width: "1150px", height: "450px" }}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />

          <br />
          <Collapse
            size="large"
            items={[
              {
                key: "1",
                label: "Actualizar un libro",
                children: (
                  <div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={libros}
                        style={{ width: "950px", height: "490px" }}
                      />
                    </div>
                    <p>
                    Para realizar la edición del registro de un libro, debe dar clic sobre el botón <strong> Editar </strong> correspondiente al registro que desea eliminar
                    </p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={editarLibro}
                        style={{ width: "350px", height: "120px" }}
                      />
                    </div>
                    <p> Esto desplegará el siguiente modal: </p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={actualizarLibro}
                        style={{ width: "440px", height: "510px" }}
                      />
                    </div>
                    <p>
                      {" "}
                      Este debe ser rellenado con los campos solicitados para
                      proceder a la actualización de dicho registro, finalmente debe dar
                      clic sobre el botón <strong> Guardar cambios </strong>. Lo cual
                      mostrará el siguiente mensaje en pantalla:{" "}
                    </p>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={actualizarLibroSuccess}
                        style={{ width: "350px", height: "70px" }}
                      />
                    </div>
                    <p>
                      Mostrando que se ha actualizado el registro del libro
                      satisfactoriamente, junto con esto, se refrescará
                      automáticamente la tabla de datos.{" "}
                    </p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={tablaRefreshActuaizarLibro}
                        style={{ width: "1350px", height: "50px" }}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />

          <Title level={4}> Facturar </Title>
          <Collapse
            size="large"
            items={[
              {
                key: "1",
                label: "Facturar",
                children: <p>{""}</p>,
              },
            ]}
          />

          <Title level={4}> Reportes </Title>
          <Collapse
            size="large"
            items={[
              {
                key: "1",
                label: "Reportes",
                children: <p>{""}</p>,
              },
            ]}
          />

          <Title level={4}> Géneros </Title>
          <Collapse
            size="large"
            items={[
              {
                key: "1",
                label: "Géneros",
                children: (
                  <div>
                    <Title level={4}> ¿Cómo configurar un nuevo género? </Title>
                  </div>
                ),
              },
            ]}
          />
        </>
      </div>
    </Content>
  );
};

export default Help;
