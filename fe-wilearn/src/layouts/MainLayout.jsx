import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Grid item xs={12}>
        <p>main</p>
        <Outlet />
        <p>main</p>
      </Grid>
    </Grid>
  );
}
