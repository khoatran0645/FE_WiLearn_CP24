import { Col, Row } from 'antd';
import React from 'react';
import MeetingCalendar from 'src/modules/meeting/MeetingCalendar';
import MeetingHeader from 'src/modules/meeting/MeetingHeader';

const MeetingPage = () => {
  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <MeetingHeader />
      </Col>
      <Col span={24}>
        <MeetingCalendar />
      </Col>
    </Row>
  );
};

export default MeetingPage;
