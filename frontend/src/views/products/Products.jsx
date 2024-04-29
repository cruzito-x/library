import React, { useState } from "react";
import { PlusCircleOutlined, PlusCircleFilled, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Input, InputNumber, Tag, Button, Modal, Form, Row, Col, Table, theme, Popconfirm, Image, message } from "antd";
import Uploader from "../../components/uploader/Uploader";

const Products = () => {
  const { Content } = Layout;
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [size, setSize] = useState("medium");
  const { confirm } = Modal;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [modal1Open, setModal1Open] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const confirmDelete = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancelDelete = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const showPromiseConfirm = () => {
    confirm({
      width: "35%",
      title: "Añadir libro",
      icon: <PlusCircleFilled />,
      content: (
        <Form
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
        >
          <Form.Item label="Libro:">
            <Input placeholder="ej. Jícaras tristes" />
          </Form.Item>
          <Form.Item label="Autor:">
            <Input placeholder="ej. Alfredo Espino" />
          </Form.Item>
          <Form.Item label="F. Publicación:">
            <Input placeholder="ej. 23/7/2016" />
          </Form.Item>
          <Form.Item label="Precio:">
            <Input prefix="$" placeholder="0.00" />
          </Form.Item>
          <Form.Item label="Género:">
            <Input placeholder="ej. Horror, Fantasía, Romance, etc." />
          </Form.Item>
          <Form.Item label="Ingreso:">
            <InputNumber min={1} max={100} defaultValue={1}/>
          </Form.Item>
          <Form.Item label="Descripción:">
            <TextArea rows={6} placeholder="Descripción del libro" showCount  maxLength={255} style={{ height: 120, resize: 'none' }}/>
          </Form.Item>
          <br />
          <Form.Item label="Portada:">
            <Uploader />
          </Form.Item>
          <Form.Item label="Registrado el:" style={{ display: 'none' }}>
            <Input value={ new Date().getDate()+'/'+(new Date().getMonth() + 1)+'/'+new Date().getFullYear() } disabled/>
          </Form.Item>
        </Form>
      ),
      cancelText: "Cancelar",
      okText: "Guardar",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("¡Oops, ocurrió un error!"));
      },
      onCancel() {},
    });
  };
  
  const handleRowClick = (record) => {
    setSelectedRowData(record);
    setModal1Open(true);
  }

  const columns = [
    {
      title: "Nombre del libro",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Autor",
      dataIndex: "author",
      key: "author"
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Acciones",
      dataIndex: "",
      key: "x",
      render: () => (
        <>
          <Button primary style={{ marginRight: "20px" }}>
            Editar
          </Button>
          <Popconfirm
            title="Eliminar registro"
            description="¿Está seguro de eliminar este registro?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            okText="Sí"
            cancelText="No"
          >
            <Button danger>Eliminar</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      name: "Cien años de soledad",
      author: "Gabriel García Márquez",
      price: "$20.99",
      description:
        "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982.",
    },
    {
      key: 2,
      name: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      price: "$18.50",
      description:
        "Don Quijote de la Mancha es una novela escrita por el español Miguel de Cervantes Saavedra. Publicada su primera parte con el título de El ingenioso hidalgo don Quijote de la Mancha a comienzos de 1605.",
    },
    {
      key: 3,
      name: "La sombra del viento",
      author: "Carlos Ruiz Zafón",
      price: "$15.75",
      description:
        "La sombra del viento es una novela del escritor español Carlos Ruiz Zafón, publicada en 2001. Es la primera parte de la serie de cuatro libros El Cementerio de los Libros Olvidados.",
    },
    {
      key: 4,
      name: "Rayuela",
      author: "Julio Cortázar",
      price: "$22.25",
      description:
        "Rayuela es una novela del escritor argentino Julio Cortázar, publicada en 1963. Es considerada una de las obras cumbre de la literatura del siglo XX.",
    },
    {
      key: 5,
      name: "Cien años de soledad",
      author: "Gabriel García Márquez",
      price: "$20.99",
      description:
        "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982.",
    },
    {
      key: 6,
      name: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      price: "$18.50",
      description:
        "Don Quijote de la Mancha es una novela escrita por el español Miguel de Cervantes Saavedra. Publicada su primera parte con el título de El ingenioso hidalgo don Quijote de la Mancha a comienzos de 1605.",
    },
    {
      key: 7,
      name: "La sombra del viento",
      author: "Carlos Ruiz Zafón",
      price: "$15.75",
      description:
        "La sombra del viento es una novela del escritor español Carlos Ruiz Zafón, publicada en 2001. Es la primera parte de la serie de cuatro libros El Cementerio de los Libros Olvidados.",
    },
    {
      key: 8,
      name: "Rayuela",
      author: "Julio Cortázar",
      price: "$22.25",
      description:
        "Rayuela es una novela del escritor argentino Julio Cortázar, publicada en 1963. Es considerada una de las obras cumbre de la literatura del siglo XX.",
    },
    {
      key: 9,
      name: "Cien años de soledad",
      author: "Gabriel García Márquez",
      price: "$20.99",
      description:
        "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982.",
    },
    {
      key: 10,
      name: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      price: "$18.50",
      description:
        "Don Quijote de la Mancha es una novela escrita por el español Miguel de Cervantes Saavedra. Publicada su primera parte con el título de El ingenioso hidalgo don Quijote de la Mancha a comienzos de 1605.",
    },
    {
      key: 11,
      name: "La sombra del viento",
      author: "Carlos Ruiz Zafón",
      price: "$15.75",
      description:
        "La sombra del viento es una novela del escritor español Carlos Ruiz Zafón, publicada en 2001. Es la primera parte de la serie de cuatro libros El Cementerio de los Libros Olvidados.",
    },
    {
      key: 12,
      name: "Rayuela",
      author: "Julio Cortázar",
      price: "$22.25",
      description:
        "Rayuela es una novela del escritor argentino Julio Cortázar, publicada en 1963. Es considerada una de las obras cumbre de la literatura del siglo XX.",
    },
    {
      key: 13,
      name: "Cien años de soledad",
      author: "Gabriel García Márquez",
      price: "$20.99",
      description:
        "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982.",
    },
    {
      key: 14,
      name: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      price: "$18.50",
      description:
        "Don Quijote de la Mancha es una novela escrita por el español Miguel de Cervantes Saavedra. Publicada su primera parte con el título de El ingenioso hidalgo don Quijote de la Mancha a comienzos de 1605.",
    },
    {
      key: 15,
      name: "La sombra del viento",
      author: "Carlos Ruiz Zafón",
      price: "$15.75",
      description:
        "La sombra del viento es una novela del escritor español Carlos Ruiz Zafón, publicada en 2001. Es la primera parte de la serie de cuatro libros El Cementerio de los Libros Olvidados.",
    },
    {
      key: 16,
      name: "Rayuela",
      author: "Julio Cortázar",
      price: "$22.25",
      description:
        "Rayuela es una novela del escritor argentino Julio Cortázar, publicada en 1963. Es considerada una de las obras cumbre de la literatura del siglo XX.",
    },
    {
      key: 17,
      name: "Cien años de soledad",
      author: "Gabriel García Márquez",
      price: "$20.99",
      description:
        "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982.",
    },
    {
      key: 18,
      name: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      price: "$18.50",
      description:
        "Don Quijote de la Mancha es una novela escrita por el español Miguel de Cervantes Saavedra. Publicada su primera parte con el título de El ingenioso hidalgo don Quijote de la Mancha a comienzos de 1605.",
    },
    {
      key: 19,
      name: "La sombra del viento",
      author: "Carlos Ruiz Zafón",
      price: "$15.75",
      description:
        "La sombra del viento es una novela del escritor español Carlos Ruiz Zafón, publicada en 2001. Es la primera parte de la serie de cuatro libros El Cementerio de los Libros Olvidados.",
    },
    {
      key: 20,
      name: "Rayuela",
      author: "Julio Cortázar",
      price: "$22.25",
      description:
        "Rayuela es una novela del escritor argentino Julio Cortázar, publicada en 1963. Es considerada una de las obras cumbre de la literatura del siglo XX.",
    },
  ];

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
          minHeight: 764,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Row gutter={16}>
          <Col span={18}>
            <Button type="primary" icon={<PlusCircleOutlined />} size={size} onClick={showPromiseConfirm}> Añadir nuevo </Button>
          </Col>
          <Col span={6}>
            <Search
              placeholder="Buscar"
              onSearch={onSearch}
              enterButton
            />
          </Col>
        </Row>

        <div style={{ marginTop: "20px" }}>
          <Row gutter={16}>
            <Col span={24}>
              <Table
                columns={columns}
                expandable={{
                  expandedRowRender: (record) => (
                    <p style={{ margin: 0 }}>
                      {record.description}
                    </p>
                  ),
                  rowExpandable: (record) => record.name !== "Not Expandable",
                }}
                dataSource={data}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => handleRowClick(record),
                  };
                }}
              />
              <Modal title="Detalles del libro" visible={modal1Open} onCancel={() => setModal1Open(false)}
              footer={[ <Button key="back" danger onClick={() => setModal1Open(false)}> Cerrar </Button> ]}>
                {selectedRowData && (
                <>
                <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
                  <Image src={"logo512.png"} style={{ width: "300px", height: "350px" }} alt="Product photo" />
                  </div>
                  <p> <strong> Existencia: </strong> <br /> <Tag bordered={false} color="error"> Agotado </Tag> </p>
                  <p> <strong> Nombre del libro: </strong> <br /> {selectedRowData.name}</p>
                  <p> <strong> Autor: </strong> <br /> {selectedRowData.author}</p>
                  <p> <strong> Precio: </strong> <br /> {selectedRowData.price}</p>
                  <p> <strong> Descripción: </strong> <br /> {selectedRowData.description}</p>
                </>
                )}
              </Modal>
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  );
};

export default Products;
