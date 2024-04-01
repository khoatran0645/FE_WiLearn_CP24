import React from "react";
import {
  Avatar,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Container,
  Stack,
  Box,
} from "@mui/material";

import InviteUser from "../../components/InviteUser";
import RequestJoin from "./RequestJoin";
import UserMoreInfo from "./UserMoreInfo";
import Paginate from "../../components/Paginate";
import { useSelector } from "react-redux";

export default function MemberList() {
  const { groupInfo } = useSelector((state) => state.studyGroup);
  const userList = groupInfo ? groupInfo.members : [];

  const renderMemberCard = (user) => (
    <Grid key={user.id} item xs={12} sm={6} md={4} lg={2}>
      <Card sx={{ maxWidth: 180 }} elevation={5}>
        <CardContent>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={user.fullName}
              src={user.avatar}
              sx={{ width: 100, height: 100, marginTop: 2 }}
            />
            <Typography gutterBottom variant="h6">
              {user.fullName}
            </Typography>
          </Container>
        </CardContent>
        <CardActions>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", paddingBottom: "10px" }}>
            <UserMoreInfo fullname={user.fullName} email={user.email} phone={user.phone} />
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <Grid container direction="column">
      <Grid container paddingBottom={2}>
        <Grid item xs={6} justifyContent="flex-start">
          <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "left" }}>
            Members
          </Typography>
        </Grid>
        <Stack spacing={1} direction="row" justifyContent="flex-end" paddingLeft={35}>
          <RequestJoin />
          <InviteUser />
        </Stack>
      </Grid>
      <Grid container spacing={2}>
        {userList.map((user) => renderMemberCard(user))}
      </Grid>
      <Grid container justifyContent="center" alignItems="center" paddingTop={5}>
        <Paginate count={10} />
      </Grid>
    </Grid>
  );
}
