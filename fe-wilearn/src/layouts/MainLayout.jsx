import Grid from "@mui/material/Grid";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarMenu from "../components/Nabar/NavbarMenu";
import Drawer from "../components/Navbar/Drawer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getUsermMeetings } from "../app/reducer/userReducer";
import { toast } from "react-toastify";
import {
  getGroupNotJoin,
  getStudentInvites,
  getSubjectLists,
} from "../app/reducer/studyGroupReducer";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { BE_URL } from "../constants";

export default function MainLayout() {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsermMeetings());
    dispatch(getGroupNotJoin());
    dispatch(getSubjectLists());
    dispatch(getStudentInvites());
    if (!userInfo) {
      dispatch(getUserInfo()).then((response) => {
        if (response.type === getUserInfo.rejected.type) {
          const token = localStorage.getItem("token");
          // toast.warn(token)
          // toast.warn(response.type);
          toast.warn("You have not login");
          // alert(token);
          // alert(response.type);
          // alert("You have not login")
          navigate("signin");
        } else if (response.type === getUserInfo.fulfilled.type) {
          // const groupHub = new HubConnectionBuilder()
          //   .withUrl(BE_URL + "/hubs/grouphub?groupId=all&accId"+ response.payload.id , {
          //     accessTokenFactory: () => accessTokenFactory,
          //   })
          //   .build();
          // groupHub.start().catch((err) => console.log("groupHub.start err", err));

          // groupHub.on("OnReloadSelfInfo", () => {
          //   dispatch(getUsermMeetings());
          //   dispatch(getUserInfo());
          // });
          // groupHub.on("OnReloadSelfMeeting", () => {
          //   dispatch(getUsermMeetings());
          //   // dispatch(getUserInfo());
          // });
        }
      });
    } else {
      if (userInfo.roleName == "Admin") {
        navigate("admin")
      } else {
        const accessTokenFactory = localStorage.getItem("token");
        // toast.info("new grouphub all")

        const groupHub = new HubConnectionBuilder()
          .withUrl(BE_URL + "/hubs/grouphub?groupId=all&accId="+ userInfo.id, {
            accessTokenFactory: () => accessTokenFactory,
          })
          .build();
        groupHub.start().catch((err) => console.log("groupHub.start err", err));

        // groupHub.on("OnReloadSelf", () => {
        //   dispatch(getUsermMeetings());
        //   dispatch(getUserInfo());
        // });
        groupHub.on("OnReloadSelfInfo", () => {
          dispatch(getUsermMeetings());
          dispatch(getUserInfo());
        });
        groupHub.on("OnReloadSelfMeeting", () => {
          dispatch(getUsermMeetings());
          // dispatch(getUserInfo());
        });
      }
    }
  }, [userInfo]);
  return (
    <Grid container paddingTop={12} sx={{ flexGrow: 1 }}>
      <Grid item xs={12}>
        <NavbarMenu />
      </Grid>
      <Grid item xs={12}>
        <Outlet />
      </Grid>

      {/* <Grid item xs={2}>
        <Drawer />
      </Grid>
      <Grid item xs={10}>
        <Outlet />
      </Grid> */}
    </Grid>
  );
}
