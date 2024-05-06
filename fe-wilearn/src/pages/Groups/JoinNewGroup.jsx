import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function JoinNewGroup({lable}) {
  return (
    <Grid>
      <NavLink to={"/groups/search"} style={{ textDecoration: "none" }}>
        <Button variant="contained" startIcon={<SearchIcon />}>
          {lable}
        </Button>
      </NavLink>
    </Grid>
  );
}
