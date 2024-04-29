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
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";
// import { Copy } from '@mui/icons-material';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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
  const [openDialog, setOpenDialog] = useState(false);

  // console.log("groupInfo",groupInfo);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const { groupId } = useParams();
  let leadGroups = [];

  const { userInfo } = useSelector((state) => state.user);
  if (userInfo) {
    leadGroups = userInfo.leadGroups ? userInfo.leadGroups : [];
  }
  const isLead = leadGroups.some((g) => g.id == parseInt(groupId));
  useEffect(() => {
    if (groupInfo && groupInfo.members) {
      setUserList(groupInfo.members);
    } else {
      setUserList([]);
    }
  }, [groupInfo]);

  const invitationCode =
    window.location.host + "/groups/search/code/" + groupInfo?.inviteCode;

  const handleCopyClick = () => {
    navigator.clipboard.writeText(invitationCode);
    toast.info("Invitation code copied to clipboard!");
  };
  const renderMemberCard = (user, isFirst) => (
    <Grid key={user.id} item xs={12} sm={6} md={4} lg={2}>
      <Card
        sx={{
          height: "100%",
          maxWidth: "200px",
          display: "flex",
          flexDirection: "column",
        }}
        // {/* sx={{
        //   maxWidth: 200,
        //   minHeight: 300,
        //   maxHeight: 300,
        //   marginTop: "15px",
        // }} */}
        elevation={5}
      >
        <CardContent>
          {(isFirst && (
            <Typography variant="h6" align="center">
              Group leader
            </Typography>
          )) || (
            <Typography variant="h6" align="center">
              Member
            </Typography>
          )}
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
        <CardActions
          disableSpacing
          sx={{ mt: "auto", justifyContent: "center" }}
        >
          <UserMoreInfo
            // username={user.username}
            id={user.id}
            fullname={user.fullName}
            email={user.email}
            phone={user.phone}
            isFirst={isFirst}
          />
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
      <Grid container item justifyContent="space-between" paddingBottom={2}>
        <Grid item container xs={6} justifyContent="flex-start">
          <Button variant="contained" size="small" onClick={handleOpenDialog}>
            Invite Link
          </Button>
        </Grid>
        <Grid item container xs={6} justifyContent="flex-end">
          <Stack direction="row" spacing={2}>
            {isLead && <RequestJoin />}
            {isLead && <InviteUser />}
          </Stack>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        {loading ? (
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          currentMembers.map((user, index) =>
            renderMemberCard(user, index === 0)
          )
        )}
      </Grid>
      {totalPages > 1 && (
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          paddingTop={5}
        >
          <Paginate count={totalPages} onPageChange={handlePageChange} />
        </Grid>
      )}
      {/* <Grid item container xs={12} justifyContent="flex-start"> */}
      {/* <Container maxWidth="lg"> */}
      <Grid>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Invite Link</DialogTitle>
          <Box padding={2}>
            <TextField
              label="Invitation Code"
              variant="outlined"
              value={invitationCode}
              sx={{ marginBottom: 2, width: 400 }}
              disabled
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCopyClick}
                startIcon={<ContentCopyIcon />}
              >
                Copy Invitation Code
              </Button>
            </Box>
          </Box>
        </Dialog>
      </Grid>
      {/* </Grid> */}
    </Grid>
  );
}
