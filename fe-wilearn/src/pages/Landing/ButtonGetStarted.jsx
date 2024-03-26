import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ButtonGetStarted({ onClick }) {
  return (
    <Grid>
      <Button
        color="inherit"
        endIcon={<ArrowForwardIcon />}
        sx={{
          backgroundImage:
            "linear-gradient(to right, #EB3349 0%, #F45C43  51%, #EB3349  100%)",
          margin: "10px",
          padding: "15px 45px",
          textAlign: "center",
          textTransform: "uppercase",
          transition: "0.5s",
          backgroundSize: "200% auto",
          color: "white",
          boxShadow: "0 0 20px #eee",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
        }}
        onClick={onClick}
      >
        Get Started
      </Button>
    </Grid>
  );
}

ButtonGetStarted.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonGetStarted;
