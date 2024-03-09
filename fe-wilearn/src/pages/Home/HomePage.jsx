import Navbarmenu from "../../components/Nabar/Navbarmenu";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom"; // Outlet from 'react-router-dom'

export default function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid xs={12}>
          <Navbarmenu />
        </Grid>
        <Grid xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
