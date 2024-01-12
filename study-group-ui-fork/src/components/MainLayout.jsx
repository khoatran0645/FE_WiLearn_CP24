import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Box, Divider, Drawer, IconButton, Link as MuiLink, Toolbar } from '@mui/material';
import Topbar from 'src/layouts/Topbar';
import Sidebar from 'src/layouts/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import { TOP_BAR_HEIGHT } from 'src/common/constants';
import { ReactComponent as LogoIcon } from 'src/assets/images/logo.svg';

const drawerWidth = 240;

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <MuiLink component={Link} to="/">
          <LogoIcon width={'5rem'} height={'5rem'} />
        </MuiLink>
      </Toolbar>
      <Divider />
      <Sidebar />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar sx={{ backgroundColor: 'darkGreen.main' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Topbar />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: `calc(100vh - ${TOP_BAR_HEIGHT}px)`
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

MainLayout.propTypes = {};

MainLayout.defaultProps = {};

export default MainLayout;
