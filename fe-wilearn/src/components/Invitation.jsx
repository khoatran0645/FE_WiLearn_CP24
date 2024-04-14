import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getStudentInvites, getGroupNotJoin, getSubjectLists, getGroupMemberLists, acceptInvitation, declineInvitation } from "../app/reducer/studyGroupReducer";
import { getUserInfo, getUsermMeetings } from "../app/reducer/userReducer";
import { toast } from "react-toastify";

export default function Invitation() {
  const dispatch=useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  let { invitations  } = useSelector((state) => state.studyGroup);
  if(!invitations){
    // invitations = [];
    alert('getStudentInvites')
    dispatch(getStudentInvites());
  };
  // const groupInvites = [
  // const invitations = [
  //   {
  //     name: "Chicken never die",
  //     subject: "Java",
  //     members: 10,
  //   },
  //   {
  //     name: "Chicken never die",
  //     subject: "Java",
  //     members: 10,
  //   }
  // ];

  const handleInvitationClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAccept =async (inviteId, gname) => {
    // setGroupInvites((prevGroupInfo) => ({
    //   ...prevGroupInfo,
    // }));
    // alert(gname+'Accept '+inviteId)
    const response = await dispatch(acceptInvitation(inviteId));
    if (response.type === acceptInvitation.fulfilled.type) {
      toast.success("Accpected to join group "+ gname);
      dispatch(getGroupMemberLists());
      handleCloseDialog();
    }else{
      toast.error("Something went wrong when accepting")
    }
    dispatch(getStudentInvites());

    dispatch(getUserInfo());
    dispatch(getUsermMeetings());
    dispatch(getGroupNotJoin());
    dispatch(getSubjectLists());
    dispatch(getStudentInvites())
  };

  const handleReject = async (inviteId, gname) => {
    // setGroupInvites((prevGroupInfo) => ({
    //   ...prevGroupInfo,
    // }));
    // alert(gname+'Reject '+inviteId)
    const response = await dispatch(declineInvitation(inviteId));
    if (response.type === declineInvitation.fulfilled.type) {
      toast.success("Rejected to join group "+ gname);
      dispatch(getStudentInvites());
    }else{
      toast.error("Something went wrong when Rejecting")
    }
    handleCloseDialog();
    dispatch(getStudentInvites());
    
    dispatch(getUsermMeetings());
    dispatch(getGroupNotJoin());
    dispatch(getSubjectLists());
    dispatch(getStudentInvites())
  };

  return (
    <>
      <Button onClick={handleInvitationClick} variant="outlined" size="small">
        Invitation
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            marginLeft: "70px",
          }}
        >
          {(!invitations||invitations.length==0)&&"No group is inviting you"}
          {invitations.map(invite => (
            <Box>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold" }}>Group name:</span>{" "}
                {invite.groupName}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold" }}>Subject:</span>{" "}
                {invite.subjects.join(', ')}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold" }}>Number of members:</span>{" "}
                {invite.memberCount}
              </Typography>
              <DialogActions sx={{ marginRight: "20px" }}>
                <Button onClick={()=>handleReject(invite.id, invite.groupName)} color="warning">
                  Deny
                </Button>
                <Button onClick={()=>handleAccept(invite.id, invite.groupName)} color="primary">
                  Accept
                </Button>
              </DialogActions>
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
}
