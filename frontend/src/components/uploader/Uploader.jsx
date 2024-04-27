import React, { useState } from 'react';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
const { Dragger } = Upload;

const Uploader = () => {
  const [imageUploaded, setImageUploaded] = useState(false);

  const props = {
    name: 'file',
    action: '/images/upload',
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: (file) => {
      const isImage = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg';
      if (!isImage) {
        message.error(`${file.name} is not an image file`);
        return Upload.LIST_IGNORE;
      }
      if (imageUploaded) {
        message.error('Ya se ha cargado una imagen. No se puede cargar otra.');
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        setImageUploaded(true);
        message.success(`${info.file.name} imagen cargada satisfactoriamente`);
      } else if (info.file.status === 'error') {
        message.error(`Fallo al cargar imagen: ${info.file.name}`);
      }
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p level={5}> Selecciona o suelta aquí la imagen a subir </p>
      <p className="ant-upload-hint" level={2}>
        Sólo imágenes en formato .png y .jpg
      </p>
    </Dragger>
  );
};

export default Uploader;
