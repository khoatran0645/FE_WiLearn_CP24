import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";

export default function SearchPage() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
}