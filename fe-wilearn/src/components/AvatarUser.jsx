import * as React from "react";
import {
  Menu,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Paper,
  ListItemIcon,
} from "@mui/material";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
const settings = [
  {
    name: "Profile",
    link: "usersettings",
    icon: <AccountBoxIcon />,
  },
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Logout",
    link: "/",
    icon: <LogoutIcon />,
  },
];
export default function AvatarUser() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="User Avatar"
            src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
          />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Paper elevation={0} sx={{ width: "100%", maxWidth: "100%" }}>
          {settings.map((setting) => (
            <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
              <NavLink
                to={setting.link}
                style={{
                  textDecoration: "none",
                  color: "black",
                  textAlign: "center",
                }}
              >
                <ListItemIcon>
                  {setting.icon}
                  <Typography textAlign="center" paddingLeft={2}>
                    {setting.name}
                  </Typography>
                </ListItemIcon>
              </NavLink>
            </MenuItem>
          ))}
        </Paper>
      </Menu>
    </>
  );
}
