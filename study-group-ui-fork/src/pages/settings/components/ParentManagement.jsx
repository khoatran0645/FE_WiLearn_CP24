import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, Col, Row, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import SETTING_API from 'src/services/api/parents/SettingAPI';
import ParentItem from './ParentItem';
import NotFound from 'src/common/NotFound';
import ParentWaitingList from './Modal/ParentWaitingList';

const ParentManagement = () => {
  const [parentList, setParentList] = useState([]);
  const parentWaitingRef = useRef();

  const { isLoading, refetch } = useQuery(['parents-list'], SETTING_API.PARENT_LIST, {
    enabled: false,
    onSuccess: (values) => {
      setParentList(values);
    }
  });

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  const onRefreshAfterDelete = (parentId) => {
    const result = parentList.filter((item) => item.id !== parentId);
    setParentList(result);
  };

  const onOpenParentWaitList = () => {
    parentWaitingRef.current.openModal();
  };

  const onRefreshAllPage = () => {
    refetch();
  };

  return (
    <Card>
      <ParentWaitingList ref={parentWaitingRef} onRefreshPage={onRefreshAllPage} />
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            width={'100%'}
          >
            <Typography.Title level={5}>Danh sách phụ huynh</Typography.Title>
            <Button type="primary" onClick={onOpenParentWaitList}>
              Yêu cầu quản lí mới
            </Button>
          </Box>
        </Col>

        <Col span={24}>
          <Row gutter={[10, 10]}>
            {parentList.length > 0 ? (
              parentList.map((item, index) => {
                return (
                  <ParentItem key={index} item={item} onRefreshAfterDelete={onRefreshAfterDelete} />
                );
              })
            ) : (
              <NotFound />
            )}
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ParentManagement;
