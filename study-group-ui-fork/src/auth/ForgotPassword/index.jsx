import { useMutation } from "@tanstack/react-query";
import { Button, Col, Form, Input, Modal, Row, Typography } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import STUDENT_API from "src/services/api/students/StudentAPI";
import { fieldValue } from "src/utils/helper";

const ForgotPassword = (props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const { isLoading, mutate } = useMutation(STUDENT_API.FORGOT_PASSWORD, {
    onSuccess: () => {
      toast.success("Mã xác thực đã được gửi tới email của bạn");
      form.resetFields();
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Email này không tồn tại trong hệ thống");
    },
  });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpen(true),
    };
  });

  const onCloseModal = () => setIsOpen(false);
  const onFinish = (values) => {
    mutate(values.email);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={onCloseModal}
      centered
      footer={null}
      title={<Typography.Title level={4}>Thay đổi mật khẩu</Typography.Title>}
    >
      <Form
        onFinish={onFinish}
        requiredMark={false}
        layout="vertical"
        size="middle"
        form={form}
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Form.Item
              name="email"
              label="Email"
              rules={[fieldValue.required, fieldValue.email]}
            >
              <Input placeholder="Nhập email để khôi phục mật khẩu" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                gap: "0.5rem",
              }}
            >
              <Button type="primary" loading={isLoading} htmlType="submit">
                Gửi xác thực yêu cầu
              </Button>
              <Button onClick={onCloseModal}>Đóng cửa sổ</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(ForgotPassword);
