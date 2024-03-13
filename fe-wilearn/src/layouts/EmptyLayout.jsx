import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";

export default function EmptyLayout() {
  return (
    <Grid
      container
      sx={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Grid item xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
