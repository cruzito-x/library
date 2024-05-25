import React from "react";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Layout,
  Breadcrumb,
  Typography,
  Card,
  Image,
  Collapse,
  Alert,
  Row,
  Col,
  theme,
} from "antd";

import addButton from "../../assets/images/buttons/addButton.png";
import deleteButton from "../../assets/images/buttons/deleteButton.png";
import popConfirmDelete from "../../assets/images/buttons/popConfirmDelete.png";
import editButton from "../../assets/images/buttons/editButton.png";
import dashboard from "../../assets/images/superadmin/dashboard/dashboard.png";
import adminDashboard from "../../assets/images/admin/dashboard/dashboard.png";
import books from "../../assets/images/superadmin/books/books.png";
import adminBooks from "../../assets/images/admin/books/books.png";
import saveBook from "../../assets/images/superadmin/books/saveBook.png";
import successBookSaved from "../../assets/images/superadmin/books/successBookSaved.png";
import newBookInTable from "../../assets/images/superadmin/books/newBookInTable.png";
import updateBook from "../../assets/images/superadmin/books/updateBook.png";
import successBookUpdated from "../../assets/images/superadmin/books/successBookUpdated.png";
import refreshBooksTableAfterUpdate from "../../assets/images/superadmin/books/refreshBooksTableAfterUpdate.png";
import successBookDeleted from "../../assets/images/superadmin/books/successBookDeleted.png";
import refreshBooksTableAfterDelete from "../../assets/images/superadmin/books/refreshBooksTableAfterDelete.png";
import bills from "../../assets/images/superadmin/bills/bills.png";
import adminBills from "../../assets/images/admin/bills/bills.png";
import selectBook from "../../assets/images/superadmin/bills/selectBook.png";
import fillBillFields from "../../assets/images/superadmin/bills/fillBillFields.png";
import addBookToFill from "../../assets/images/superadmin/bills/addBookToFill.png";
import popConfirmDeleteBookOfBill from "../../assets/images/buttons/popConfirmDeleteBookOfBill.png";
import fillBillClientFields from "../../assets/images/superadmin/bills/fillBillClientFields.png";
import generateBill from "../../assets/images/buttons/generateBill.png";
import successBillSaved from "../../assets/images/superadmin/bills/successBillSaved.png";
import showBill from "../../assets/images/superadmin/bills/showBill.png";
import adminShowBill from "../../assets/images/admin/bills/showBill.png";
import selectReportPeriod from "../../assets/images/superadmin/reports/selectReportPeriod.png";
import saveReport from "../../assets/images/superadmin/reports/saveReport.png";
import showExportedReport from "../../assets/images/superadmin/reports/showExportedReport.png";
import showSemanalReport from "../../assets/images/superadmin/reports/showSemanalReport.png";
import genres from "../../assets/images/superadmin/genres/genres.png";
import adminGenres from "../../assets/images/admin/genres/genres.png";
import saveGenre from "../../assets/images/superadmin/genres/saveGenre.png";
import successGenreSaved from "../../assets/images/superadmin/genres/successGenreSaved.png";
import newGenreInTable from "../../assets/images/superadmin/genres/newGenreInTable.png";
import updateGenre from "../../assets/images/superadmin/genres/updateGenre.png";
import successGenreUpdated from "../../assets/images/superadmin/genres/successGenreUpdated.png";
import successGenreDeleted from "../../assets/images/superadmin/genres/successGenreDeleted.png";
import refreshGenresTableAfterUpdate from "../../assets/images/superadmin/genres/refreshGenresTableAfterUpdate.png";
import refreshGenresTableAfterDelete from "../../assets/images/superadmin/genres/refreshGenresTableAfterDelete.png";
import genreDetailsBooks from "../../assets/images/superadmin/genres/genreDetailsBooks.png";
import users from "../../assets/images/superadmin/users/users.png";
import saveUser from "../../assets/images/superadmin/users/saveUser.png";
import successUserSaved from "../../assets/images/superadmin/users/successUserSaved.png";
import newUserInTable from "../../assets/images/superadmin/users/newUserInTable.png";
import updateUser from "../../assets/images/superadmin/users/updateUser.png";
import successUserUpdated from "../../assets/images/superadmin/users/successUserUpdated.png";
import refreshUsersTableAfterUpdate from "../../assets/images/superadmin/users/refreshUsersTableAfterUpdate.png";
import successUserDeleted from "../../assets/images/superadmin/users/successUserDeleted.png";
import refreshUsersTableAfterDelete from "../../assets/images/superadmin/users/refreshUsersTableAfterDelete.png";
import stock from "../../assets/images/superadmin/stock/stock.png";
import adminStock from "../../assets/images/admin/stock/stock.png";
import updateStock from "../../assets/images/superadmin/stock/updateStock.png";
import successStockUpdated from "../../assets/images/superadmin/stock/successStockUpdated.png";
import popConfirmDeleteStock from "../../assets/images/buttons/popConfirmDeleteStock.png";
import successStockDeleted from "../../assets/images/superadmin/stock/successStockDeleted.png";
import refreshStockTableAfterDelete from "../../assets/images/superadmin/stock/refreshStockTableAfterDelete.png";
import activateButton from "../../assets/images/buttons/activateButton.png";
import successStockActivation from "../../assets/images/superadmin/stock/successStockActivation.png";
import refreshStockTableAfterActivate from "../../assets/images/superadmin/stock/refreshStockTableAfterActivate.png";
import sales from "../../assets/images/superadmin/sales/sales.png";
import saleDetails from "../../assets/images/superadmin/sales/saleDetails.png";

const Help = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const isSuperAdmin = localStorage.getItem("rol") === "superadmin";
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
          <QuestionCircleOutlined style={{ color: "#1890ff" }} /> Ayuda
        </Title>
        <>
          {/* Dashboard card */}

          <Card title="Dashboard">
            <Row justify="center">
              <Col xs={24}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Image
                    src={isSuperAdmin ? dashboard : adminDashboard}
                    style={{ maxWidth: "100%", height: "auto" }}
                    alt="Dashboard"
                    preview={false}
                  />
                </div>
              </Col>
              <Col xs={24}>
                <p>
                  En este apartado podrás visualizar de manera centralizada todo
                  aquello referente a los datos más importantes registrados en
                  el sistema, tales como:
                </p>
                <ul>
                  {isSuperAdmin ? (
                    <>
                      <li>
                        <strong>1.</strong> Cantidad total de libros como la
                        cantidad de libros añadidos recientemente.
                      </li>
                      <li>
                        <strong>2.</strong> Cantidad total de unidades vendidas
                        como la cantidad de unidades vendidas recientemente.
                      </li>
                      <li>
                        <strong>3.</strong> Total de ganancias como total de
                        ganancias recientes.
                      </li>
                      <li>
                        <strong>4.</strong> Total de facturas emitidas como
                        total de facturas emitidas recientemente.
                      </li>
                      <li>
                        <strong>5.</strong> Tendencia de ventas por género.
                      </li>
                      <li>
                        <strong>6.</strong> Totales de venta.
                      </li>
                      <li>
                        <strong>7.</strong> Los libros más vendidos de todo
                        nuestro inventario.
                      </li>
                      <li>
                        <strong>8.</strong> Últimos 5 libros añadidos.
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <strong>1.</strong> Tendencia de ventas por género.
                      </li>
                      <li>
                        <strong>2.</strong> Totales de venta.
                      </li>
                      <li>
                        <strong>3.</strong> Los libros más vendidos de todo
                        nuestro inventario.
                      </li>
                      <li>
                        <strong>4.</strong> Últimos 5 libros añadidos.
                      </li>
                    </>
                  )}
                </ul>
              </Col>
            </Row>
          </Card>

          {/* Books card */}

          <br />
          <Collapse
            size="large"
            items={[
              {
                key: "0",
                label: "Libros",
                children: (
                  <>
                    <div style={{ textAlign: "center" }}>
                      <Image
                        src={isSuperAdmin ? books : adminBooks}
                        preview={false} // Desactiva la previsualización si no es necesaria
                        style={{ maxWidth: "80%", height: "auto" }} // Establece un ancho máximo y ajusta la altura automáticamente
                      />
                    </div>
                    <p>
                      {" "}
                      En este apartado podrás visualizar información general de
                      los libros registrados y en stock que se encuentren bajo
                      estado <strong>"activo"</strong>.{" "}
                    </p>
                    {isSuperAdmin && (
                      <>
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
                                    Para realizar el registro de un libro, debe
                                    dar clic sobre el botón
                                    <strong> Añadir nuevo </strong> que se
                                    encuentra en la parte superior del
                                    formulario:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={addButton}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p> Esto desplegará el siguiente modal: </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={saveBook}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "80%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Este debe ser rellenado con los campos
                                    solicitados para proceder al registro de
                                    dicho libro, finalmente debe dar clic sobre
                                    el botón
                                    <strong> Guardar</strong>. Lo cual mostrará
                                    el siguiente mensaje en pantalla:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={successBookSaved}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Mostrando que se ha registrado el libro
                                    satisfactoriamente, junto con esto, se
                                    refrescará automáticamente la tabla de
                                    datos.
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={newBookInTable}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "80%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
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
                              key: "2",
                              label: "Actualizar un libro",
                              children: (
                                <>
                                  <p>
                                    Para realizar la edición del registro de un
                                    libro, debe dar clic sobre el botón
                                    <strong> Editar </strong> correspondiente al
                                    registro que desea actualizar:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={editButton}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p> Esto desplegará el siguiente modal: </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={updateBook}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "80%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Este debe ser rellenado con los campos
                                    solicitados para proceder a la actualización
                                    de dicho registro, finalmente debe dar clic
                                    sobre el botón{" "}
                                    <strong> Guardar cambios</strong>. Lo cual
                                    mostrará el siguiente mensaje en pantalla:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={successBookUpdated}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Mostrando que se ha actualizado el registro
                                    del libro satisfactoriamente, junto con
                                    esto, se refrescará automáticamente la tabla
                                    de datos.
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={refreshBooksTableAfterUpdate}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "80%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
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
                              key: "3",
                              label: "Eliminar un libro",
                              children: (
                                <>
                                  <p>
                                    Para realizar la eliminación del registro de
                                    un libro, debe dar clic sobre el botón
                                    <strong> Eliminar </strong> correspondiente
                                    al registro que desea eliminar:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={deleteButton}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Esto desplegará el siguiente cuadro de
                                    confirmación:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={popConfirmDelete}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Si escoge la opción <strong>No</strong>, no
                                    ocurrirá nada, sin embargo, si decide
                                    escoger la opción <strong>Sí</strong>, esto
                                    desplegará la siguiente alerta:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={successBookDeleted}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Mostrando que se ha eliminado el registro
                                    satisfactoriamente, junto con esto, se
                                    refrescará automáticamente la tabla de
                                    datos.
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={refreshBooksTableAfterDelete}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "80%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                </>
                              ),
                            },
                          ]}
                        />
                      </>
                    )}
                  </>
                ),
              },
            ]}
          />

          {/* Bills card */}

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
                      <div style={{ textAlign: "center" }}>
                        <Image
                          src={isSuperAdmin ? bills : adminBills}
                          preview={false}
                          style={{ maxWidth: "80%", height: "auto" }}
                        />
                      </div>
                      <p>
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
                                Para realizar una factura los pasos a seguir son
                                los siguientes:
                              </p>
                              <ul>
                                <li>
                                  <h3> Paso 1. </h3>
                                  <p>
                                    Selecciona el libro que se va a facturar:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={selectBook}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "90%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                </li>
                                <li>
                                  <h3> Paso 2. </h3>
                                  <p>
                                    Rellena los campos:
                                    <strong>
                                      {" "}
                                      cantidad (obligatorio) y descuento
                                      (opcional)
                                    </strong>
                                    .
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={fillBillFields}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                </li>
                                <li>
                                  <h3> Paso 3. </h3>
                                  <p>
                                    Rellena los campos:
                                    <strong>
                                      {" "}
                                      nombre y apellido (obligatorio){" "}
                                    </strong>
                                    y da clic en el botón <strong></strong>.
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={fillBillClientFields}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                </li>
                                <li>
                                  <h3> Paso 4. </h3>
                                  <p>
                                    Da clic en el botón
                                    <strong> Añadir libro</strong>, esto cargará
                                    el libro en la tabla para proceder con la
                                    facturación.
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={addBookToFill}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <br />
                                  <Alert
                                    message={
                                      <>
                                        {" "}
                                        <strong>Importante</strong>{" "}
                                      </>
                                    }
                                    description={
                                      <>
                                        <p>
                                          Si desea aumentar la cantidad de
                                          libros a un libro ya existente en la
                                          tabla, debe dar clic en el botón con
                                          el signo <strong>+</strong>, en caso
                                          de desear restar cantidad a un libro
                                          ya existente en la tabla, de clic en
                                          el botón con el signo{" "}
                                          <strong>-</strong> y en caso de desear
                                          eliminar el libro de la tabla, de clic
                                          en el botón con el signo de{" "}
                                          <strong>cesto de basura</strong>.
                                        </p>
                                      </>
                                    }
                                    type="warning"
                                  />{" "}
                                  <br />
                                  <div>
                                    <p>
                                      {" "}
                                      En caso de hacer clic sobre el botón
                                      eliminar, se desplegará el siguiente
                                      cuadro de confirmación:{" "}
                                    </p>
                                    <div style={{ textAlign: "center" }}>
                                      <Image
                                        src={popConfirmDeleteBookOfBill}
                                        preview={false} // Desactiva la previsualización si no es necesaria
                                        style={{
                                          maxWidth: "100%",
                                          height: "auto",
                                        }} // Establece un ancho máximo y ajusta la altura automáticamente
                                      />
                                    </div>
                                    <p>
                                      {" "}
                                      Si escoge la opción <strong>No</strong>,
                                      no ocurrirá nada, sin embargo, si decide
                                      escoger la opción <strong>Sí</strong>,
                                      esto removerá el libro de la tabla de
                                      libros a facturar.{" "}
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <h3> Paso 5. </h3>
                                  <p>
                                    Haz clic sobre el botón
                                    <strong> Generar factura</strong>:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={generateBill}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                </li>
                              </ul>
                              <p>
                                Cumplidos estos pasos, se generarán la siguiente
                                alerta:
                              </p>
                              <div style={{ textAlign: "center" }}>
                                <Image
                                  src={successBillSaved}
                                  preview={false} // Desactiva la previsualización si no es necesaria
                                  style={{ maxWidth: "100%", height: "auto" }} // Establece un ancho máximo y ajusta la altura automáticamente
                                />
                              </div>
                              <p>Y se exportará el siguiente archivo PDF:</p>
                              <div style={{ textAlign: "center" }}>
                                <Image
                                  src={isSuperAdmin ? showBill : adminShowBill}
                                  preview={false} // Desactiva la previsualización si no es necesaria
                                  style={{ maxWidth: "80%", height: "auto" }} // Establece un ancho máximo y ajusta la altura automáticamente
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
          />

          {/* Reports card */}
          {isSuperAdmin && (
            <>
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
                              children: (
                                <>
                                  <p>
                                    Para generar un reporte los pasos a seguir
                                    son los siguientes:
                                  </p>
                                  <ul>
                                    <li>
                                      <h3> Paso 1. </h3>
                                      <p>
                                        Selecciona el período de tiempo del cual
                                        deseas exportar la información:
                                      </p>
                                      <div style={{ textAlign: "center" }}>
                                        <Image
                                          src={selectReportPeriod}
                                          preview={false} // Desactiva la previsualización si no es necesaria
                                          style={{
                                            maxWidth: "80%",
                                            height: "auto",
                                          }} // Establece un ancho máximo y ajusta la altura automáticamente
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <h3> Paso 2. </h3>
                                      <p>
                                        Selecciona la ubicación donde deseas
                                        guardar el reporte
                                      </p>
                                      <div style={{ textAlign: "center" }}>
                                        <Image
                                          src={saveReport}
                                          preview={false} // Desactiva la previsualización si no es necesaria
                                          style={{
                                            maxWidth: "80%",
                                            height: "auto",
                                          }} // Establece un ancho máximo y ajusta la altura automáticamente
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <h3> Paso 3. </h3>
                                      <p>
                                        El paso 2 te devolverá un archivo
                                        descargado con extensión{" "}
                                        <strong>.pdf</strong>
                                      </p>
                                      <div style={{ textAlign: "center" }}>
                                        <Image
                                          src={showExportedReport}
                                          preview={false} // Desactiva la previsualización si no es necesaria
                                          style={{
                                            maxWidth: "100%",
                                            height: "auto",
                                          }} // Establece un ancho máximo y ajusta la altura automáticamente
                                        />
                                      </div>
                                      <p>
                                        {" "}
                                        Abrelo con tu visor de PDF preferido.{" "}
                                      </p>
                                    </li>
                                    <li>
                                      <h3> Paso 4. </h3>
                                      <p>
                                        {" "}
                                        Visualiza el contenido del reporte{" "}
                                      </p>
                                      <div style={{ textAlign: "center" }}>
                                        <Image
                                          src={showSemanalReport}
                                          preview={false} // Desactiva la previsualización si no es necesaria
                                          style={{
                                            maxWidth: "80%",
                                            height: "auto",
                                          }} // Establece un ancho máximo y ajusta la altura automáticamente
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                  <p>
                                    Si deseas generar otro reporte, sigue los
                                    pasos ya mencionados.
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
              />

              {/* Users card */}

              <br />
              <Collapse
                size="large"
                items={[
                  {
                    key: "0",
                    label: "Usuarios",
                    children: (
                      <>
                        <>
                          <div style={{ textAlign: "center" }}>
                            <Image
                              src={users}
                              preview={false}
                              style={{
                                maxWidth: "80%",
                                height: "auto",
                              }}
                            />
                          </div>
                          <p>
                            En este apartado puedes registrar usuarios o dar de
                            baja a uno determinado.
                          </p>
                        </>
                        <Collapse
                          size="large"
                          items={[
                            {
                              key: "1",
                              label: "Registrar un nuevo usuario",
                              children: (
                                <>
                                  <p>
                                    Para realizar el registro, haz clic sobre el
                                    botón <strong>Añadir nuevo</strong> que se
                                    encuenta en la parte superior del
                                    formulario:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={addButton}
                                      preview={false}
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }}
                                    />
                                  </div>
                                  <p> Esto desplegará el siguiente modal: </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={saveUser}
                                      preview={false}
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }}
                                    />
                                  </div>
                                  <p>
                                    Este debe ser rellenado con los campos
                                    solicitados para proceder con el registro de
                                    dicho usuario, finalmente debe dar clic
                                    sobre el botón <strong>Guardar</strong>. Lo
                                    cual mostrará la siguiente alerta:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={successUserSaved}
                                      preview={false}
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }}
                                    />
                                  </div>
                                  <p>
                                    Mostrando que se ha registrado el usuario
                                    exitosamente, junto con esto, se refrescará
                                    automáticamente la tabla de datos.
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={newUserInTable}
                                      preview={false}
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }}
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
                              key: "2",
                              label: "Actualizar un usuario",
                              children: (
                                <>
                                  <p>
                                    Para realizar la edición de un usuario, debe
                                    dar clic sobre el botón
                                    <strong> Editar</strong> correspondiente al
                                    registro que desea actualizar
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={editButton}
                                      preview={false}
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }}
                                    />
                                  </div>
                                  <p> Esto desplegará el siguiente modal: </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={updateUser}
                                      preview={false}
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }}
                                    />
                                  </div>
                                  <p>
                                    Este debe ser rellenado con los campos
                                    solicitados para proceder a la actualización
                                    de dicho registro, finalmente debe dar clic
                                    sobre el botón
                                    <strong> Guardar cambios</strong>. Lo cual
                                    mostrará el siguiente mensaje en pantalla:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={successUserUpdated}
                                      preview={false}
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }}
                                    />
                                  </div>
                                  <p>
                                    Mostrando que se ha actualizado el registro
                                    del libro satisfactoriamente, junto con
                                    esto, se refrescará automáticamente la tabla
                                    de datos.
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={refreshUsersTableAfterUpdate}
                                      preview={false}
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }}
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
                              key: "3",
                              label: "Dar de baja un usuario",
                              children: (
                                <>
                                  <p>
                                    Para dar de baja a un usuario debes de dar
                                    clic sobre el botón
                                    <strong> Eliminar</strong> del registro que
                                    deseas dar de baja.
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={deleteButton}
                                      preview={false}
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }}
                                    />
                                  </div>
                                  <p>
                                    Lo cual desplegará el siguiente cuadro de
                                    confirmación:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={popConfirmDelete}
                                      preview={false}
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }}
                                    />
                                  </div>
                                  <p>
                                    Si escoge la opción No, no ocurrirá nada,
                                    sin embargo, si decide escoger la opción Sí,
                                    esto desplegará la siguiente alerta:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={successUserDeleted}
                                      preview={false}
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }}
                                    />
                                  </div>
                                  <p>
                                    Mostrando el cambio de estado, de
                                    <strong> Activo</strong> a
                                    <strong> Inactivo:</strong>
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={refreshUsersTableAfterDelete}
                                      preview={false}
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
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
              />
            </>
          )}

          {/* Genres card */}

          <br />
          <Collapse
            size="large"
            items={[
              {
                key: "0",
                label: "Géneros",
                children: (
                  <>
                    <div style={{ textAlign: "center" }}>
                      <Image
                        src={isSuperAdmin ? genres : adminGenres}
                        preview={false} // Desactiva la previsualización si no es necesaria
                        style={{ maxWidth: "80%", height: "auto" }} // Establece un ancho máximo y ajusta la altura automáticamente
                      />
                    </div>
                    <p>
                      En este apartado del sistema podremos visualizar los
                      géneros literarios que se manejan para la clasificación de
                      libros y cuantos pertenecen a cada uno de ellos.
                    </p>

                    {isSuperAdmin && (
                      <>
                        <Collapse
                          size="large"
                          items={[
                            {
                              key: "1",
                              label: "Añadir un nuevo género",
                              children: (
                                <>
                                  <p>
                                    Para realizar la actualización de un género
                                    literario, debe dar clic sobre el botón
                                    <strong> Añadir </strong> que se encuentra
                                    en la parte superior del formulario:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={addButton}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p> Esto desplegará el siguiente modal: </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={saveGenre}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Este debe ser rellenado con el campo
                                    solicitado para proceder con el registro de
                                    dicho género, finalmente debe dar clic sobre
                                    el botón
                                    <strong> Guardar</strong>. Lo cual mostrará
                                    el siguiente mensaje:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={successGenreSaved}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Mostrando que se ha registrado el género
                                    satisfactoriamente, esto refrescará
                                    automáticamente la tabla de datos.
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={newGenreInTable}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "80%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
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
                              key: "2",
                              label: "Actualizar un género existente",
                              children: (
                                <>
                                  <p>
                                    Para realizar la actualización de un género
                                    literario, debe dar clic sobre el botón
                                    <strong> Editar</strong>:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={editButton}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p> Esto desplegará el siguiente modal: </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={updateGenre}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Este debe ser rellenado con el campo
                                    solicitado para proceder con el registro de
                                    dicho género, finalmente debe dar clic sobre
                                    el botón
                                    <strong> Guardar cambios</strong>. Lo cual
                                    mostrará el siguiente mensaje:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={successGenreUpdated}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Mostrando que el género se ha actualizado
                                    satisfactoriamente, esto refrescará
                                    automáticamente la tabla de datos.
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={refreshGenresTableAfterUpdate}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
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
                              key: "3",
                              label: "Eliminar un género existente",
                              children: (
                                <>
                                  <p>
                                    Para realizar la eliminación del registro de
                                    un género literario, debe dar clic sobre el
                                    botón
                                    <strong> Eliminar</strong>:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={deleteButton}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Esto desplegará el siguiente cuadro de
                                    confirmación:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={popConfirmDelete}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Si escoge la opción <strong>No</strong>, no
                                    ocurrirá nada, sin embargo, si decide
                                    escoger la opción <strong>Sí</strong>, esto
                                    desplegará la siguiente alerta:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={successGenreDeleted}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Mostrando que se ha registrado el género
                                    satisfactoriamente, esto refrescará
                                    automáticamente la tabla de datos.
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={refreshGenresTableAfterDelete}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <br />
                                  <Alert
                                    message={
                                      <>
                                        {" "}
                                        <strong>Importante</strong>{" "}
                                      </>
                                    }
                                    description="Si se elimina un género literario que ya contiene libros dentro de sí, todos los que pertenezcan a este ya no serán accesibles desde las vistas adyacentes a ellos."
                                    type="warning"
                                  />
                                </>
                              ),
                            },
                          ]}
                        />
                      </>
                    )}
                    <br />
                    <Collapse
                      size="large"
                      items={[
                        {
                          key: "4",
                          label: "Visualizar detalle de un género",
                          children: (
                            <>
                              <p>
                                {" "}
                                Al dar clic sobre un género se desplegará el
                                siguiente modal:
                              </p>
                              <div style={{ textAlign: "center" }}>
                                <Image
                                  src={genreDetailsBooks}
                                  preview={false} // Desactiva la previsualización si no es necesaria
                                  style={{
                                    maxWidth: "80%",
                                    height: "auto",
                                  }} // Establece un ancho máximo y ajusta la altura automáticamente
                                />
                              </div>
                              <p>
                                {" "}
                                Donde podrás visualizar el detalle del género
                                seleccionado, donde podrás visualizar que libros
                                pertencen a dicho género, tanto su nombre, autor
                                y precio unitario.{" "}
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
          />

          {/* Stock card */}

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
                      <div style={{ textAlign: "center" }}>
                        <Image
                          src={isSuperAdmin ? stock : adminStock}
                          preview={false} // Desactiva la previsualización si no es necesaria
                          style={{ maxWidth: "100%", height: "auto" }} // Establece un ancho máximo y ajusta la altura automáticamente
                        />
                      </div>
                      <p>
                        En este apartado del sistema podrás visualizar el stock
                        yacente de cada libro y sus respectivos estados
                        <strong>
                          {" "}
                          (estado de unidades y estado de circulación)
                        </strong>
                        {isSuperAdmin
                          ? ", para los cuales se cuenta con los siguientes botones de acción:"
                          : "."}
                      </p>
                      {isSuperAdmin ? (
                        <>
                          <ul>
                            <li>
                              <strong>1. Editar:</strong> Este botón permite la
                              actualización de unidades en stock.
                            </li>
                            <li>
                              <strong>2. Eliminar:</strong> Este botón retira
                              las unidades de circulación del stock.
                            </li>
                            <li>
                              <strong>3. Activar:</strong> Este botón activa el
                              stock en circulación.
                            </li>
                          </ul>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                    {isSuperAdmin ? (
                      <>
                        <Collapse
                          size="large"
                          items={[
                            {
                              key: "1",
                              label: "Actualizar existencias",
                              children: (
                                <>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={editButton}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Para realizar la actualización de stock de
                                    un libro, se deberá dar clic sobre el botón
                                    <strong> Editar</strong>, el cual desplegará
                                    el siguiente modal:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={updateStock}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Al dar clic en el botón
                                    <strong> Guardar cambios</strong> se
                                    desplegará el siguiente mensaje:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={successStockUpdated}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Con lo cual se estará actualizando el total
                                    de unidades en stock del libro seleccionado.
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
                                    Para realizar el retiro de stock de un
                                    libro, debe dar clic sobre el botón
                                    <strong> Eliminar</strong> correspondiente
                                    al registro que desea eliminar
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={deleteButton}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Esto desplegará el siguiente cuadro de
                                    confirmación:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={popConfirmDeleteStock}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Si escoge la opción <strong>No</strong>, no
                                    ocurrirá nada, sin embargo, si decide
                                    escoger la opción <strong>Sí</strong>, esto
                                    desplegará la siguiente alerta:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={successStockDeleted}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Mostrando ahora un nuevo estado para el
                                    libro, en este caso, el estado "
                                    <strong>Retirado</strong>".
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={refreshStockTableAfterDelete}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Debido al estado establecido para dicho
                                    libro, este ya no se mostrará en las vistas
                                    en las que la información de libros se
                                    muestra
                                    <strong> (Libros y Facturas)</strong>.
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
                                    Para realizar la activación de stock de un
                                    libro, debe dar clic sobre el botón
                                    <strong> Activar</strong> correspondiente al
                                    registro que desea activar
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={activateButton}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p> Esto desplegará la siguiente alerta: </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={successStockActivation}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Mostrando ahora un nuevo estado para el
                                    libro, en este caso, el estado "
                                    <strong>Retirado</strong>".
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={refreshStockTableAfterActivate}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    Ahora el libro podrá ser accedido desde las
                                    vistas relacionadas a este
                                    correspondientemente
                                    <strong> (Libros y Facturas)</strong>.
                                  </p>
                                </>
                              ),
                            },
                          ]}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ),
              },
            ]}
          />

          {/* Sales card */}

          {isSuperAdmin && (
            <>
              <br />
              <Collapse
                size="large"
                items={[
                  {
                    key: "0",
                    label: "Ventas",
                    children: (
                      <>
                        <div style={{ textAlign: "center" }}>
                          <Image
                            src={sales}
                            preview={false} // Desactiva la previsualización si no es necesaria
                            style={{ maxWidth: "80%", height: "auto" }} // Establece un ancho máximo y ajusta la altura automáticamente
                          />
                        </div>
                        <p>
                          En este apartado podrás visualizar todas las ventas
                          realizadas y su información respectiva, estas están
                          ordenadas de la más reciente a la más antigua.
                        </p>

                        <Collapse
                          size="large"
                          items={[
                            {
                              key: "1",
                              label: "Visualizar detalles de venta",
                              children: (
                                <>
                                  <p>
                                    {" "}
                                    Al dar clic sobre un registro se desplegará
                                    el siguiente modal:
                                  </p>
                                  <div style={{ textAlign: "center" }}>
                                    <Image
                                      src={saleDetails}
                                      preview={false} // Desactiva la previsualización si no es necesaria
                                      style={{
                                        maxWidth: "80%",
                                        height: "auto",
                                      }} // Establece un ancho máximo y ajusta la altura automáticamente
                                    />
                                  </div>
                                  <p>
                                    {" "}
                                    Donde podrás visualizar el detalle de la
                                    venta seleccionada.{" "}
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
              />
            </>
          )}
        </>
      </div>
    </Content>
  );
};

export default Help;
