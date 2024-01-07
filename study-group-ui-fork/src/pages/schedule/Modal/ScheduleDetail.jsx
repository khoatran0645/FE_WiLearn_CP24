import { Padding } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Col, Modal, Row, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FULL_DATETIME_FORMAT } from "src/modules/students/pages/stats/StudentCard";

const ScheduleDetail = ({ item, date }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(item);

  //hooks
  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpen(true),
    };
  });

  const onCloseModal = () => setIsOpen(false);

  return (
    <Modal
      open={isOpen}
      onCancel={onCloseModal}
      centered
      footer={null}
      title={
        <Typography.Title level={4}>Lịch học ngày {date}</Typography.Title>
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {item.map((it) => (
          <Row gutter={[10, 10]} style={{ background: "#FDFAEF", padding: 2 }}>
            <Col span={24}>
              <Space direction="vertical" size="small">
                <Space size="small">
                  <Typography.Text>Tên buổi học : </Typography.Text>
                  <Typography.Text>{it.name} của nhóm:</Typography.Text>
                  <Typography.Text style={{ fontWeight: 700 }}>
                    {it.groupName}
                  </Typography.Text>
                </Space>
                <Space size="small">
                  <Typography.Text>Thời gian bắt đầu : </Typography.Text>
                  <Typography.Text>
                    {dayjs(it.scheduleStart).format(FULL_DATETIME_FORMAT)}
                  </Typography.Text>
                </Space>
                <Space size="small">
                  <Typography.Text>Thời gian kết thúc : </Typography.Text>
                  <Typography.Text>
                    {dayjs(it.scheduleEnd).format(FULL_DATETIME_FORMAT)}
                  </Typography.Text>
                </Space>
                {/* <Space size="small">
                  <Typography.Text>Trạng thái : </Typography.Text>
                  <Tag
                    color={
                      it.status === "LIVE"
                        ? "green"
                        : it.status === "SCHEDULE"
                        ? "orange"
                        : "red"
                    }
                  >
                    {it.status === "LIVE"
                      ? "Có thể bắt đầu"
                      : it.status === "SCHEDULE"
                      ? "Chưa tới thời gian bắt đầu"
                      : "Không thể bắt đầu"}
                  </Tag>
                </Space> */}
              </Space>
            </Col>
          </Row>
        ))}
      </Box>
    </Modal>
  );
};

export default forwardRef(ScheduleDetail);
