import { Box } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Topbar = () => {
  const userProfile = useSelector((state) => state.auth.userInfo);

  return (
    <Typography.Title level={3} style={{ color: "white" }}>
      <i className="fi fi-rr-hand-wave" style={{ marginRight: "1rem" }}></i>
      Xin chào, {userProfile?.username} - {userProfile?.fullName}
    </Typography.Title>
  );
};

export default Topbar;
