import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import NavbarMenu from "../components/Nabar/NavbarMenu";

export default function MainLayout() {
  return (
    <Grid container spacing={12} sx={{ flexGrow: 1 }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <NavbarMenu />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Outlet />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}></Grid>
    </Grid>
  );
}
