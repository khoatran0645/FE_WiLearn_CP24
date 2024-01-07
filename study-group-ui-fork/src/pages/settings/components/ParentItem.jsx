import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';
import SETTING_API from 'src/services/api/parents/SettingAPI';

const ParentItem = ({ item, onRefreshAfterDelete }) => {
  const { isLoading, mutate } = useMutation(SETTING_API.REMOVE_PARENT, {
    onSuccess: () => {
      toast.success('Xóa phụ huynh thành công');
      onRefreshAfterDelete(item.id);
    },
    onError: () => {}
  });

  const onRemoveParent = () => {
    mutate(item.id);
  };

  return (
    <Col span={24}>
      <Card>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              width={'100%'}
              marginBottom={'2rem'}
            >
              <Space size="small">
                <Typography.Title level={5}>Tên phụ huynh: </Typography.Title>
                <Typography.Title level={5}>{item.parentUserName}</Typography.Title>
              </Space>
              <Button type="primary" onClick={onRemoveParent} loading={isLoading}>
                Xóa quản lí
              </Button>
            </Box>

            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              width={'100%'}
            >
              <Space size="small">
                <Typography.Text>Email: </Typography.Text>
                <Typography.Text>{item.parentEmail}</Typography.Text>
              </Space>

              <Space size="small">
                <Typography.Text>Tên đầy đủ: </Typography.Text>
                <Typography.Text>{item.parentFullName}</Typography.Text>
              </Space>
            </Box>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ParentItem;
