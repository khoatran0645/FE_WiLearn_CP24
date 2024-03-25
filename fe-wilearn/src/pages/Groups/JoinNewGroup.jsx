import GroupsIcon from '@mui/icons-material/Groups';
import { Button, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function JoinNewGroup() {
  return (
    <Grid>
      <NavLink to={"searchgroup"} style={{ textDecoration: "none" }}>
        <Button variant="contained" startIcon={<GroupsIcon />}>
          Join new group
        </Button>
      </NavLink>
    </Grid>
  );
}
