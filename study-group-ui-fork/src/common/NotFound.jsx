import { Image, Space, Typography } from 'antd';
import React from 'react';
import { NotFoundImage } from 'src/assets/images';

const NotFound = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Space direction="vertical" size="middle" align="center" width="100%">
        <Image width={150} fallback={NotFoundImage} />
        <Typography.Text style={{ fontSize: '2rem' }}>
          Hiện tại, chúng tôi chưa tìm thấy dữ liệu nào từ trang này
        </Typography.Text>
      </Space>
    </div>
  );
};

export default NotFound;
