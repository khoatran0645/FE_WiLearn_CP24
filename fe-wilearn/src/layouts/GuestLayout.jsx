import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";


export default function GuestLayout() {
  return (
    <Grid container sx={{ flexGrow: 1, backgroundColor: "#f4f2f2", }}>
      <Grid item xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
