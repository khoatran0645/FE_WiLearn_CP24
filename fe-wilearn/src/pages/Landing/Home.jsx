import Navbarmenu from "../../components/Nabar/Navbarmenu";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Box from "@mui/material/Box";
import OurSidebar from "../../components/OurSidebar";
import { Outlet } from "react-router-dom"; // Outlet from 'react-router-dom'


const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={14}>
        <Grid xs={12} sm={12} md={12} lg={12}>
          <Navbarmenu/>
        </Grid>
        <Grid xs={2}>
          <OurSidebar/>
        </Grid>
        <Grid xs={10}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
