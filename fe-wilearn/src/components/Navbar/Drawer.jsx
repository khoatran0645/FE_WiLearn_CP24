import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  CircularProgress,
} from "@mui/material";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SettingsIcon from "@mui/icons-material/Settings";

import {
  getGroupInfo,
  getSubjectLists,
} from "../../app/reducer/studyGroupReducer";
import {
  getGroupInfoAsMember,
  getGroupLists,
  getGroupMemberLists,
  getRequestFormList,
  getDocumentListByGroup,
  getStudentInvites,
  getDiscussionByGroupId,
  getGrouptMeetingList,
  getAnswerByDiscussionId,
  getDiscussionById,
} from "../../app/reducer/studyGroupReducer/studyGroupActions";
import { useDispatch, useSelector } from "react-redux";
import { BE_URL } from "../../constants";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { toast } from "react-toastify";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { getUsermMeetings } from "../../app/reducer/userReducer";

const drawerWidth = 220;

export default function ClippedDrawer() {
  const { groupId, discussionId } = useParams();
  const { groupInfo, loadingGroup } = useSelector((state) => state.studyGroup);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRefreshGroup = () => {
    dispatch(getSubjectLists());
    // dispatch(getGroupInfoAsMember(groupId));
    dispatch(getGroupLists());
    dispatch(getGroupMemberLists());
    dispatch(getRequestFormList(groupId));
    dispatch(getDocumentListByGroup(groupId));
    dispatch(getStudentInvites());
    dispatch(getDiscussionByGroupId(groupId));
    dispatch(getGrouptMeetingList(groupId));
    // toast.info("getUsermMeetings")
    dispatch(getUsermMeetings())
    const response = dispatch(getGroupInfo(groupId));
    response.then((r) => {
      if (r.type === getGroupInfo.rejected.type) {
        navigate("/groups");
      }
    });
  };

  useEffect(() => {
    dispatch(getSubjectLists());
    // const response2 = dispatch(getGroupInfoAsMember(groupId));
    dispatch(getGroupLists());
    dispatch(getGroupMemberLists());
    dispatch(getRequestFormList(groupId));
    dispatch(getDocumentListByGroup(groupId));
    dispatch(getDiscussionByGroupId(groupId));
    dispatch(getGrouptMeetingList(groupId));
    
    const response = dispatch(getGroupInfo(groupId));
    response.then((r) => {
      if (r.type === getGroupInfo.rejected.type) {
        navigate("/groups");
      }
    });

    const accessTokenFactory = localStorage.getItem("token");
    const groupHub = new HubConnectionBuilder()
      .withUrl(BE_URL + "/hubs/grouphub?groupId=" + groupId, {
        accessTokenFactory: () => accessTokenFactory,
      })
      .build();
    groupHub.start().catch((err) => console.log("groupHub.start err", err));

    groupHub.on("OnReloadGroup", (message) => {
      onRefreshGroup();
      message && toast.info(message);
    });

    groupHub.on("OnReloadMeeting", (message) => {
      dispatch(getGrouptMeetingList(groupId));
      message && toast.info(message);
    });

    groupHub.on("OnReloadDicussion", (message) => {
      dispatch(getDiscussionByGroupId(groupId));
      message && toast.info(message);
      console.log("discussionId", discussionId)
      if(discussionId){
        dispatch(getDiscussionById(discussionId));
        dispatch(getAnswerByDiscussionId(discussionId));
      }
    });

    groupHub.on("OnReloadDocument", (message) => {
      dispatch(getDocumentListByGroup(groupId));
      message && toast.info(message);
    });

    return () => {
      groupHub.stop().catch((error) => { });
    };
  }, [groupId, discussionId]);

  const [miniVariant, setMiniVariant] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Hidden mdDown>
        <Drawer
          PaperProps={{
            sx: {
              // backgroundColor: "#F8F7F4",
            },
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <List>
            <ListItem
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              {loadingGroup ? (
                <CircularProgress />
              ) : (
                <Avatar
                  style={{ width: 80, height: 80 }}
                  alt="Group Avatar"
                  src={
                    groupInfo?.imagePath ||
                    "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
                  }
                />
              )}
              <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
                {groupInfo?.name}
              </Typography>
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
                to="meetings"
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
        </Drawer>
      </Hidden>
      <Hidden lgUp>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setMiniVariant(!miniVariant)}
          sx={{ ml: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          sx={{
            backgroundColor: "#f2ffe6",
            width: miniVariant ? 220 : drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: miniVariant ? 220 : drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="temporary"
          anchor="left"
          open={miniVariant}
          onClose={() => setMiniVariant(false)}
        >
          <Toolbar />
          <List>
            <ListItem
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <Avatar
                style={{ width: 80, height: 80 }}
                alt="Group Avatar"
                src={
                  groupInfo?.imagePath ||
                  "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
                }
              />
              <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
                {groupInfo?.name}
              </Typography>
            </ListItem>

            <ListItem>
              <NavLink
                to="members"
                style={({ isActive }) => {
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
                to="meetings"
                style={({ isActive }) => {
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
                to="discussions"
                style={({ isActive }) => {
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
                to="docs"
                style={({ isActive }) => {
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
                style={({ isActive }) => {
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
                style={({ isActive }) => {
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
        </Drawer>
      </Hidden>
    </Box>
  );
}
