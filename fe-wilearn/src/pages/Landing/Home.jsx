import Navbarmenu from "../../components/Nabar/Navbarmenu";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import OurSidebar from "../../components/OurSidebar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={12} lg={12}>
          <Item>
            <Navbarmenu />
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <OurSidebar />
          </Item>
        </Grid>
        <Grid xs={10}>
          <Item>Other components here</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
