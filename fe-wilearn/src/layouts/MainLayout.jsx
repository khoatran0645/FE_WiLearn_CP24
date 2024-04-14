import Grid from "@mui/material/Grid";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarMenu from "../components/Nabar/NavbarMenu";
import Drawer from "../components/Navbar/Drawer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getUsermMeetings } from "../app/reducer/userReducer";
import { toast } from "react-toastify";
import { getGroupNotJoin, getStudentInvites, getSubjectLists } from "../app/reducer/studyGroupReducer";

export default function MainLayout() {
  const { userInfo } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsermMeetings());
    dispatch(getGroupNotJoin());
    dispatch(getSubjectLists());
    dispatch(getStudentInvites())
    if (!userInfo) {
      dispatch(getUserInfo()).then((response) => {
        if (response.type === getUserInfo.rejected.type) {
          
          const token = localStorage.getItem("token");
          // toast.warn(token)
          // toast.warn(response.type);
          toast.warn("You have not login")
          // alert(token);
          // alert(response.type);
          // alert("You have not login")
          navigate("signin");
        }
      });
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
