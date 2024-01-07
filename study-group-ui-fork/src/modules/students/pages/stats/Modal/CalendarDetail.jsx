import { CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import STUDENT_API from 'src/services/api/students/StudentAPI';
import { useSelector } from 'react-redux';
import { Col, Form, Input, Row, Space, Typography } from 'antd';

const CalendarDetailModal = ({ dateTime }, ref) => {
  const [form] = Form.useForm();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [statInformation, setStatsInformation] = useState({});
  const { isLoading, mutate } = useMutation(STUDENT_API.GET_STUDENT_STATS, {
    onSuccess: (values) => {
      setStatsInformation(values);
    }
  });
  const userProfile = useSelector((state) => state.auth.userInfo);

  //Hooks
  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true)
    };
  });

  useEffect(() => {
    if (dateTime) {
      mutate({
        studentId: userProfile.id,
        month: dateTime
      });
    }
  }, [dateTime]);

  useEffect(() => {
    if (statInformation) {
      form.setFieldValue({
        totalLesson: statInformation.totalMeetingsCount
      });

    }
  }, [statInformation]);

  //Features
  const onCloseModal = () => setIsOpenModal(false);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Dialog
      open={isOpenModal}
      onClose={onCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle id="alert-dialog-title">Thống kê chi tiết</DialogTitle>

      <DialogContent>
        {Object.keys(statInformation).length > 0 && (
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography.Text>Tổng số buổi học</Typography.Text>
                <Input type="number" disabled value={statInformation.totalMeetingsCount} />
              </Space>
            </Col>

            <Col span={24}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography.Text>Số buổi học tham gia</Typography.Text>
                <Input type="number" disabled value={statInformation.atendedMeetingsCount} />
              </Space>
            </Col>

            <Col span={24}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography.Text>Sổ buổi học vắng</Typography.Text>
                <Input type="number" disabled value={statInformation.missedMeetingsCount} />
              </Space>
            </Col>

            <Col span={12}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography.Text>Tổng thời gian học</Typography.Text>
                <Input disabled value={statInformation.totalMeetingTme} />
              </Space>
            </Col>

            <Col span={12}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography.Text>Trung bình điểm dò bài</Typography.Text>
                <Input type="number" disabled value={statInformation.averageVoteResult} />
              </Space>
            </Col>
          </Row>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default forwardRef(CalendarDetailModal);
