import { React, useState } from "react";
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
import GendersTable from "../../components/gendersTable/GendersTable";

const Gender = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { confirm } = Modal;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const { Content } = Layout;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSave = () => {
    const formData = new FormData();
    fetch("http://localhost:3001/genders/save", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        message.success(data.message);
        message.success("Datos guardados correctamente");
        setIsModalVisible(false);
      })
      .catch((error) => {
        message.error("Error al registrar el libro");
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
        <GendersTable />
      </div>
    </Content>
  );
};

export default Gender;
