import { Box, Typography } from "@mui/material";
import { DatePicker, Space } from "antd";
import React from "react";

const StudentStatHeader = () => {
  return (
    <Box
      flex
      alignItems={"end"}
      justifyContent={"space-between"}
      width={"100%"}
      gap={10}
    >
      <Space size="small" direction="vertical">
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Thống kê dữ liệu
        </Typography>
        {/* <Typography variant="subtitle1">
          Tổng hợp dữ liệu từ những buổi học mà học sinh đã tham gia
        </Typography> */}
      </Space>
    </Box>
  );
};

export default StudentStatHeader;
