import React from 'react'
import Drawer from "../components/Navbar/Drawer";
import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

function GroupLayout() {
    return (
        <>
            <Grid container paddingTop={12} sx={{ flexGrow: 1 }}>
                <Grid item xs={2}>
                    <Drawer />
                </Grid>
                <Grid item xs={10}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    )
}

export default GroupLayout