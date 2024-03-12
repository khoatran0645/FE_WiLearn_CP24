import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function ButtonRegister({ onClick }) {
  return (
    <Grid>
      <Button
        color="inherit"
        sx={{
          backgroundImage: "linear-gradient(to bottom right, purple, pink)",
          color: '#fff',
          borderRadius: '5px',
          padding: '8px 10px',
          '&:hover': {
            backgroundImage: "linear-gradient(180deg, purple, pink)",
          },
        }}
        onClick={onClick}
      >
        Register
      </Button>
    </Grid>
  );
}

ButtonRegister.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonRegister;
