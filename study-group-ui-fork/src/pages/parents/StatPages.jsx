import { Col, Row } from 'antd';
import React from 'react';
import ParentStatCard from 'src/modules/parents/pages/stats/StatCard';

const ParentStats = () => {
  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <ParentStatCard />
      </Col>
    </Row>
  );
};

export default ParentStats;
