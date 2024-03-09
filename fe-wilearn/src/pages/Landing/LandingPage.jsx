import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { navigate } from 'react-router-dom';

function LandingPage() {
  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <Grid>     
          <Button
            color="inherit"
            onClick={handleSignIn}
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
    </Grid>
  );
}

export default LandingPage;
