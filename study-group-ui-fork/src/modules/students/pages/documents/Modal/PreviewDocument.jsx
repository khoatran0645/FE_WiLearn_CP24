import { Col, Modal, Row, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

export const DATE_TIME_FORMAT = 'DD/MM/YYYY - HH:mm';
const PreviewDocument = ({ documentItem }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpen(true)
    };
  });

  const onCloseModal = () => setIsOpen(false);

  return (
    <Modal
      open={isOpen}
      onCancel={onCloseModal}
      centered
      footer={null}
      width={800}
      title={<Typography.Title level={4}>Thông tin chi tiết tài liệu</Typography.Title>}
    >
      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Space size="small">
            <Typography.Text>Tên tài liệu: </Typography.Text>
            <Typography.Text>{documentItem.name}</Typography.Text>
          </Space>
        </Col>

        <Col span={24}>
          <Space size="small">
            <Typography.Text>Trạng thái: </Typography.Text>

            <Tag color={documentItem.approved ? 'green' : 'red'}>
              {documentItem.approved
                ? 'Tài liệu đã được chấp nhận'
                : 'Tài liệu chưa được chấp nhận'}
            </Tag>
          </Space>
        </Col>

        <Col span={24}>
          <Space size="small">
            <Typography.Text>Thuộc về nhóm: </Typography.Text>
            <Typography.Text>{documentItem.groupId}</Typography.Text>
          </Space>
        </Col>
        <Col span={24}>
          <Space size="small">
            <Typography.Text>Ngày tạo: </Typography.Text>
            <Tag>{dayjs(documentItem.createdDate).format(DATE_TIME_FORMAT)}</Tag>
          </Space>
        </Col>

        <Col span={24}>
          <Space size="small">
            <Typography.Text>Đường dẫn: </Typography.Text>
            <a href={documentItem.httpLink}>{documentItem.httpLink}</a>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default forwardRef(PreviewDocument);
