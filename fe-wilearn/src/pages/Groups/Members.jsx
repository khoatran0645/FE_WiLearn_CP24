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
  CircularProgress,
  Input,
  TextField,
  Paper,
  Button
} from "@mui/material";
// import { Copy } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InviteUser from "../../components/InviteUser";
import RequestJoin from "./RequestJoin";
import UserMoreInfo from "./UserMoreInfo";
import Paginate from "../../components/Paginate";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function MemberList() {
  const { groupInfo, loading } = useSelector((state) => state.studyGroup);
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { groupId } = useParams();
  let leadGroups = [];


  const { userInfo } = useSelector((state) => state.user);
  if (userInfo) {
    leadGroups = userInfo.leadGroups ? userInfo.leadGroups : [];
  }
  const isLead = leadGroups.some(g => g.id == parseInt(groupId));

  useEffect(() => {
    if (groupInfo && groupInfo.members) {
      setUserList(groupInfo.members);
    } else {
      setUserList([]);
    }
  }, [groupInfo]);

  const invitationCode = window.location.host + '/groups/search/code/' + groupInfo?.inviteCode

  const handleCopyClick = () => {
    navigator.clipboard.writeText(invitationCode);
    toast.info('Invitation code copied to clipboard!');
  };
  const renderMemberCard = (user) => (
    <Grid key={user.id} item xs={12} sm={6} md={4} lg={2}>
      <Card sx={{ maxWidth: 180, marginTop: "15px" }} elevation={5}>
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
              src={user.imagePath}
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
          Members
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
      {/* <Grid item container xs={12} justifyContent="flex-start"> */}
      {/* <Container maxWidth="lg"> */}
      <Container >
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Invite link
          </Typography>
          <TextField
            label="Invitation Code"
            variant="outlined"
            fullWidth
            // value={window.location.host + '/groups/search/code/' + groupInfo?.inviteCode}
            value={invitationCode}
            // onChange={handleInputChange}invitationCode
            sx={{ marginBottom: 2 }}
            disabled
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopyClick}
            startIcon={<ContentCopyIcon />}
          // disabled={!invitationCode.trim()}
          >
            Copy Invitation Code
          </Button>
          {/* {invitationCode && (
          <Box mt={2}>
            <Typography variant="body1">
              Your Invitation Code: <strong>{invitationCode}</strong>
            </Typography>
          </Box>
        )} */}
        </Paper>
      </Container>
      {/* </Grid> */}
    </Grid>
  );
}
