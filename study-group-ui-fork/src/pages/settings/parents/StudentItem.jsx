import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';
import SETTING_API from 'src/services/api/parents/SettingAPI';
import FindStudent from './Modal/FindStudent';

const StudentItem = ({ item, refreshPage }) => {
  const { isLoading: isLoadingDelete, mutate: mutateDeleteStudent } = useMutation(
    SETTING_API.REMOVE_PARENT,
    {
      onSuccess: () => {
        toast.success('Xóa học sinh thành công');
        refreshPage();
      }
    }
  );

  const onRemoveStudent = () => {
    mutateDeleteStudent(item.id);
  };

  return (
    <Col span={24}>
      <Card>
        <Row gutter={[14, 14]}>
          <Col span={24}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              width={'100%'}
            >
              <Space size="small">
                <Typography.Title level={5}>Tên học sinh: </Typography.Title>
                <Typography.Title level={5}>{item.studentUserName}</Typography.Title>
              </Space>
            </Box>
          </Col>

          <Col span={24}>
            <Box
              display={'flex'}
              alignItems={'start'}
              gap={1}
              width={'100%'}
              flexDirection={'column'}
            >
              <Space size="small">
                <Typography.Text>Email: </Typography.Text>
                <Typography.Text>{item.studentEmail}</Typography.Text>
              </Space>

              <Space size="small">
                <Typography.Text>Tên đầy đủ: </Typography.Text>
                <Typography.Text>{item.studentFullName}</Typography.Text>
              </Space>
            </Box>
          </Col>

          <Col span={24}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'start'}
              gap={'0.5rem'}
              width={'100%'}
            >
              <Button loading={isLoadingDelete} onClick={onRemoveStudent}>
                Xóa học sinh
              </Button>
            </Box>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default StudentItem;
