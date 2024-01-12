import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Button, Col, Form, Input, Modal, Row, Typography, message } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LESSON_API from 'src/services/api/students/LessonAPI';
import { fieldValue } from 'src/utils/helper';

const MeetingInstant = ({ onJoinRoom }, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();
  const { groupId } = useParams();
  const { isLoading, mutate } = useMutation(LESSON_API.START_MEETING_INSTANT, {
    onSuccess: (values) => {
      toast.success('Tạo phòng học thành công');
      setIsOpenModal(false);
      form.resetFields();

      onJoinRoom(values.id);
    },
    onError: () => {
      toast.error('Tạo phòng học thất bại');
    }
  });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true)
    };
  });

  const onCloseModal = () => setIsOpenModal(false);

  const onSubmit = (values) => {
    mutate({ name: values.name, content: values.content, groupId: Number(groupId) });
  };

  return (
    <Modal
      centered
      open={isOpenModal}
      onCancel={onCloseModal}
      footer={null}
      title={<Typography.Title level={5}>Tạo phòng học</Typography.Title>}
    >
      <Form layout="vertical" requiredMark={false} form={form} onFinish={onSubmit}>
        <Row gutter={[14, 14]}>
          <Col span={24}>
            <Form.Item name="name" label="Tên phòng học" rules={[fieldValue.required]}>
              <Input placeholder="Nhập tên phòng học" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="content" label="Nội dung học" rules={[fieldValue.required]}>
              <Input placeholder="Nhập nội dung học" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'end'} gap={'1rem'}>
              <Button type="primary" loading={isLoading} htmlType="submit">
                Xác nhận tạo phòng học
              </Button>
              <Button onClick={onCloseModal}>Đóng cửa sổ</Button>
            </Box>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(MeetingInstant);
