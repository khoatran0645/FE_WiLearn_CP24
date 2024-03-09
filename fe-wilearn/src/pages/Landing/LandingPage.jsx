import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonSignin from '../../components/ButtonSignin';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchBar from '../../components/Nabar/SearchBar';

const pages = ['Home', 'Contact', 'About', 'Privacy'];
function LandingPage() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
      <AppBar position="fixed" style={{ backgroundColor: '#ccc', color: 'black' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
            <img src="/src/assets/11276378.png" alt="Logo" style={{ display: { xs: 'none', md: 'flex' }, marginRight: '8px', width: '40px', height:'40px' }} />
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                WiLearn
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={`/${page.toLowerCase()}`}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                WiLearn
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', marginLeft:'400px' } }}>
                {pages.map((page, index) => (
                  <Button
                    key={page}
                    component={Link}
                    to={`/${page.toLowerCase()}`}
                    sx={{ my: 3, color: 'black', display: 'block', fontSize:'1.1rem', ml: index > 0 ? 2 : 0 }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ marginRight: '1rem',  }}>
                  <SearchBar />
                </Box>
                <Box>
                  <ButtonSignin onClick={handleSignIn} />
                </Box>
              </Box>         
            </Toolbar>
          </Container>
        </AppBar>              
  );
}

export default LandingPage;
