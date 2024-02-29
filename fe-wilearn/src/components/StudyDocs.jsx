import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function StudyDocs() {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "left" }}
        >
          Study Docs
        </Typography>
      </Grid>

      <Grid xs={6} container justifyContent={"flex-start"} paddingLeft={5}>
        <TextField label="Search groups" variant="outlined" size="small" />
        <Button variant="contained" size="small">
          Search
        </Button>
      </Grid>
      <Grid xs={6} container justifyContent={"flex-end"} paddingRight={5}>
        <Button
          component="label"
          variant="contained"
          size="small"
          startIcon={<CloudUploadIcon />}
        >
          Upload new file
          <VisuallyHiddenInput type="file" />
        </Button>
      </Grid>
    </Grid>
  );
}
