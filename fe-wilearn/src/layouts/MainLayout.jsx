import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import NavbarMenu from "../components/Nabar/NavbarMenu";
import Drawer from "../components/Navbar/Drawer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../app/reducer/userReducer";

export default function MainLayout() {
  const { userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      dispatch(getUserInfo()).then((response) => {
        if (response.type === getUserInfo.rejected.type) {
          alert("You have not login")
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
