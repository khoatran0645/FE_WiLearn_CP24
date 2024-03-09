import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function LandingPage() {
  const navigate = useNavigate(); // Import the useNavigate hook from react-router-dom
  const handleSignIn = () => {
    navigate('/signin');
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
