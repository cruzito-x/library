import { React, useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  PlusCircleFilled,
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
import BooksTable from "../../components/booksTable/BooksTable";

const Books = () => {
  const { Content } = Layout;
  const { Search } = Input;
  const [searchTerm, setSearchTerm] = useState("");
  const [size, setSize] = useState("medium");
  const { confirm } = Modal;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const [genres, setGenres] = useState([]);
  const [defaultValue, setDefaultValue] = useState("");
  const [imageName, setImageName] = useState(null);
  const [booksData, setBooksData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetch("http://localhost:3001/books")
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

  const handleChange = (value) => {};

  const handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      // Si la carga se completa, obtenemos el nombre del archivo y lo almacenamos en localStorage
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString('es-ES', { timeZone: 'UTC' }).replace(/[\/\,\.\s\:]/g, '');
      const fileName = `${formattedDate}.${info.file.name.split('.').pop()}`; // Mantener la extensión original del archivo

      localStorage.setItem('nombreImagen', fileName);
      setImageName(fileName); // Actualizamos el estado con el nombre de la imagen cargada
      console.log(localStorage.getItem('nombreImagen'));
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/books/genres")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data);
        if (data.length > 0) {
          setDefaultValue(data[0].value);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const showAddModal = () => {
    confirm({
      width: "35%",
      title: "Añadir libro",
      icon: <PlusCircleFilled />,
      style: { top: "5%" },
      content: (
        <Form
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
        >
          <Form.Item label="Libro:" name="titulo">
            <Input placeholder="ej. Jícaras tristes" name="titulo" />
          </Form.Item>
          <Form.Item label="Autor:" name="autor">
            <Input placeholder="ej. Alfredo Espino" name="autor" />
          </Form.Item>
          <Form.Item label="F. Publicación:" name="fechaPublicacion">
            <Input placeholder="23-07-2016" name="fechaPublicacion" />
          </Form.Item>
          <Form.Item label="Precio:" name="precio">
            <Input prefix="$" placeholder="0.00" name="precio" />
          </Form.Item>
          <Form.Item label="Género:" name="genero">
            <Select
              defaultValue={defaultValue}
              onChange={handleChange}
              options={genres.map((genre) => ({
                value: genre.value,
                label: genre.label,
              }))}
            />
          </Form.Item>
          <Form.Item label="ISBN:" name="isbn">
            <Input placeholder="978-8484050421" name="isbn" />
          </Form.Item>
          <Form.Item label="Ingreso:" name="existencia">
            <InputNumber min={1} max={500} defaultValue={1} name="existencia" />
          </Form.Item>
          <Form.Item label="Descripción:" name="sinopsis">
            <TextArea
              rows={6}
              placeholder="Descripción del libro"
              showCount
              maxLength={255}
              name="sinopsis"
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
          <Form.Item label="Portada:" name="portada">
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
              size="large"
            >
              <Upload
              name="portada"
              action={ "http://localhost:3001/books/images/upload" }
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
        const formData = new FormData();
        const formValues = form.getFieldsValue(); // Obtener los valores del formulario

        formData.append("titulo", formValues.titulo);
        formData.append("autor", formValues.autor);
        formData.append("isbn", formValues.isbn);
        formData.append("fechaPublicacion", formValues.fechaPublicacion);
        formData.append("genero", formValues.genero);
        formData.append("precio", formValues.precio);
        formData.append("portada", "/uploads/"+localStorage.getItem("nombreImagen"));
        formData.append("existencia", formValues.existencia);
        formData.append("sinopsis", formValues.sinopsis);

        fetch("http://localhost:3001/books/save", {
          method: "post",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            message.success(data.message);
            setRefreshTable(!refreshTable); // Actualiza la tabla
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
    item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Row gutter={16}>
          <Col span={18}>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              size={size}
              onClick={showAddModal}
            > Añadir nuevo </Button>
          </Col>
          <Col span={6}>
            <Search placeholder="Buscar por nombre de libro" onSearch={handleSearch} enterButton />
          </Col>
        </Row>
        <BooksTable booksData={filteredBooksData} refreshTable={refreshTable} setRefreshTable={setRefreshTable} />
      </div>
    </Content>
  );
};

export default Books;
