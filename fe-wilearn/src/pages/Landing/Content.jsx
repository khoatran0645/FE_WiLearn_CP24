import { Box, Button, Card, Divider, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ButtonGetStarted from "./ButtonGetStarted";
import { AccountBalance, Home, HowToReg, MenuBook } from "@mui/icons-material";

export default function Content() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const cardsData = [
    {
      title: "Financing your studies",
      description: "How to pay for your studies? Find a scholarship.",
      icon: <AccountBalance />,
    },
    {
      title: "Find a study programme",
      description: "Search through our database of English-taught study programmes.",
      icon: <MenuBook />,
    },
    {
      title: "How to apply",
      description: "Find out about admission requirements and how to apply for a study programme.",
      icon: <HowToReg />,
    },
    {
      title: "Finding a place to live",
      description: "Finding a room is a challenge, so start looking as soon as possible.",
      icon: <Home />,
    },
  ];

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Grid
          container
          sx={{
            backgroundImage: 'url("/src/assets/study.jpg")',
            height: "600px",
            backgroundSize: "cover",
            position: "relative",
          }}
        >
          <Grid item xs={6} display="flex">
            <img
              src="/src/assets/11276378.png"
              alt="Logo"
              style={{
                width: "50px",
                height: "50px",
                marginLeft: "50px",
                marginTop: "20px",
              }}
            />
            <Typography
              sx={{
                variant: "h6",
                marginLeft: "5px",
                marginTop: "25px",
                fontSize: "25px",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
                lineHeight: "50px",
              }}
            >
              WiLearn
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent={"flex-end"}
              paddingTop={3}
              paddingRight={2}
            >
              <Button
                onClick={handleRegister}
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
              >
                Register
              </Button>
              <Button
                onClick={handleSignIn}
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
              >
                Sign In
              </Button>
            </Stack>
          </Grid>
          <Grid
            style={{
              position: "absolute",
              left: "0",
              bottom: "0px",
              width: "100%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.8) 100%)",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Box style={{ marginBottom: "100px" }}>
              <Typography variant="h2" style={{ color: "white" }}>
                Welcome to WiLearn
              </Typography>
              <Typography
                variant="h6"
                style={{
                  color: "white",
                  lineHeight: "1.5",
                  textAlign: "center",
                }}
              >
                A system for online meetings designed to facilitate effective group learning,
                <br />
                supporting individuals studying collaboratively over the internet.
              </Typography>
              <Box
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ButtonGetStarted onClick={handleSignIn} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container spacing={3} justifyContent="center" paddingTop={2}>
        {cardsData.map((card, index) => (
          <Grid item key={index}>
            <Card
              style={{
                position: "relative",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 128, 128, 0.2)",
                borderRadius: "8px",
                border: "2px solid #2374c0",
                backgroundColor: "#5466ae",
                width: "270px",
                height: "200px",
              }}
            >
              {card.icon}
              <Typography variant="h6" style={{ color: "white" }}>
                {card.title}
              </Typography>
              <Divider style={{ backgroundColor: "white", margin: "10px 0" }} />
              <Typography variant="body2" style={{ color: "white" }}>
                {card.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
