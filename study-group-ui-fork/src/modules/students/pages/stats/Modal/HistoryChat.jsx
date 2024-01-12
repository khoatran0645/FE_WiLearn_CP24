import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Modal, Row, Col, Space, Typography, Card } from 'antd';
import dayjs from 'dayjs';
import { FULL_DATETIME_FORMAT } from '../StudentCard';

const HistoryChat = ({ itemDetail }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  //hooks
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
      title={<Typography.Title level={4}>Lịch sử chat</Typography.Title>}
    >
      <Row gutter={[15, 15]}>
        {itemDetail?.chats?.map((item, index) => {
          const { accountUsername, content, time } = item;
          return (
            <Col span={24} key={index}>
              <Card size="small">
                <Space size="small" direction="vertical">
                  <Space size="small">
                    <Typography.Text>Nguời gửi: </Typography.Text>
                    <Typography.Text>{accountUsername}</Typography.Text>
                  </Space>

                  <Space size="small">
                    <Typography.Text>Nội dung: </Typography.Text>
                    <Typography.Text>{content}</Typography.Text>
                  </Space>

                  <Space size="small">
                    <Typography.Text>Thời gian: </Typography.Text>
                    <Typography.Text>{dayjs(time).format(FULL_DATETIME_FORMAT)}</Typography.Text>
                  </Space>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Modal>
  );
};

export default forwardRef(HistoryChat);
