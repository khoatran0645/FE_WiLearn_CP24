import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Drawer from "../components/Navbar/Drawer";


export default function GuestLayout() {
  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Grid item xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
