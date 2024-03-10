import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom"; // Outlet from 'react-router-dom'

export default function HomePage() {
  return (
    <Grid container spacing={0} items="center">
      <Grid xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
