import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom"; // Outlet from 'react-router-dom'
import NavbarMenu from "../../components/Nabar/Navbarmenu";

export default function HomePage() {
  return (
    <Grid container spacing={0} items="center">
      <Grid xs={12}>
        <NavbarMenu />
      </Grid>
      <Grid xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
