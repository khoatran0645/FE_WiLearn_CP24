import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import {useState} from 'react';

export default function RequestJoin() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userid: '12',
    accountName: 'lanpt',
    name: 'Lan Anh',
    email: 'lanpt88@gmail.com',
  });

  const handleRequestClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAccept = () => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
    }));
    handleCloseDialog();
  };

  const handleReject = () => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
    }));
    handleCloseDialog();
  };
  return (
    <>
    <Button variant="outlined" size="small" onClick={handleRequestClick}>
        Join requests
    </Button>
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', padding: '20px', marginLeft:'90px', paddingTop: '3rem' }}>
                <Typography variant="body1" sx={{ marginBottom: '10px'}}>
                    <span style={{ fontWeight: 'bold' }}>UserID:</span> {userInfo.userid}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold' }}>Account name:</span> {userInfo.accountName}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>User name:</span> {userInfo.name}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold' }}>Email:</span> {userInfo.email}
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
  )
}
