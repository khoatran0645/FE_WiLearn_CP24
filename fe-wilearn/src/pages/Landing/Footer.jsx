import { Container, Grid, Typography, Link, Box, Divider } from "@mui/material";
import {
  LocationOnOutlined,
  EmailOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <Grid
      component="footer"
      sx={{ backgroundColor: "#fff", color: "#000", padding: "2rem" }}
    >
      <Divider sx={{ marginBottom: "2rem", width: "100%" }} />
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <img
                src="logo.png"
                alt="Logo"
                style={{ marginRight: "8px", width: "40px", height: "40px" }}
              />
              <Typography variant="h6">Group Study</Typography>
            </Box>
            <Typography variant="body2">
              Online system for studying in group
            </Typography>
            <Grid>
              <Grid item xs={12} paddingTop={3}>
                <Grid
                  container
                  spacing={1}
                  sx={{ "& > * + *": { marginLeft: 3 }, fontSize: "24px" }}
                >
                  <Grid item>
                    <Link href="#" color="inherit">
                      <FontAwesomeIcon icon={faFacebook} />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" color="inherit">
                      <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" color="inherit">
                      <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">PRODUCTS</Typography>
            <Typography variant="body2">
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Link href="https://fe-wi-learn-cp-24.vercel.app" color="inherit">
                    vercel
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="https://www.groupstudy.somee.com/swagger/index.html" color="inherit">
                    somee swagger
                  </Link>
                </Grid>
              </Grid>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">CONTACT</Typography>
            <Typography
              variant="body2"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Grid container direction="column">
                <Grid container paddingBottom={1}>
                  <LocationOnOutlined />
                  District 9, Ho Chi Minh City
                </Grid>
                <Grid container paddingBottom={1}>
                  <EmailOutlined />{" "}
                  <Link href="mailto:info@example.com" color="inherit">
                    groupstudysystem@gmail.com
                  </Link>
                </Grid>
                <Grid container>
                  <PhoneOutlined />{" "}
                  <Link href="tel:+0123456788" color="inherit">
                    +84 016 333 98
                  </Link>
                </Grid>
              </Grid>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
