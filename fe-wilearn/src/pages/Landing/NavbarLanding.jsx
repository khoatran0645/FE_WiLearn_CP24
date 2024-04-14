import { useNavigate, Link } from "react-router-dom";
import ButtonSignin from "../../components/ButtonSignin";
import { Box, Typography, Container } from "@mui/material";
import ButtonRegister from "../../components/ButtonRegister";

export default function NavbarLanding() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Box>
      <Container maxWidth="xl">
        <img
          src="/src/assets/11276378.png"
          alt="Logo"
          style={{ marginRight: "8px", width: "40px", height: "40px" }}
        />
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          WiLearn
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: "1rem",
          }}
          justifyContent={"flex-end"}
        >
          <ButtonRegister onClick={handleRegister} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ButtonSignin onClick={handleSignIn} />
        </Box>
      </Container>
    </Box>
  );
}
