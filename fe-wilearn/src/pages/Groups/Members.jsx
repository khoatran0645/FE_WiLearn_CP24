import React, { useState, useEffect } from "react";
import {
  Avatar,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Container,
  Box,
  Stack,
  CircularProgress
} from "@mui/material";

import InviteUser from "../../components/InviteUser";
import RequestJoin from "./RequestJoin";
import UserMoreInfo from "./UserMoreInfo";
import Paginate from "../../components/Paginate";
import { useSelector } from "react-redux";

export default function MemberList() {
  const { groupInfo, loading } = useSelector((state) => state.studyGroup);
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (groupInfo && groupInfo.members) {
      setUserList(groupInfo.members);
    } else {
      setUserList([]);
    }
  }, [groupInfo]);

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
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", paddingBottom: 2 }}>
            <UserMoreInfo fullname={user.fullName} email={user.email} phone={user.phone} />
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );

  const totalPages = Math.ceil(userList.length / 12);
  const startIndex = (currentPage - 1) * 12;
  const endIndex = Math.min(startIndex + 12, userList.length);
  const currentMembers = userList.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Grid container direction="column" paddingBottom={2}>
      <Grid item container xs={6} justifyContent="flex-start">
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "left" }}>
          Thành viên
        </Typography>
      </Grid>
      <Grid item container justifyContent="flex-end" paddingLeft={35}>
        <Stack spacing={1} direction="row">
          <RequestJoin />
          <InviteUser />
        </Stack>
      </Grid>
      <Grid item container spacing={2}>
        {loading ? (
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          currentMembers.map((user) => renderMemberCard(user))
        )}
      </Grid>
      {totalPages > 1 && (
        <Grid item container justifyContent="center" alignItems="center" paddingTop={5}>
          <Paginate count={totalPages} onPageChange={handlePageChange} />
        </Grid>
      )}
    </Grid>
  );
}
