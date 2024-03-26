import { Button, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
export default function JoinMeetingButton() {
  return (
    <Grid container justifyContent="center" sx={{ paddingTop: "1rem" }}>
      <NavLink to={":meetingId"} style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#258f3b",
            '&:hover': {
              backgroundColor: "#258f3b"
            },
         }}
        >
          Join now
        </Button>
      </NavLink>
    </Grid>
  );
}
