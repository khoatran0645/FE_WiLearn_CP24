import { Typography, CardContent, ListItem, CardMedia, Card, Container } from '@mui/material';
import Grid from "@mui/material/Grid";
import Paginate from '../../components/Paginate';
import { Button } from '@mui/material';

const groupNotifications = [
  {
    groupName: 'JsLand',
    time: 'March 26, 2024',
    author: 'John Doe',
    introduction: 'The criteria for joining the Golang programming team include proficiency in Go language and a strong foundation in software development principles.',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBxXC93bA22ghW67CX040WwL8PzLC0DcNOcvtXUL0LhrfywjCoRFsTdQqWRatvKwuzqZl63K-ax8LMP7nX0_S5ko9v-9_cu9OfaWciDWIQGN1fUa8iIEwXfPy9mNGrplOGdQjKb3NdYq9quxO6Rm1JRAf2bbZ4Il3BhvwZJf2MgMapZ5rl2mEq5FuluA/s1600/hinh%20nen%2012%20con%20giap%20phong%20cach%20it%20tuoi%20ti.jpg',
    subject: 'Golang',
  },
  {
    groupName: 'HackMasters',
    time: 'March 25, 2024',
    author: 'Jane Smith',
    introduction: 'The eligibility requirements for joining the Java programming team encompass a solid command of Java programming language along.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLytpLCORdw7AZ4N1S8cEeeb4NdIpjuSwG9Q',
    subject: 'Java',
  },
  {
    groupName: 'CodeCrafters',
    time: 'March 24, 2024',
    author: 'Alice Johnson',
    introduction: 'The prerequisites for becoming a member of the React programming team entail a thorough understanding of React.js framework and proficiency.',
    imageUrl: 'https://hoangphucphoto.com/wp-content/uploads/2024/02/IMG_9923.jpg',
    subject: 'Reactjs',
  },
  {
    groupName: 'BitMinds',
    time: 'March 24, 2024',
    author: 'Thoma Eddie',
    introduction: 'The requirements for admission into the Python programming team involve fluency in Python programming language',
    imageUrl: 'https://hoangphucphoto.com/wp-content/uploads/2024/02/IMG_9923.jpg',
    subject: 'Python',
  },
];

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" align="center" gutterBottom>
        Group Recruitment Notifications
      </Typography>
      <Grid container spacing={2}>
        {groupNotifications.map((group, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <ListItem style={{ marginBottom: '16px' }}>
              <Card variant="outlined" style={{ width: '100%', height: '240px' }}>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={4}>
                    <Grid paddingLeft={3}  paddingTop={2} sx={{opacity: 0.7}}>
                      <Typography variant="subtitle2" color="textSecondary">
                        {group.time}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        Actor: {group.author}
                      </Typography>
                    </Grid>
                    <CardMedia
                      component="img"
                      height="120"
                      width="100"
                      image={group.imageUrl}
                      alt={group.groupName}
                      style={{ objectFit: 'cover', marginLeft: '20px' }}
                    />
                  </Grid>
                  <Grid item xs={8} paddingLeft={4}>
                    <CardContent style={{ height: '100%' }}>
                      <Typography variant="h6" gutterBottom align="center">
                        {group.groupName}
                      </Typography>
                      
                      <Typography variant="body1" color="textSecondary" style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
                        Subject: {group.subject}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {group.introduction}
                      </Typography>                     
                    </CardContent>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Button
                    variant="contained"
                    size="small"
                    style={{
                      padding: "4px 8px",
                      fontSize: "11px",
                      backgroundImage:
                        "linear-gradient(to left, #00b4db, #0083b0)",
                    }}
                  >
                    Request
                  </Button>
                </Grid>
              </Card>
            </ListItem>
          </Grid>         
        ))}
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Paginate count={10} />
      </Grid>
    </Container>
  );
}
