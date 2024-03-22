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
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          borderBottom: '1px solid #ccc',
          backgroundColor: "transparent",
          color: "black",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
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
                flexGrow: 1,
                display: { xs: "none", md: "flex", marginLeft: "400px" },
              }}
            >
              {pageRoutes.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  to={page.path}
                  color="inherit"
                  sx={{ fontSize: "inherit", mr: 2, my: 2, display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "1rem",
              }}
            >
              <ButtonRegister onClick={handleRegister} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ButtonSignin onClick={handleSignIn} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
