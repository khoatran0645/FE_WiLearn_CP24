import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
export default function Settings() {
  return (
    <Grid>
      <Grid xs={12}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Settings
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h5" textAlign={"left"}>
          Change password
        </Typography>
        
      </Grid>
    </Grid>
  );
}
