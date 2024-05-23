import React, { useEffect, useState } from "react";
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
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../app/reducer/userReducer";
import { googleLogout } from "@react-oauth/google";

const settings = [
  {
    name: "Profile",
    link: "/profile",
    icon: <AccountBoxIcon />,
  },
  {
    name: "Logout",
    link: "/",
    icon: <LogoutIcon />,
  },
];

export default function AvatarUser() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [loadingAvatar, setLoadingAvatar] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    googleLogout();
    navigate("/");
    window.location.reload();
    console.log("logout complete");
  };

  const navigateToProfile = (e) => {
    e.preventDefault();
    console.log("profile loaded");
    navigate("profile");
  };

  useEffect(() => {
    dispatch(getUserInfo())
      .then(() => {
        setLoadingAvatar(false);
      })
      .catch((error) => {
        setLoadingAvatar(false);
        console.error("Error fetching user info:", error);
      });
  }, [dispatch]);

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {loadingAvatar ? (
            <Avatar alt="User Avatar" />
          ) : (
            <Avatar alt="User Avatar">
              <img
                src={userInfo?.imagePath || "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"}
                alt="User Avatar"
                style={{ width: "100%", height: "auto" }}
              />
            </Avatar>
          )}
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
              <Link
                onClick={
                  setting.name === "Logout" ? handleLogout : navigateToProfile
                }
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
              </Link>
            </MenuItem>
          ))}
        </Paper>
      </Menu>
    </>
  );
}
