import { Button, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';

const groups = [
    {
      name: 'KTeam',
      introduction: 'Join and start studying right away with the community!',
      subject: 'Java',
      img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBxXC93bA22ghW67CX040WwL8PzLC0DcNOcvtXUL0LhrfywjCoRFsTdQqWRatvKwuzqZl63K-ax8LMP7nX0_S5ko9v-9_cu9OfaWciDWIQGN1fUa8iIEwXfPy9mNGrplOGdQjKb3NdYq9quxO6Rm1JRAf2bbZ4Il3BhvwZJf2MgMapZ5rl2mEq5FuluA/s1600/hinh%20nen%2012%20con%20giap%20phong%20cach%20it%20tuoi%20ti.jpg',
    },
    {
      name: 'JsLand',
      introduction: 'Discover new frontiers in web development with our JavaScript coding community',
      subject: 'Javascript',
      img: 'https://www.shutterstock.com/shutterstock/photos/1932042689/display_1500/stock-photo-businessman-using-mobile-smart-phone-business-global-internet-connection-application-technology-1932042689.jpg',
    },
    {
      name: 'HackMasters',
      introduction: 'Innovative programming team specializing in Java and more.',
      subject: 'Java, Python',
      img: 'https://hoangphucphoto.com/wp-content/uploads/2024/02/IMG_9923.jpg',
    },
    {
      name: 'CodeCrafters',
      introduction: 'Explore the power of Go programming language with our dedicated Golang group',
      subject: 'Golang',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLytpLCORdw7AZ4N1S8cEeeb4NdIpjuSwG9Q',
    },
    {
      name: 'BitMinds',
      introduction: 'Join our ReactJS community for cutting-edge web development discussions and projects!',
      subject: 'Reactjs',
      img: 'https://cdn.mienphitemplate.com/powerpoint_images/images/simple-blackboard-infographics/simple-blackboard-infographics/slide-21-extra.jpg',
    },
    {
      name: 'ScriptSavants',
      introduction: 'Join our Python coding group for fun and learning!',
      subject: 'Python, Kotlin',
      img: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500https://product.bachkhoa-aptech.edu.vn:33/resources/upload/image/chia-se/noi-kho-cua-dan-it-nhung-dieu-chua-noi-01.jpg',
    },{
      name: 'TechWizards',
      introduction: 'Connect with fellow C++ and C enthusiasts in our dedicated coding community',
      subject: 'C++, C#',
      img: 'https://product.bachkhoa-aptech.edu.vn:33/resources/upload/image/chia-se/noi-kho-cua-dan-it-nhung-dieu-chua-noi-01.jpg',
    },
    {
      name: 'CodeNinjas',
      introduction: 'Embrace the future of mobile and web development with our Flutter and React community',
      subject: 'Flutter, React',
      img: 'https://hanoispiritofplace.com/wp-content/uploads/2018/01/bo-suu-tap-hinh-nen-cuc-chat-danh-cho-dan-4.jpg',
    },
  ];
export default function ListGroup() {
  return (
    <Grid container justifyContent="center">
    <Grid item xs={12} style={{ margin: '0 auto' }}>
      <Grid container justifyContent="center" paddingTop={2}>
        {groups.map((group, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ maxWidth: 250, height:'270px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '10px', border: '1px solid' }}>
              <CardHeader 
                title={<Typography variant="h6" style={{ fontSize: '14px' }}>{group.name}</Typography>}
                subheader={<Typography variant="body2" style={{ fontSize: '11px' }}>{group.subject}</Typography>}
                style={{ paddingBottom: '2px', paddingTop: '8px' }}
              />
              <CardMedia
                component="img"
                height="100"
                image={group.img}
                alt={group.name}
                style={{ objectFit: 'cover' }}
              />
              <CardContent style={{ height: '80px', paddingTop: '8px', overflow: 'auto' }}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {group.introduction}
                </Typography>          
              </CardContent>
              <Grid container justifyContent="center">
                    <Button variant="contained" size="small" style={{ padding: '4px 8px', fontSize: '11px', backgroundImage: "linear-gradient(to left, #00b4db, #0083b0)" }}>
                    Join Group
                    </Button>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
  )
}
