import React from "react";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Layout, Breadcrumb, Typography, Card, Collapse, theme } from "antd";

import dashboard from "../../assets/images/dashboard.png";
import books from "../../assets/images/books.png";
import newBook from "../../assets/images/newBook.png";
import saveBook from "../../assets/images/saveBook.png";
import successBookSaved from "../../assets/images/successBookSaved.png";
import newBookInTable from "../../assets/images/newBookInTable.png";
import deleteButton from "../../assets/images/deleteButton.png";
import confirmDeleteBook from "../../assets/images/confirmDeleteBook.png";
import successBookDeleted from "../../assets/images/successBookDeleted.png";
import refreshBooksTableAfterDelete from "../../assets/images/refreshBooksTableAfterDelete.png";
import editButton from "../../assets/images/editButton.png";
import updateBook from "../../assets/images/updateBook.png";
import successBookUpdated from "../../assets/images/successBookUpdated.png";
import refreshBooksTableAfterUpdate from "../../assets/images/refreshBooksTableAfterUpdate.png";
import genres from "../../assets/images/genres.png";
import stock from "../../assets/images/stock.png";
import editStock from "../../assets/images/editStock.png";
import successStockUpdated from "../../assets/images/successStockUpdated.png";
import confirmDeleteStock from "../../assets/images/confirmDeleteStock.png";
import successStockDeleted from "../../assets/images/successStockDeleted.png";
import refreshStockTableAfterDelete from "../../assets/images/refreshStockTableAfterDelete.png";
import activateButton from "../../assets/images/activateButton.png";
import successStockActivation from "../../assets/images/successStockActivation.png";
import refreshStockTableAfterActivate from "../../assets/images/refreshStockTableAfterActivate.png";

const Help = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "50px 0 16px 0" }}>
        <Breadcrumb.Item>
          <UserOutlined /> {localStorage.getItem("username")}
        </Breadcrumb.Item>
        <Breadcrumb.Item> Ayuda </Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: "86vh",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Title level={3} style={{ marginTop: "-3px" }}>
          <QuestionCircleOutlined /> Ayuda
        </Title>
        <>
          <Card type="inner" title="Dashboard">
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

          <br />

          <Collapse
            size="large"
            items={[
              {
                key: "0",
                label: "Libros",
                children: (
                  <>
                    <Collapse
                      size="large"
                      items={[
                        {
                          key: "1",
                          label: "Registrar un nuevo libro",
                          children: (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={books}
                                  style={{ width: "950px", height: "490px" }}
                                />
                              </div>
                              <p>
                                Para realizar el registro de un libro, debe dar
                                clic sobre el botón{" "}
                                <strong> Añadir nuevo </strong> que se encuentra
                                en la parte superior del formulario:
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={newBook}
                                  style={{ width: "430px", height: "120px" }}
                                />
                              </div>
                              <p> Esto desplegará el siguiente modal: </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={saveBook}
                                  style={{ width: "470px", height: "490px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Este debe ser rellenado con los campos
                                solicitados para proceder al registro de dicho
                                libro, finalmente debe dar clic sobre el botón{" "}
                                <strong> Guardar </strong>. Lo cual mostrará el
                                siguiente mensaje en pantalla:{" "}
                              </p>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={successBookSaved}
                                  style={{ width: "350px", height: "70px" }}
                                />
                              </div>
                              <p>
                                Mostrando que se ha registrado el libro
                                satisfactoriamente, junto con esto, se
                                refrescará automáticamente la tabla de datos.{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={newBookInTable}
                                  style={{ width: "1150px", height: "250px" }}
                                />
                              </div>
                            </>
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
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={books}
                                  style={{ width: "950px", height: "490px" }}
                                />
                              </div>
                              <p>
                                Para realizar la eliminación del registro de un
                                libro, debe dar clic sobre el botón{" "}
                                <strong> Eliminar </strong> correspondiente al
                                registro que desea eliminar
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={deleteButton}
                                  style={{ width: "150px", height: "60px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Esto desplegará el siguiente cuadro de
                                confirmación:{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={confirmDeleteBook}
                                  style={{ width: "390px", height: "180px" }}
                                />
                              </div>
                              <p>
                                Si escoge la opción <strong>No</strong>, no
                                ocurrirá nada, sin embargo, si decide escoger la
                                opción <strong>Sí</strong>, esto desplegará la
                                siguiente alerta:
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={successBookDeleted}
                                  style={{ width: "350px", height: "50px" }}
                                />
                              </div>
                              <p>
                                Mostrando que se ha eliminado el registro
                                satisfactoriamente, junto con esto, se
                                refrescará automáticamente la tabla de datos.{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={refreshBooksTableAfterDelete}
                                  style={{ width: "1150px", height: "500px" }}
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
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={books}
                                  style={{ width: "950px", height: "490px" }}
                                />
                              </div>
                              <p>
                                Para realizar la edición del registro de un
                                libro, debe dar clic sobre el botón{" "}
                                <strong> Editar </strong> correspondiente al
                                registro que desea actualizar
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={editButton}
                                  style={{ width: "150px", height: "60px" }}
                                />
                              </div>
                              <p> Esto desplegará el siguiente modal: </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={updateBook}
                                  style={{ width: "440px", height: "510px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Este debe ser rellenado con los campos
                                solicitados para proceder a la actualización de
                                dicho registro, finalmente debe dar clic sobre
                                el botón <strong> Guardar cambios </strong>. Lo
                                cual mostrará el siguiente mensaje en pantalla:{" "}
                              </p>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={successBookUpdated}
                                  style={{ width: "350px", height: "50px" }}
                                />
                              </div>
                              <p>
                                Mostrando que se ha actualizado el registro del
                                libro satisfactoriamente, junto con esto, se
                                refrescará automáticamente la tabla de datos.{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={refreshBooksTableAfterUpdate}
                                  style={{ width: "1350px", height: "100px" }}
                                />
                              </div>
                            </div>
                          ),
                        },
                      ]}
                    />
                  </>
                ),
              },
            ]}
          ></Collapse>

          <br />

          <Collapse
            size="large"
            items={[
              {
                key: "0",
                label: "Facturar",
                children: (
                  <>
                    <Collapse
                      size="large"
                      items={[
                        {
                          key: "1",
                          label: "Generar una nueva factura",
                          children: <></>,
                        },
                      ]}
                    />
                  </>
                ),
              },
            ]}
          ></Collapse>

          <br />

          <Collapse
            size="large"
            items={[
              {
                key: "0",
                label: "Reportes",
                children: (
                  <>
                    <Collapse
                      size="large"
                      items={[
                        {
                          key: "1",
                          label: "Generar un nuevo reporte",
                          children: <></>,
                        },
                      ]}
                    />
                  </>
                ),
              },
            ]}
          ></Collapse>

          <br />

          <Collapse
            size="large"
            items={[
              {
                key: "0",
                label: "Géneros",
                children: (
                  <>
                    <Collapse
                      size="large"
                      items={[
                        {
                          key: "1",
                          label: "Configurar un nuevo género",
                          children: (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={genres}
                                  style={{ width: "950px", height: "490px" }}
                                />
                              </div>
                            </>
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
                          label: "Eliminar un género existente",
                          children: <></>,
                        },
                      ]}
                    />

                    <br />

                    <Collapse
                      size="large"
                      items={[
                        {
                          key: "1",
                          label: "Actualizar un género existente",
                          children: <></>,
                        },
                      ]}
                    />
                  </>
                ),
              },
            ]}
          ></Collapse>

          <br />

          <Collapse
            size="large"
            items={[
              {
                key: "0",
                label: "Existencias",
                children: (
                  <>
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={stock}
                          style={{ width: "950px", height: "490px" }}
                        />
                      </div>
                      <p>
                        {" "}
                        En este apartado del sistema podremos visualizar el
                        stock yacente de cada libro y sus respectivos estados{" "}
                        <strong>
                          (estado de unidades y estado de circulación)
                        </strong>
                        , para los cuales se cuenta con los siguientes botones
                        de acción:{" "}
                      </p>
                      <ul>
                        <li>
                          {" "}
                          <strong>1. Editar:</strong> Este botón permite la
                          actualización de unidades en stock.{" "}
                        </li>
                        <li>
                          {" "}
                          <strong>2. Eliminar:</strong> Este botón retira las
                          unidades de circulación del stock.{" "}
                        </li>
                        <li>
                          {" "}
                          <strong>3. Activar:</strong> Este botón activa el
                          stock en circulación.{" "}
                        </li>
                      </ul>
                    </>
                    <Collapse
                      size="large"
                      items={[
                        {
                          key: "1",
                          label: "Actualizar existencias",
                          children: (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={editButton}
                                  style={{ width: "150px", height: "60px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Para realizar la actualización de stock de un
                                libro, se deberá dar clic sobre el botón{" "}
                                <strong>Editar</strong>, el cual desplegará el
                                siguiente modal:{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={editStock}
                                  style={{ width: "650px", height: "160px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Al dar clic en el botón{" "}
                                <strong>Guardar cambios</strong> se desplegará
                                el siguiente mensaje:{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={successStockUpdated}
                                  style={{ width: "350px", height: "60px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Con lo cual se estará actualizando el total de
                                unidades en stock del libro seleccionado.{" "}
                              </p>
                            </>
                          ),
                        },
                      ]}
                    />

                    <br />

                    <Collapse
                      size="large"
                      items={[
                        {
                          key: "2",
                          label: "Retirar un libro existente del stock",
                          children: (
                            <>
                              <p>
                                {" "}
                                Para realizar el retiro de stock de un libro,
                                debe dar clic sobre el botón{" "}
                                <strong>Eliminar</strong> correspondiente al
                                registro que desea eliminar{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={deleteButton}
                                  style={{ width: "150px", height: "60px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Esto desplegará el siguiente cuadro de
                                confirmación:{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={confirmDeleteStock}
                                  style={{ width: "390px", height: "180px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Si escoge la opción <strong>No</strong>, no
                                ocurrirá nada, sin embargo, si decide escoger la
                                opción <strong>Sí</strong>, esto desplegará la
                                siguiente alerta:{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={successStockDeleted}
                                  style={{ width: "350px", height: "50px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Mostrando ahora un nuevo estado para el libro,
                                en este caso, el estado "
                                <strong>Retirado</strong>".{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={refreshStockTableAfterDelete}
                                  style={{ width: "1250px", height: "65px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Debido al estado establecido para dicho libro,
                                este ya no se mostrará en las vistas en las que
                                la información de libros se muestra{" "}
                                <strong>(Libros y Facturas)</strong>.{" "}
                              </p>
                            </>
                          ),
                        },
                      ]}
                    />

                    <br />

                    <Collapse
                      size="large"
                      items={[
                        {
                          key: "3",
                          label: "Activar un libro para el stock",
                          children: (
                            <>
                              <p>
                                {" "}
                                Para realizar la activación de stock de un libro,
                                debe dar clic sobre el botón{" "}
                                <strong>Activar</strong> correspondiente al
                                registro que desea activar{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={activateButton}
                                  style={{ width: "150px", height: "60px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Esto desplegará la siguiente alerta:{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={successStockActivation}
                                  style={{ width: "350px", height: "50px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Mostrando ahora un nuevo estado para el libro,
                                en este caso, el estado "
                                <strong>Retirado</strong>".{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={refreshStockTableAfterActivate}
                                  style={{ width: "1250px", height: "65px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Ahora el libro podrá ser accedido desde las vistas relacionadas a este correspondientemente{" "}
                                <strong>(Libros y Facturas)</strong>.{" "}
                              </p>
                            </>
                          ),
                        },
                      ]}
                    />
                  </>
                ),
              },
            ]}
          ></Collapse>
        </>
      </div>
    </Content>
  );
};

export default Help;
