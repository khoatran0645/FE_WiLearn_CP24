import Grid from '@mui/material/Unstable_Grid2';
import {Outlet} from 'react-router-dom';

export default function MainLayout() {
  return (
    <Grid sx={{ flexGrow: 1, border: '5px solid red' }}>
      <Outlet/>
    </Grid>
  );
}
