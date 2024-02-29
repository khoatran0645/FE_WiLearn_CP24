import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Imgmock from '../../assets/imgmo.jpg';

function LandingPage({ onSignIn }) {
  return (
    <div style={{ maxWidth: '100vw'}}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#63bdd4', height: '100px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'20px' }}>
          <Button component={Link} to="/home" color="inherit" sx={{ letterSpacing: '2px', marginX: '25px', color: '#000', fontSize: '18px' }}>
            Home
          </Button>
          <Button component={Link} to="/contact" color="inherit" sx={{ letterSpacing: '2px', marginX: '25px', color: '#000', fontSize: '18px' }}>
            Contact
          </Button>
          <Button component={Link} to="/about" color="inherit" sx={{ letterSpacing: '2px', marginX: '25px', color: '#000', fontSize: '18px' }}>
            About
          </Button>
          <Button component={Link} to="/about" color="inherit" sx={{ letterSpacing: '2px', marginX: '25px', color: '#000', fontSize: '18px' }}>
            Policy
          </Button>
          <Button
            color="inherit"
            onClick={onSignIn}
            sx={{
              backgroundColor: '#3498db',
              color: '#fff',
              borderRadius: '5px',
              padding: '10px 20px',
              marginLeft: '200px',
              '&:hover': {
                backgroundColor: '#2980b9',
              },
            }}
          >
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 100px)', // Adjusted height to exclude the height of the AppBar
        }}
      >
        <img src={Imgmock} alt="Your Alt Text" style={{ width: '100%', height: 'auto' }} />
      </Box>
    </div>
  );
}

LandingPage.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default LandingPage;
