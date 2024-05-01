import { React, useState, useEffect } from "react";
import axios from "axios";
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
import ProductsTable from "../../components/productsTable/ProductsTable";

const Products = () => {
  const { Content } = Layout;
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [size, setSize] = useState("medium");
  const { confirm } = Modal;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const [genres, setGenres] = useState([]);
  const [defaultValue, setDefaultValue] = useState("");
  const [files, setFiles] = useState({});

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleFileUpload = ({ file }) => {
    console.log(file);
    setFiles(pre => {
      return { ...pre, [file.uid]: file }
    });

    const getFileObject = (progress) => {
      return {
        uid: file.uid,
        name: file.name,
        progress: progress
      }
    }

    axios.post('http://localhost:3001/books/upload', file, {
      onUploadProgress: (event) => {
        console.log(event);
        setFiles((pre) => {
          return { ...pre, [file.uid]: getFileObject(event.progress) }
        });
      }
    });
  }

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
        console.error("Error al cargar los géneros:", error);
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
          <Form.Item label="Ingreso:" name="ingreso">
            <InputNumber min={1} max={100} defaultValue={1} name="ingreso" />
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
              name="portada" // Nombre del campo que recibirá el servidor
              customRequest={handleFileUpload}
              listType="picture"
              accept=".png, .jpg, .jpeg"
              maxCount={1}
              iconRender={() => {
                return <Spin></Spin>
              }}
              >
                <Button icon={<UploadOutlined />}> Seleccionar imagen (Máx. 1) </Button>
              </Upload>
              {Object.values(files).map((file, index) => {
                return <Space></Space>
              })}
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
        formData.append("ingreso", formValues.ingreso);
        formData.append("sinopsis", formValues.sinopsis);

        if (formValues.portada && formValues.portada.file) { // Verificar si 'portada' está definido y contiene un archivo
          formData.append("portada", formValues.portada.file); // Agregar la imagen al FormData
        }
        console.log(formData);

        fetch("http://localhost:3001/books/save", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            message.success(data.message);
          })
          .catch((error) => {
            message.error("Error al registrar el libro");
          });
      },
      onCancel() {},
    });
  };

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
            <Search placeholder="Buscar" onSearch={onSearch} enterButton />
          </Col>
        </Row>
        <ProductsTable />
      </div>
    </Content>
  );
};

export default Products;
