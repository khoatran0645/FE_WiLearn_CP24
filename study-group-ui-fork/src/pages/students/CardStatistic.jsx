import { Box } from "@mui/material";
import { Card, Col, Image, Row, Space, Typography } from "antd";
import React from "react";

const CardStatistic = ({ totalValues, label, subTitle, icon }) => {
  return (
    <Card size="small" style={{ marginBottom: "1rem" }}>
      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Space size="small">
            <Box borderRadius={"50%"} padding={1}>
              <Image
                src={icon}
                width={30}
                height={30}
                style={{ objectFit: "contain" }}
              />
            </Box>

            <Typography.Text
              style={{ fontWeight: "normal", fontSize: "1.5rem" }}
            >
              {label}
            </Typography.Text>
          </Space>
        </Col>

        <Col span={24}>
          <Space direction="vertical" size="small">
            <Typography.Text style={{ fontSize: "3.5rem", fontWeight: "bold" }}>
              {totalValues}
            </Typography.Text>

            <Typography.Text style={{ color: "gray" }}>
              {subTitle}
            </Typography.Text>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default CardStatistic;
