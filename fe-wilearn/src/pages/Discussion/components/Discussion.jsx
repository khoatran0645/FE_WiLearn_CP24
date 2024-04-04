import { Grid, List, ListItem, Typography, Card, CardContent } from '@mui/material';
import AddDiscussion from './AddDiscussion';
import SeeMore from './SeeMore';
import Paginate from './../../../components/Paginate';
import { useSelector } from 'react-redux';


export default function DiscussionList() {
  const {groupInfo} = useSelector(state=>state.studyGroup)

  const discussions = groupInfo ? groupInfo.discussions : []

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} textAlign="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>Discussions</Typography>
      </Grid>
      <AddDiscussion/>
      <Grid item xs={12} md={8}>
        <List>
          {discussions.map(discussion => (
            <ListItem key={discussion.id} mb={3}>
              <Card sx={{
                width: '100%',
                backgroundColor: '#f7f7f7',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                }
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {discussion.question}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {discussion.accountUsername} - {discussion.dateTime}
                  </Typography>
                  <Typography variant="body1" component="p">
                    {discussion.content}
                  </Typography>
                  <SeeMore discussionId={discussion.id}/>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
        <Grid container justifyContent="center" alignItems="center" paddingTop={5}>
            <Paginate count={10}/>
        </Grid>
      </Grid>
    </Grid>   
  );
}
