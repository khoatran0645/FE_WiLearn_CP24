import { Grid } from "@mui/material";
import Content from "./Content";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Grid item xs={12}>
        <Content />
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}
