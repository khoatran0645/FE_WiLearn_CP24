import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptJoinGroup, getGroupInfo, getRequestFormList, getSubjectLists } from '../../app/reducer/studyGroupReducer';
import { useParams } from 'react-router-dom';
import { declineJoinGroup, getDocumentListByGroup, getGroupInfoAsMember, getGroupLists, getGroupMemberLists } from '../../app/reducer/studyGroupReducer/studyGroupActions';
import { toast } from 'react-toastify';

export default function RequestJoin() {
  const dispatch=useDispatch();
  const {groupId} = useParams()
  const [openDialog, setOpenDialog] = useState(false);
  let { requestFormList  } = useSelector((state) => state.studyGroup);

  const handleRequestClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAccept = async (reqId, stuName) => {
    const response = await dispatch(acceptJoinGroup(reqId));
    if (response.type === acceptJoinGroup.fulfilled.type) {
      toast.success("Accpected new student "+ stuName);
      dispatch(getRequestFormList(groupId));

      handleCloseDialog();
    }else{
      toast.error("Something went wrong when accepting student "+ stuName)
    }
    dispatch(getSubjectLists());
    dispatch(getGroupInfo(groupId));
    dispatch(getGroupInfoAsMember(groupId));
    dispatch(getGroupLists());
    dispatch(getGroupMemberLists());
    dispatch(getRequestFormList(groupId));
    dispatch(getDocumentListByGroup(groupId));
  };

  const handleReject = async (reqId, stuName) => {
    const response = await dispatch(declineJoinGroup(reqId));
    if (response.type === declineJoinGroup.fulfilled.type) {
      toast.success("Decline new student "+ stuName);
      dispatch(getRequestFormList(groupId));

      handleCloseDialog();
    }else{
      toast.error("Something went wrong when declining student "+ stuName)
    }
    dispatch(getSubjectLists());
    dispatch(getGroupInfo(groupId));
    dispatch(getGroupInfoAsMember(groupId));
    dispatch(getGroupLists());
    dispatch(getGroupMemberLists());
    dispatch(getRequestFormList(groupId));
    dispatch(getDocumentListByGroup(groupId));
    
    dispatch(getSubjectLists());
    dispatch(getGroupInfo(groupId));
    dispatch(getGroupInfoAsMember(groupId));
    dispatch(getGroupLists());
    dispatch(getGroupMemberLists());
    dispatch(getRequestFormList(groupId));
    dispatch(getDocumentListByGroup(groupId));
  };
  return (
    <>
      <Button variant="outlined" size="small" onClick={handleRequestClick}>
        Joining applications
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogContent>
          {(!requestFormList||requestFormList.length==0)&&"No student is requesting to join"}
          {requestFormList.map((request, index)=>(
          <Box key={index}>
            <Grid container justifyContent="center">
              <Avatar src={request.accountImagePath} sx={{ width: 100, height: 100, marginBottom: '10px' }} />
            </Grid>
            <Grid sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '85px' }}>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Username:</span> {request.userName}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Full name:</span> {request.fullName}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Email:</span> {request.email}
              </Typography>
            </Grid>
            <DialogActions sx={{ marginRight: '20px' }}>
              <Button onClick={()=>handleReject(request.id, request.userName)} color="warning">
                Deny
              </Button>
              <Button onClick={()=>handleAccept(request.id, request.userName)} color="primary">
                Accept
              </Button>
            </DialogActions>
          </Box>
          ))}
        </DialogContent>
      </Dialog>
    </>
  )
}
