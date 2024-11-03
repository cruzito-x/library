import { React, useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Input,
  InputNumber,
  Button,
  Modal,
  Form,
  Row,
  Spin,
  Upload,
  Col,
  Space,
  Select,
  theme,
  message,
} from "antd";
import BooksTable from "../../components/tables/booksTable/BooksTable";

const Books = () => {
  const { Content } = Layout;
  const { Search } = Input;
  const [searchTerm, setSearchTerm] = useState("");
  const { confirm } = Modal;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [genres, setGenres] = useState([]);
  const [imageName, setImageName] = useState(null);
  const [booksData, setBooksData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const isSuperAdmin = localStorage.getItem("rol") === "superadmin";

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetch("http://127.0.0.1:3001/books")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener libros");
        }
        return response.json();
      })
      .then((data) => {
        setBooksData(data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, [refreshTable]);

  const handleChange = (value) => { };

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      // Si la carga se completa, obtenemos el nombre del archivo y lo almacenamos en localStorage
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString("es-ES", { timeZone: "UTC" }).replace(/[\/\,\.\s\:]/g, "");
      const fileName = `${formattedDate}.${info.file.name.split(".").pop()}`; // Mantener la extensión original del archivo

      localStorage.setItem("nombreImagen", fileName);
      setImageName(fileName); // Actualizamos el estado con el nombre de la imagen cargada
    }
  };

  useEffect(() => {
    fetch("http://127.0.0.1:3001/books/genres")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const showAddModal = () => {
    confirm({
      width: "35%",
      title: 
        <>
          <PlusCircleOutlined style={{ color: '#1890ff', marginRight: '10px' }} />
          Añadir nuevo libro
        </>,
      icon: null,
      style: { top: "5%" },
      content: (
        <Form
          layout="horizontal"
          form={form}
          initialValues={{
            layout: "vertical",
          }}
        >
          <Form.Item label="Libro:" name="titulo" rules={[{required: true, message: "Introduzca el nombre del libro" }]}>
            <Input placeholder="ej. Jícaras tristes" name="titulo" />
          </Form.Item>
          <Form.Item label="Autor:" name="autor" rules={[{required: true, message: "Introduzca el nombre del autor" }]}>
            <Input placeholder="ej. Alfredo Espino" name="autor" />
          </Form.Item>
          <Form.Item label="Año de publicación:" name="fechaPublicacion" rules={[{required: true, message: "Introduzca una fecha entre 1901 y 2024" }]}>
            <InputNumber min={1901} max={2024} placeholder="Introduzca un año entre 1901 y 2024" name="fechaPublicacion" maxLength={4} style={{ width: '100%'}} />
          </Form.Item>
          <Form.Item label="Precio:" name="precio" rules={[{required: true, message: "Introduzca el precio unitario del libro" }]}>
            <Input prefix="$" placeholder="0.00" name="precio" />
          </Form.Item>
          <Form.Item label="Género:" name="genero" rules={[{required: true, message: "Seleccione un género literario" }]}>
            <Select
              defaultValue="Seleccionar género"
              onChange={handleChange}
              options={genres.map((genre) => ({
                value: genre.value,
                label: genre.label,
              }))}
            />
          </Form.Item>
          <Form.Item label="ISBN:" name="isbn" rules={[{required: true, message: "Introduzca un ISBN" }]}>
            <Input placeholder="978-8484050421" name="isbn" maxLength={14} />
          </Form.Item>
          <Form.Item label="Ingreso:" name="existencia" rules={[{required: true, message: "Introduzca una cantidad entre 1 y 500" }]}>
            <InputNumber min={1} max={500} placeholder="Introduzca una cantidad entre 1 y 500" name="existencia" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Descripción:" name="sinopsis" rules={[{required: true, message: "Introduzca una descripción" }]}>
            <TextArea
              rows={6}
              placeholder="Descripción del libro"
              showCount
              maxLength={255}
              name="sinopsis"
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
          <Form.Item label="Portada:" name="portada" rules={[{required: true, message: "Seleccione una imágen para portada" }]}>
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
              size="large"
            >
              <Upload
                name="portada"
                action={ "http://127.0.0.1:3001/books/images/upload" }
                listType="picture"
                accept=".png, .jpg, .jpeg"
                maxCount={1}
                onChange={handleUploadChange}
                iconRender={() => {
                  return <Spin></Spin>
                }}
              >
                <Button icon={<UploadOutlined />}> Seleccionar imagen (Máx. 1) </Button>
              </Upload>
            </Space>
          </Form.Item>
        </Form>
      ),
      cancelText: "Cancelar",
      okText: "Guardar",
      onOk() {
        const formValues = form.getFieldsValue(); // Obtener los valores del formulario
  
        if (!formValues.titulo || !formValues.autor || !formValues.isbn || !formValues.fechaPublicacion || !formValues.genero || !formValues.precio || !localStorage.getItem("nombreImagen") || !formValues.existencia || !formValues.sinopsis) {
          message.warning("Por favor, complete los campos requeridos");
          return;
        }
  
        const formData = new FormData();
        formData.append("titulo", formValues.titulo);
        formData.append("autor", formValues.autor);
        formData.append("isbn", formValues.isbn);
        formData.append("fechaPublicacion", formValues.fechaPublicacion);
        formData.append("genero", formValues.genero);
        formData.append("precio", formValues.precio);
        formData.append("portada", "/uploads/" + localStorage.getItem("nombreImagen"));
        formData.append("existencia", formValues.existencia);
        formData.append("sinopsis", formValues.sinopsis);
  
        fetch("http://127.0.0.1:3001/books/save", {
          method: "post",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 200 || data.status === 304) {
              message.success(data.message);
            } else if (data.status === 400) {
              message.warning(data.message);
            } else if (data.status === 500) {
              message.error(data.message);
            } else {
              message.error(data.message);
            }

            setRefreshTable(!refreshTable); // Actualiza la tabla
            form.resetFields(); // Limpiar formulario después de enviar
          })
          .catch((error) => {
            message.error(error.message);
          });
      },
      onCancel() {},
    });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredBooksData = booksData.filter((item) =>
    item.titulo && item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "50px 0 16px 0" }}>
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
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={18}>
            {isSuperAdmin ? (
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              size={"medium"}
              onClick={showAddModal}
            >
              Añadir nuevo
            </Button>
            ) : null}
          </Col>
          <Col xs={24} sm={6}>
            <Search placeholder="Buscar por nombre de libro" onSearch={handleSearch} enterButton />
          </Col>
        </Row>
        <BooksTable booksData={filteredBooksData} refreshTable={refreshTable} setRefreshTable={setRefreshTable} />
      </div>
    </Content>
  );
};

export default Books;
