import PropTypes from "prop-types";
import { Button, Grid } from "@mui/material";

function ButtonRegister({ onClick }) {
  return (
    <Grid container>
      <Button
        color="inherit"
        sx={{
          backgroundImage:
            "linear-gradient(to right, #EB3349 0%, #F45C43  51%, #EB3349  100%)",
          color: "#fff",
          borderRadius: "5px",
          padding: "8px 10px",
          "&:hover": {
            backgroundImage:
              "linear-gradient(to left, #EB3349 50%, #F45C43  100%, #EB3349  50%)",
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
