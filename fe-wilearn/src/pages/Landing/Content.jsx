import { Grid, Card, Typography, Divider, Box } from '@mui/material';
import { AccountBalance, MenuBook, HowToReg, Home } from '@mui/icons-material';
import bgImage from '../../assets/study.jpg';
import ButtonGetStarted from './ButtonGetStarted';
import { useNavigate } from "react-router-dom";

export default function Content() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  const cardsData = [
    { title: "Financing your studies", description: "How to pay for your studies? Find a scholarship.", icon: <AccountBalance /> },
    { title: "Find a study programme", description: "Search through our database of English-taught study programmes.", icon: <MenuBook /> },
    { title: "How to apply", description: "Find out about admission requirements and how to apply for a study programme.", icon: <HowToReg /> },
    { title: "Finding a place to live", description: "Finding a room is a challenge, so start looking as soon as possible.", icon: <Home /> }
  ];

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" direction="row">
      <Grid item xs={12}>
        <Box style={{ position: 'relative', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <img src={bgImage} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
          <Box style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.8) 100%)', padding: '20px', textAlign: 'center' }}>
            <Box style={{marginBottom: '100px'}}>
              <Typography variant="h4" style={{ color: 'white' }}>Welcome to WiLearn</Typography>
              <Typography variant="h6" style={{ color: 'white' }}>Online meeting system for learning that will support anyone studying effectively in groups online</Typography>
              <Box style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
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
