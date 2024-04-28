import GroupsIcon from '@mui/icons-material/Groups';
import { Button, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function JoinNewGroup({lable}) {
  return (
    <Grid>
      <NavLink to={"/groups/search"} style={{ textDecoration: "none" }}>
        <Button variant="contained" startIcon={<GroupsIcon />}>
          {lable}
        </Button>
      </NavLink>
    </Grid>
  );
}
