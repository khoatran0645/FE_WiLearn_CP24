import { Box } from '@mui/material';
import { Modal, Typography, Row, Col, Space, Card, Button } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

const HistoryVote = ({ itemDetail }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [historyVoteDetail, setHistoryVoteDetail] = useState([]);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [idSelected, setIdSelected] = useState(0);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpen(true)
    };
  });

  const onCloseModal = () => setIsOpen(false);

  const onOpenSetHistoryVoteDetail = (item, id) => {
    setIsOpenDetail(!isOpenDetail);
    setHistoryVoteDetail(item);
    setIdSelected(id);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onCloseModal}
      centered
      footer={null}
      title={<Typography.Title level={4}>Lịch sử dò bài</Typography.Title>}
    >
      <Row gutter={[15, 15]}>
        {itemDetail?.reviews?.map((item, index) => {
          const { average, revieweeUsername, details } = item;

          return (
            <Col span={24} key={index} id={index}>
              <Card size="small">
                <Space size="small" direction="vertical">
                  <Typography.Title level={5}>{revieweeUsername}</Typography.Title>
                  <Space size="small">
                    <Typography.Text>Số vote: </Typography.Text>
                    <Typography.Text>{details.length}</Typography.Text>
                  </Space>

                  <Space size="small">
                    <Typography.Text>Trung bình vote: </Typography.Text>
                    <Typography.Text>{average}</Typography.Text>
                  </Space>

                  <Button
                    type="primary"
                    onClick={() => onOpenSetHistoryVoteDetail(item.details, index)}
                  >
                    Kết quả đánh giá
                  </Button>
                </Space>

                {isOpenDetail && index === idSelected && (
                  <Space direction="vertical" style={{ marginTop: '1rem', width: '100%' }}>
                    <Typography.Title level={5}>Kết quả đánh giá</Typography.Title>
                    <Row gutter={[15, 15]}>
                      {historyVoteDetail.map((item, index) => {
                        const { reviewerUsername, result, comment } = item;
                        return (
                          <Col span={24} key={index}>
                            <Card size="small">
                              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                <Box
                                  display={'flex'}
                                  alignItems={'center'}
                                  justifyContent={'space-between'}
                                  width={'100%'}
                                >
                                  <Space size="small">
                                    <Typography.Text style={{ fontWeight: '600' }}>
                                      Người vote:
                                    </Typography.Text>
                                    <Typography.Text>{reviewerUsername}</Typography.Text>
                                  </Space>

                                  <Space size="small">
                                    <Typography.Text style={{ fontWeight: '600' }}>
                                      Điểm:
                                    </Typography.Text>
                                    <Typography.Text>{result}</Typography.Text>
                                  </Space>
                                </Box>
                                <Space size="small" direction="vertical">
                                  <Typography.Text style={{ fontWeight: '600' }}>
                                    Nội dung:
                                  </Typography.Text>
                                  <Typography.Paragraph>{comment}</Typography.Paragraph>
                                </Space>
                              </Space>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  </Space>
                )}
              </Card>
            </Col>
          );
        })}
      </Row>
    </Modal>
  );
};

export default forwardRef(HistoryVote);
