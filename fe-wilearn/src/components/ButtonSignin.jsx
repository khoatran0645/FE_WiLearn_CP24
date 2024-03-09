import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function ButtonSignin({ onClick }) {
  return (
    <Grid>
      <Button
        color="inherit"
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
        onClick={onClick}
      >
        Sign In
      </Button>
    </Grid>
  );
}

ButtonSignin.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonSignin;
