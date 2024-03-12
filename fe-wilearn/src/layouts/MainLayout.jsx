import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import NavbarMenu from "../components/Nabar/NavbarMenu";
import Drawer from "../components/Navbar/Drawer";

export default function MainLayout() {
  return (
    <Grid container paddingTop={12} sx={{ flexGrow: 1 }}>
      <Grid item xs={12}>
        <NavbarMenu />
      </Grid>
      <Grid item xs={2}>
        <Drawer />
      </Grid>
      <Grid item xs={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
