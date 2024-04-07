import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AvatarUser from "../AvatarUser";
import MultiLevelDropdown from "../Navbar/GroupsNavbarBtn/MultiLevelDropdown";
import { useSelector } from "react-redux";

const pageRoutes = [
  { label: "Home", path: "/home" },
  { label: "Schedule", path: "schedules" },
  { label: "Stat", path: "statistics" },
];

export default function NavbarMenu() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppBar
      sx={{
        background: "#ccc",
        borderBottom: "1px solid #ccc",
        color: "black",
        zIndex: (theme) => theme.zIndex.drawer + 24,
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
            to="home"
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
            <MultiLevelDropdown />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AvatarUser />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {userInfo?.fullName}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
