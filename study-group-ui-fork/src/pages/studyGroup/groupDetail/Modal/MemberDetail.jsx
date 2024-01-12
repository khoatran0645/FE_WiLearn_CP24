import { DeleteOutline, DeleteOutlineRounded } from "@mui/icons-material";
import { Button, Col, Form, Input, Modal, Row, Typography } from "antd";
import React from "react";

const MemberDetail = ({ information, onDeleteMember }, ref) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [form] = Form.useForm();

  React.useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
      closeModal: () => setIsOpenModal(false),
    };
  });

  React.useEffect(() => {
    if (Object.keys(information).length > 0) {
      form.setFieldsValue({
        fullName: information.fullName,
        dateOfBirth: information.dateOfBirth,
        email: information.email,
        phone: information.phone,
        school: information.schhool,
        username: information.username,
      });
    }
  }, [information]);

  const onCloseModal = () => setIsOpenModal(false);

  return (
    <Modal
      centered
      open={isOpenModal}
      onCancel={onCloseModal}
      footer={null}
      title={
        <Typography.Title level={5}>Thông tin thành viên</Typography.Title>
      }
    >
      {Object.keys(information).length > 0 && (
        <Form layout="vertical" requiredMark={false} form={form}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Form.Item name="fullName" label="Tên đầy đủ">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="email" label="Email">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="username" label="Tên đăng nhập">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="dateOfBirth" label="Ngày sinh">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="phone" label="Số điện thoại">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="school" label="Trường học">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Col span={24} style={{ display: "flex", justifyContent: "end" }}>
            <Button type="primary" danger onClick={onDeleteMember}>
              Xóa thành viên
            </Button>
          </Col>
        </Form>
      )}
    </Modal>
  );
};

export default React.forwardRef(MemberDetail);
