import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import React from "react";
import Groups2Icon from "@mui/icons-material/Groups2";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useMatch, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { reset } from "src/pages/auth/reducer";
import { useDispatch } from "react-redux";
import BarChartIcon from "@mui/icons-material/BarChart";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import { publicRoutes } from "src/common/constants";

const listSidebarItems = [
  {
    text: "Nhóm học",
    path: "/study-group",
    icon: <Groups2Icon />,
    role: "Student",
    allowedPermissions: [],
  },
  {
    text: "Lịch học",
    path: "/schedule",
    icon: <EventAvailableIcon />,
    role: "Student",
    allowedPermissions: [],
  },
  {
    text: "Học sinh",
    path: "/study",
    icon: <LaptopChromebookIcon />,
    role: "Parent",
    allowedPermissions: [],
  },
  {
    text: "Thống kê",
    path: "/student/stats",
    icon: <BarChartIcon />,
    role: "Student, Parent",
    allowedPermissions: [],
  },
  {
    text: "Cài đặt",
    path: "/settings",
    icon: <SettingsIcon />,
    role: "Student, Parent",
    allowedPermissions: [],
  },
];
{
  (" ");
}
const ListItemButtonStyled = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active, theme }) => {
  return {
    color: active && theme.palette.primary.main,
    fontWeight: 500,
    "& .MuiTypography-root": {
      fontWeight: 600,
    },
    "& .MuiListItemIcon-root": {
      color: active && theme.palette.primary.main,
    },
  };
});

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pattern = (path) =>
    useMatch({
      path,
      end: false,
    });

  const isActive = (path) => pattern(path) !== null;

  const handleLogout = () => {
    dispatch(reset());
    localStorage.removeItem("token");
    navigate(publicRoutes.login);
  };

  const role = localStorage.getItem("role");

  return (
    <Box
      sx={{
        height: "calc(100vh - 65px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "background.main",
      }}
    >
      <List sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {listSidebarItems.map((item) =>
          item.role.includes(role) ? (
            <ListItem key={item.path} disablePadding>
              <ListItemButtonStyled
                active={isActive(item.path)}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButtonStyled>
            </ListItem>
          ) : null
        )}
      </List>
      <List
        sx={{
          mb: "32px",
        }}
      >
        <ListItem disablePadding>
          <ListItemButtonStyled onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Đăng xuất"} />
          </ListItemButtonStyled>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
