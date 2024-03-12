import { useNavigate } from "react-router-dom";
import ButtonSignin from "../../components/ButtonSignin";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const pageRoutes = [
    { label: 'Home', path: '/landing' },
    { label: 'Contact', path: '/contact' },
    { label: 'About', path: '/about' },
    { label: 'Groups', path: '/home'},
  ];

export default function NavbarLanding() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };
  return (
    <AppBar style={{ backgroundColor: '#ccc', color: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src="/src/assets/11276378.png" alt="Logo" style={{ marginRight: '8px', width: '40px', height:'40px' }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WiLearn
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', marginLeft:'400px' } }}>
            {pageRoutes.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.path}
                color="inherit"
                sx={{ fontSize: 'inherit', mr: 2, my: 2, display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <ButtonSignin onClick={handleSignIn} />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
