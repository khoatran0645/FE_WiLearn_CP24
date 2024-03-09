import Grid from '@mui/material/Unstable_Grid2';
import {Outlet} from 'react-router-dom';

export default function EmptyLayout() {
  return (
    <Grid sx={{ flexGrow: 1, border: '5px solid black', alignItems: 'center', alignContent: 'center' }}>
      <Outlet/>
    </Grid>
  );
}