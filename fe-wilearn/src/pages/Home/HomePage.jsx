import React, { useEffect } from 'react';
import { Typography, CardContent, CardMedia, Card, Container, Grid, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupNotJoin } from './../../app/reducer/studyGroupReducer/studyGroupActions';

export default function HomePage() {
  const dispatch = useDispatch();
  const groupNotJoin = useSelector((state) => state.studyGroup.groupNotJoin);

  useEffect(() => {
    dispatch(getGroupNotJoin());
  }, [dispatch]);

  console.log("groupNotJoin:", groupNotJoin);

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" align="center" gutterBottom>
        Tuyển thành viên nhóm
      </Typography>
      <Grid container spacing={3}>
        {groupNotJoin.map((group) => (
          <Grid item key={group.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={group.imagePath}
                alt={group.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {group.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {group.description}
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary">
                Join Group
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
