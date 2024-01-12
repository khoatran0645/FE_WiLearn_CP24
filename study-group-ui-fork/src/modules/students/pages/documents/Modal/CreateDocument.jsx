import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Col, Form, Input, Modal, Row, Select, Typography, message } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import DOCUMENT_API from 'src/services/api/students/DocumentAPI';
import { fieldValue } from 'src/utils/helper';

import { toast } from 'react-toastify';

const CreateDocument = ({ refreshPage }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [file, setFile] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const { isLoading, mutate } = useMutation(DOCUMENT_API.CREATE, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Chia sẻ tài liệu mới thành công'
      });

      toast.success('Chia sẻ tài liệu mới thành công');
      refreshPage();
      form.resetFields();
      setIsOpen(false);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Tạo tài liệu mới thất bại, hãy kiểm tra lại thông tin'
      });
    }
  });
  const { refetch } = useQuery(['groups-members'], DOCUMENT_API.GET_GROUP_MEMBER, {
    onSuccess: (values) => {
      const convertGroupSelect = values.map((item) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setGroups(convertGroupSelect);
    }
  });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpen(true)
    };
  });

  useEffect(() => {
    refetch();
  }, []);

  //features
  const onCloseModal = () => setIsOpen(false);
  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('file', file);
    mutate({ groupId: values.groupId, file: formData });
  };
  const onChangeFile = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onCloseModal}
      centered
      footer={null}
      title={<Typography.Title level={4}>Thông tin tài liệu</Typography.Title>}
    >
      {contextHolder}
      <Form onFinish={onFinish} requiredMark={false} layout="vertical" size="middle" form={form}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Form.Item name="groupId" rules={[fieldValue.required]}>
              <Select options={groups} showSearch placeholder="Chọn một nhóm bất kì" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Tệp đích kèm" name="file" rules={[fieldValue.required]}>
              <Input
                type="file"
                onChange={onChangeFile}
                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
              text/plain, application/pdf, image/*"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                gap: '0.5rem'
              }}
            >
              <Button type="primary" loading={isLoading} htmlType="submit">
                Chia sẻ tài liệu
              </Button>
              <Button onClick={onCloseModal}>Đóng cửa sổ</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(CreateDocument);
