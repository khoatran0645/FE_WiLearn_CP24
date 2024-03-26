import React, { useState } from 'react';
import { Box, Button, ListItemIcon, Menu, MenuItem, Popover, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const MultiLevelDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenu1AnchorEl, setSubMenu1AnchorEl] = useState(null);
  const [subMenu2AnchorEl, setSubMenu2AnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubMenu1AnchorEl(null);
  };

  const handleSubMenu1Click = (event) => {
    setSubMenu1AnchorEl(event.currentTarget);
  };

  const handleSubMenu1Close = () => {
    setSubMenu1AnchorEl(null);
    // handleClose();
  };

  const handleSubMenu2Click = (event) => {
    setSubMenu2AnchorEl(event.currentTarget);
  };

  const handleSubMenu2Close = () => {
    setSubMenu2AnchorEl(null);
    // handleClose();
  };

  const { userInfo } = useSelector(state => state.user);

  let leadGroups = [
    { id: 1, name: "Nhóm 1" },
    { id: 2, name: "Nhóm 2" },
  ]
  let joinGroups = [
    { id: 3, name: "Nhóm 3" },
    { id: 4, name: "Nhóm 4" },
  ]
  if (userInfo) {
    leadGroups = userInfo.leadGroups;
    joinGroups = userInfo.joinGroups;
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <div>
        <Button
          // onClick={handleClick}
          onMouseOver={handleClick}
          color="inherit"
          aria-controls="menu-groups"
          aria-haspopup="true"
          sx={{ fontSize: "inherit" }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Groups
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            component={Link}
            to={`groups`}
          >
            All
          </MenuItem>
          <MenuItem onClick={handleSubMenu1Click}>
            Manage
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
          </MenuItem>
          <MenuItem onClick={handleSubMenu2Click}>
            Join
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
          </MenuItem>
        </Menu>

        <Popover
          open={Boolean(subMenu1AnchorEl)}
          anchorEl={subMenu1AnchorEl}
          onClose={handleSubMenu1Close}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div>
            {leadGroups.map((group) => (
              <MenuItem
                component={Link}
                to={`groups/${group.id}`}
                onClick={handleSubMenu1Close}
                key={group.id}
              >
                {group.name}
              </MenuItem>
            ))}
          </div>
        </Popover>

        <Popover
          open={Boolean(subMenu2AnchorEl)}
          anchorEl={subMenu2AnchorEl}
          onClose={handleSubMenu2Close}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div>
            {joinGroups.map((group) => (
              <MenuItem
                component={Link}
                to={`groups/${group.id}`}
                onClick={handleSubMenu2Close}
                key={group.id}
              >
                {group.name}
              </MenuItem>
            ))}
          </div>
        </Popover>
      </div>
    </Box>
  );
};

export default MultiLevelDropdown;
