import React from "react";
import { Col, Row } from "antd";
import ParentManagement from "./components/ParentManagement";
import { useSelector } from "react-redux";
import StudentManagement from "./parents/StudentManagement";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateProfileForm from "./UpdateProfileForm";

const Setting = () => {
  const userProfile = useSelector((state) => state.auth.userInfo);

  return (
    <Row gutter={[10, 10]}>
      <Col span={16}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <UpdatePasswordForm />
          </Col>

          <Col span={24}>
            <UpdateProfileForm />
          </Col>
        </Row>
      </Col>

      <Col span={8}>
        {userProfile?.role === "Parent" ? <></> : <ParentManagement />}
      </Col>
    </Row>
  );
};

export default Setting;
