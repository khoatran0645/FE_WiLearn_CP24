import { Grid, Card, Typography, Divider, Box } from '@mui/material';
import { AccountBalance, MenuBook, HowToReg, Home } from '@mui/icons-material';
import bgImage from '../../assets/study.jpg';
import ButtonGetStarted from './ButtonGetStarted';
import { useNavigate } from "react-router-dom";
import ButtonRegister from '../../components/ButtonRegister';
import ButtonSignin from '../../components/ButtonSignin';

export default function Content() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleRegister = () => {
    navigate("/register");
  };


  const cardsData = [
    { title: "Financing your studies", description: "How to pay for your studies? Find a scholarship.", icon: <AccountBalance /> },
    { title: "Find a study programme", description: "Search through our database of English-taught study programmes.", icon: <MenuBook /> },
    { title: "How to apply", description: "Find out about admission requirements and how to apply for a study programme.", icon: <HowToReg /> },
    { title: "Finding a place to live", description: "Finding a room is a challenge, so start looking as soon as possible.", icon: <Home /> }
  ];

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Box style={{ position: 'relative', height: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>         
          <img src={bgImage} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <Box style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex' }}>
            <img src="/src/assets/11276378.png" alt="Logo" style={{ width: '50px', height: '50px' }} />
            <Typography
              sx={{
                marginLeft: "5px",
                fontSize: "25px",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
                lineHeight: "50px",
              }}>WiLearn</Typography>
                  <Box sx={{display: "flex",
                        alignItems: "center", paddingLeft:"1000px" }}>
                    <Box
                      sx={{
                        
                        marginRight: "1rem",
                      }}
                      justifyContent={"flex-end"}
                    >
                      <ButtonRegister onClick={handleRegister} />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ButtonSignin onClick={handleSignIn} />
                    </Box>
                  </Box>
          </Box>
          <Box style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.8) 100%)', padding: '20px', textAlign: 'center' }}>
            <Box style={{marginBottom: '100px'}}>
              <Typography variant="h2" style={{ color: 'white' }}>Welcome to WiLearn</Typography>
              <Typography variant="h6" style={{ color: 'white', lineHeight: '1.5', textAlign: 'center' }}>A system for online meetings designed to facilitate effective group learning,<br/>supporting individuals studying collaboratively over the internet.</Typography>
              <Box style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <ButtonGetStarted onClick={handleSignIn}/>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item container spacing={3} justifyContent="center">
        {cardsData.map((card, index) => (
          <Grid item key={index}>
            <Card style={{ position: 'relative', padding: '20px', boxShadow: '0 4px 8px rgba(0, 128, 128, 0.2)', borderRadius: '8px', border: '2px solid #2374c0', backgroundColor: '#5466ae', width: '270px', height: '200px' }}>
              {card.icon}
              <Typography variant="h6" style={{ color: 'white' }}>{card.title}</Typography>
              <Divider style={{ backgroundColor: 'white', margin: '10px 0' }} />
              <Typography variant="body2" style={{ color: 'white' }}>
                {card.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
