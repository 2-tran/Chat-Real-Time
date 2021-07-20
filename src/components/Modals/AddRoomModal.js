import React, { useContext } from 'react';
import { Form, Input, Modal } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { AddDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const { userInfo: { uid } } = useContext(AuthContext);

  const [form] = Form.useForm();

  const handleOK = () => {
    AddDocument('rooms', {
      ...form.getFieldValue(),
      members: [uid],
    });

    setIsAddRoomVisible(false);
    form.resetFields();
  }

  const handleCancel = () => {
    setIsAddRoomVisible(false);
    form.resetFields();
  }

  return (
    <div>
      <Modal
        title="Create room"
        visible={isAddRoomVisible}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Enter description" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}