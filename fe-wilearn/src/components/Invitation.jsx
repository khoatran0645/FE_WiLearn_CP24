import { useState } from 'react';
import { Button, Dialog, DialogContent, DialogActions, Typography } from '@mui/material';

export default function Invitation() {
  const [openDialog, setOpenDialog] = useState(false);
  const [groupInfo, setGroupInfo] = useState({
    name: 'Chicken never die',
    subject: 'Java',
    members: 10,
  });

  const handleInvitationClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAccept = () => {
    setGroupInfo((prevGroupInfo) => ({
      ...prevGroupInfo,
    }));
    handleCloseDialog();
  };

  const handleReject = () => {
    setGroupInfo((prevGroupInfo) => ({
      ...prevGroupInfo,
    }));
    handleCloseDialog();
  };

  return (
    <>
      <Button onClick={handleInvitationClick} variant="outlined" size="small">
        Invitation
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', padding: '20px', marginLeft:'70px' }}>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Group name:</span> {groupInfo.name}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px'}}>
                    <span style={{ fontWeight: 'bold' }}>Subject:</span> {groupInfo.subject}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold' }}>Number of members:</span> {groupInfo.members}
                </Typography>
            </DialogContent>
            <DialogActions sx={{marginRight:'20px'}}>
                <Button onClick={handleReject} color="primary">
                    Deny
                </Button>
                <Button onClick={handleAccept} color="primary">
                    Accept
                </Button>
            </DialogActions>
      </Dialog>
    </>
  );
}
