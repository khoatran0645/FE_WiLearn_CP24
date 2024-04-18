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
  { label: "Report", path: "report" },
  { label: "Subject", path: "subject" },
];

export default function AdminNavbarMenu() {
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
            src="/logo.png"
            alt="Logo"
            style={{ marginRight: "8px", width: "40px", height: "40px" }}
          />
          <Typography
            variant="h6"
            noWrap
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
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            {pageRoutes.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.path}
                color="inherit"
                sx={{ fontSize: "inherit", mx: 2 }}
              >
                {page.label}
              </Button>
            ))}
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
