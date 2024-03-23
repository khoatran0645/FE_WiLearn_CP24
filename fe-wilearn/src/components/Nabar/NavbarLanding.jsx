import { useNavigate, Link } from "react-router-dom";
import ButtonSignin from "../../components/ButtonSignin";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonRegister from "../ButtonRegister";
import CssBaseline from "@mui/material/CssBaseline";

const pageRoutes = [
  { label: "Home", path: "/landing" },
  { label: "Contact", path: "/contact" },
  { label: "About", path: "/about" },
];

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
