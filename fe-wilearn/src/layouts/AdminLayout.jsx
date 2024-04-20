import Grid from "@mui/material/Grid";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getUsermMeetings } from "../app/reducer/userReducer";
import { toast } from "react-toastify";
import {
  getSubjectLists,
} from "../app/reducer/studyGroupReducer";
import AdminNavbarMenu from "../components/Nabar/AdminNavbarMenu";
import { getNewReportLists, getReportLists } from "../app/reducer/adminReducer/adminActions";

export default function AdminLayout() {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubjectLists());
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
          navigate("/signin");
        }
      });
    }else{
      if(userInfo.roleName!="Admin"){
        navigate("/home")
      }else{
    dispatch(getSubjectLists());
    dispatch(getReportLists())
        dispatch(getNewReportLists())
      }
    }
  }, [userInfo]);
  return (
    <Grid container paddingTop={12} sx={{ flexGrow: 1 }}>
      <Grid item xs={12}>
        <AdminNavbarMenu />
      </Grid>
      <Grid item xs={12}>
        {/* <h1>Admin</h1> */}
        <Outlet />
      </Grid>
    </Grid>
  );
}
