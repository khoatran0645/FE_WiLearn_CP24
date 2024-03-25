import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Grid, Typography } from "@mui/material";
import { getGroupInfo, getSubjectLists } from "../../app/reducer/studyGroupReducer";
import { getGroupInfoAsMember, getGroupLists, getGroupMemberLists, getRequestFormList } from "../../app/reducer/studyGroupReducer/studyGroupReducerActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const drawerWidth = 220;

export default function ClippedDrawer() {
  const { groupId } = useParams();
  alert("useParams groupId: ", groupId)
  console.log("useParams groupId ", groupId)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getRoomsByGroupId(groupId));
    dispatch(getSubjectLists());
    const response = dispatch(getGroupInfo(groupId));
    dispatch(getGroupInfoAsMember(groupId));
    dispatch(getGroupLists());
    dispatch(getGroupMemberLists());
    dispatch(getRequestFormList(groupId));

    // response.then((r) => {
    //   console.log("response", r);
    //   console.log("response", r.type);
    //   if (r.type == getGroupInfo.rejected.type) {
    //     navigate("/groups");
    //   }
    // });
    // //new group hub
    // const accessTokenFactory = localStorage.getItem("token");
    // const groupHub = new HubConnectionBuilder()
    //   .withUrl(BE_URL + "/hubs/grouphub?groupId=" + groupId, {
    //     accessTokenFactory: () => accessTokenFactory,
    //   })
    //   .build();
    // groupHub.start().catch((err) => console.log(err));

    // groupHub.on("OnReloadMeeting", (message) => {
    //   // dispatch(getRoomsByGroupId(groupId));
    //   onRefreshGroup();
    //   message && toast.info(message);
    // });
    // return () => {
    //   groupHub.stop().catch((error) => {});
    // };
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 100,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "content-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
      
        <List>
          <ListItem>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar alt="Group Avatar" src="/path/to/group-avatar.jpg" />
              </Grid>
              <Grid item>
                <Typography variant="body1">Nhóm 1</Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <NavLink
              to=""
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="Members" />
              </ListItemButton>
            </NavLink>
          </ListItem>

          <ListItem>
            <NavLink
              to="discussions"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LocalLibraryIcon />
                </ListItemIcon>
                <ListItemText primary="Discussion" />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to="schedules"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="Schedule" />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to="docs"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <UploadFileIcon />
                </ListItemIcon>
                <ListItemText primary="Documents" />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to="statistics"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <EqualizerIcon />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to="groupsettings"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>

        {/* <List style={{ position: "absolute", bottom: "0" }}>
          <ListItem>
            <NavLink
              to="/home"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Out group" />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List> */}
      </Drawer>
    </Box>
  );
}
