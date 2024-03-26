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
import { useDispatch, useSelector } from "react-redux";
const drawerWidth = 220;

export default function ClippedDrawer() {
  const { groupId } = useParams();
  const {groupInfo} = useSelector(state=>state.studyGroup)
  console.log("useParams groupId ", groupId)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getRoomsByGroupId(groupId));
    dispatch(getSubjectLists());
    const response = dispatch(getGroupInfo(groupId));
    const response2 = dispatch(getGroupInfoAsMember(groupId));
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
  }, [groupId]);
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
            <Grid
              container
              alignItems="center"
              spacing={2}
              marginLeft="2px"
              paddingTop={5}
            >
              <Grid item>
                <Avatar
                  style={{ width: 60, height: 60 }}
                  alt="Group Avatar"
                  src="https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
                />
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
                {groupInfo?.name}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <NavLink
              to="members"
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "#ff8080" : "black",
                  textDecoration: "none",
                };
              }}
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
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "#ff8080" : "black",
                  textDecoration: "none",
                };
              }}
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
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "#ff8080" : "black",
                  textDecoration: "none",
                };
              }}
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
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "#ff8080" : "black",
                  textDecoration: "none",
                };
              }}
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
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "#ff8080" : "black",
                  textDecoration: "none",
                };
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <EqualizerIcon />
                </ListItemIcon>
                <ListItemText primary="Overview" />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to="groupsettings"
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "#ff8080" : "black",
                  textDecoration: "none",
                };
              }}
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
