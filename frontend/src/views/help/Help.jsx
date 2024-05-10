import React from "react";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Layout,
  Breadcrumb,
  Typography,
  Card,
  Collapse,
  Alert,
  theme,
} from "antd";

import dashboard from "../../assets/images/dashboard/dashboard.png";
import books from "../../assets/images/books/books.png";
import addButton from "../../assets/images/buttons/addButton.png";
import saveBook from "../../assets/images/books/saveBook.png";
import successBookSaved from "../../assets/images/books/successBookSaved.png";
import newBookInTable from "../../assets/images/books/newBookInTable.png";
import deleteButton from "../../assets/images/buttons/deleteButton.png";
import popConfirmDelete from "../../assets/images/buttons/popConfirmDelete.png";
import successBookDeleted from "../../assets/images/books/successBookDeleted.png";
import refreshBooksTableAfterDelete from "../../assets/images/books/refreshBooksTableAfterDelete.png";
import editButton from "../../assets/images/buttons/editButton.png";
import updateBook from "../../assets/images/books/updateBook.png";
import successBookUpdated from "../../assets/images/books/successBookUpdated.png";
import refreshBooksTableAfterUpdate from "../../assets/images/books/refreshBooksTableAfterUpdate.png";
import bills from "../../assets/images/bills/bills.png";
import selectBook from "../../assets/images/bills/selectBook.png";
import fillBillFields from "../../assets/images/bills/fillBillFields.png";
import addBookToFill from "../../assets/images/bills/addBookToFill.png";
import fillBillClientFields from "../../assets/images/bills/fillBillClientFields.png";
import generateBill from "../../assets/images/buttons/generateBill.png";
import successBillSaved from "../../assets/images/bills/successBillSaved.png";
import showBill from "../../assets/images/bills/showBill.png";
import genres from "../../assets/images/genres/genres.png";
import saveGenre from "../../assets/images/genres/saveGenre.png";
import successGenreSaved from "../../assets/images/genres/successGenreSaved.png";
import newGenreInTable from "../../assets/images/genres/newGenreInTable.png";
import updateGenre from "../../assets/images/genres/updateGenre.png";
import successGenreUpdated from "../../assets/images/genres/successGenreUpdated.png";
import successGenreDeleted from "../../assets/images/genres/successGenreDeleted.png";
import refreshGenresTableAfterUpdate from "../../assets/images/genres/refreshGenresTableAfterUpdate.png";
import refreshGenresTableAfterDelete from "../../assets/images/genres/refreshGenresTableAfterDelete.png";
import stock from "../../assets/images/stock/stock.png";
import editStock from "../../assets/images/stock/editStock.png";
import successStockUpdated from "../../assets/images/stock/successStockUpdated.png";
import confirmDeleteStock from "../../assets/images/buttons/confirmDeleteStock.png";
import successStockDeleted from "../../assets/images/stock/successStockDeleted.png";
import refreshStockTableAfterDelete from "../../assets/images/stock/refreshStockTableAfterDelete.png";
import activateButton from "../../assets/images/buttons/activateButton.png";
import successStockActivation from "../../assets/images/stock/successStockActivation.png";
import refreshStockTableAfterActivate from "../../assets/images/stock/refreshStockTableAfterActivate.png";

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
              sistema, tales como:{" "}
            </p>
            <ul>
              <li>
                {" "}
                <strong>1.</strong> Tendencia de ventas por género.{" "}
              </li>
              <li>
                {" "}
                <strong>2.</strong> Ventas diarias registradas en el mes actual.{" "}
              </li>
              <li>
                {" "}
                <strong>3.</strong> Adiciones recientes.{" "}
              </li>
              <li>
                {" "}
                <strong>4.</strong> Los libros más vendidos de todo nuestro
                inventario.{" "}
              </li>
            </ul>
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
                    <br />
                    <Collapse
                      size="large"
                      items={[
                        {
                          key: "1",
                          label: "Registrar un nuevo libro",
                          children: (
                            <>
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
                                  src={addButton}
                                  style={{ width: "330px", height: "100px" }}
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
                          label: "Actualizar un libro",
                          children: (
                            <>
                              <p>
                                Para realizar la edición del registro de un
                                libro, debe dar clic sobre el botón{" "}
                                <strong> Editar </strong> correspondiente al
                                registro que desea actualizar:
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
                            <>
                              <p>
                                Para realizar la eliminación del registro de un
                                libro, debe dar clic sobre el botón{" "}
                                <strong> Eliminar </strong> correspondiente al
                                registro que desea eliminar:
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
                                  src={popConfirmDelete}
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

          <br />

          <Collapse
            size="large"
            items={[
              {
                key: "0",
                label: "Facturar",
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
                          src={bills}
                          style={{ width: "950px", height: "490px" }}
                        />
                      </div>
                      <p>
                        {" "}
                        En este apartado se realiza el proceso de facturación.
                      </p>
                    </>
                    <Collapse
                      size="large"
                      items={[
                        {
                          key: "1",
                          label: "Generar una nueva factura",
                          children: (
                            <>
                              <p>
                                {" "}
                                Para realizar una factura los pasos a seguir son
                                los siguientes:{" "}
                              </p>
                              <ul>
                                <li>
                                  <h3> Paso 1. </h3>
                                  <p>
                                    {" "}
                                    Selecciona el libro que se va a facturar:{" "}
                                  </p>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <img
                                      src={selectBook}
                                      style={{
                                        width: "1250px",
                                        height: "290px",
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <h3> Paso 2. </h3>
                                  <p>
                                    {" "}
                                    Rellena los campos:{" "}
                                    <strong>
                                      {" "}
                                      cantidad y descuento (opcional){" "}
                                    </strong>
                                    .{" "}
                                  </p>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <img
                                      src={fillBillFields}
                                      style={{
                                        width: "1250px",
                                        height: "160px",
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <h3> Paso 3. </h3>
                                  <p>
                                    {" "}
                                    Da clic en el botón{" "}
                                    <strong>Añadir libro</strong>, esto cargará
                                    el libro en la tabla para proceder con la
                                    facturación.{" "}
                                  </p>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <img
                                      src={addBookToFill}
                                      style={{
                                        width: "1150px",
                                        height: "380px",
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <h3> Paso 4. </h3>
                                  <p>
                                    {" "}
                                    Rellena los campos:{" "}
                                    <strong>
                                      {" "}
                                      nombre y apellido (obligatorio){" "}
                                    </strong>{" "}
                                    y da clic en el botón <strong></strong>.{" "}
                                  </p>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <img
                                      src={fillBillClientFields}
                                      style={{
                                        width: "1250px",
                                        height: "120px",
                                      }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <h3> Paso 5. </h3>
                                  <p>
                                    {" "}
                                    Haz clic sobre el botón{" "}
                                    <strong>Generar factura</strong>:{" "}
                                  </p>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <img
                                      src={generateBill}
                                      style={{
                                        width: "220px",
                                        height: "60px",
                                      }}
                                    />
                                  </div>
                                </li>
                              </ul>
                              <p>
                                {" "}
                                Cumplidos estos pasos, se generarán la siguiente
                                alerta:{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={successBillSaved}
                                  style={{ width: "350px", height: "70px" }}
                                />
                              </div>
                              <p>Y se exportará el siguiente archivo PDF:</p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={showBill}
                                  style={{
                                    width: "1220px",
                                    height: "460px",
                                  }}
                                />
                              </div>
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
                      <p>
                        {" "}
                        En este apartado del sistema podremos visualizar los
                        géneros literarios que se manejan para la clasificación
                        de libros y cuantos pertenecen a cada uno de ellos.{" "}
                      </p>
                    </>
                    <Collapse
                      size="large"
                      items={[
                        {
                          key: "1",
                          label: "Añadir un nuevo género",
                          children: (
                            <>
                              <p>
                                {" "}
                                Para realizar la actualización de un género
                                literario, debe dar clic sobre el botón{" "}
                                <strong>Añadir </strong> que se encuentra en la
                                parte superior del formulario:{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={addButton}
                                  style={{ width: "330px", height: "100px" }}
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
                                  src={saveGenre}
                                  style={{ width: "630px", height: "150px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Este debe ser rellenado con el campo solicitado
                                para proceder con el registro de dicho género,
                                finalmente debe dar clic sobre el botón{" "}
                                <strong>Guardar</strong>. Lo cual mostrará el
                                siguiente mensaje:{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={successGenreSaved}
                                  style={{ width: "350px", height: "70px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Mostrando que se ha registrado el género
                                satisfactoriamente, esto refrescará
                                automáticamente la tabla de datos.{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={newGenreInTable}
                                  style={{ width: "1150px", height: "60px" }}
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
                          label: "Actualizar un género existente",
                          children: (
                            <>
                              <p>
                                {" "}
                                Para realizar la actualización de un género
                                literario, debe dar clic sobre el botón{" "}
                                <strong>Editar</strong>:{" "}
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
                                  src={updateGenre}
                                  style={{ width: "630px", height: "150px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Este debe ser rellenado con el campo solicitado
                                para proceder con el registro de dicho género,
                                finalmente debe dar clic sobre el botón{" "}
                                <strong>Guardar</strong>. Lo cual mostrará el
                                siguiente mensaje:{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={successGenreUpdated}
                                  style={{ width: "350px", height: "70px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Mostrando que el género se ha actualizado
                                satisfactoriamente, esto refrescará
                                automáticamente la tabla de datos.{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={refreshGenresTableAfterUpdate}
                                  style={{ width: "1250px", height: "70px" }}
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
                          children: (
                            <>
                              <p>
                                {" "}
                                Para realizar la eliminación del registro de un
                                género literario, debe dar clic sobre el botón{" "}
                                <strong>Eliminar</strong>:{" "}
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
                                  src={popConfirmDelete}
                                  style={{ width: "390px", height: "180px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Este debe ser rellenado con el campo solicitado
                                para proceder con el registro de dicho género,
                                finalmente debe dar clic sobre el botón{" "}
                                <strong>Guardar</strong>. Lo cual mostrará el
                                siguiente mensaje:{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={successGenreDeleted}
                                  style={{ width: "350px", height: "70px" }}
                                />
                              </div>
                              <p>
                                {" "}
                                Mostrando que se ha registrado el género
                                satisfactoriamente, esto refrescará
                                automáticamente la tabla de datos.{" "}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={refreshGenresTableAfterDelete}
                                  style={{ width: "1250px", height: "190px" }}
                                />
                              </div>
                              <br />
                              <Alert
                                message="Importante"
                                description="Si se elimina un género literario que ya contiene libros dentro de sí, todos los que pertenezcan a este ya no serán accesibles desde las vistas adyacentes a ellos."
                                type="warning"
                              />
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
                                Para realizar la activación de stock de un
                                libro, debe dar clic sobre el botón{" "}
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
                              <p> Esto desplegará la siguiente alerta: </p>
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
                                Ahora el libro podrá ser accedido desde las
                                vistas relacionadas a este correspondientemente{" "}
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
