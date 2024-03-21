import PropTypes from "prop-types";
import { Button, Grid } from "@mui/material";

function ButtonSignin({ onClick }) {
  return (
    <Grid>
      <Button
        color="inherit"
        sx={{
          backgroundImage: "linear-gradient(to right, #00b4db, #0083b0)",
          color: "#fff",
          borderRadius: "5px",
          padding: "8px 10px",
          "&:hover": {
            backgroundImage: "linear-gradient(to left, #00b4db, #0083b0)",
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
