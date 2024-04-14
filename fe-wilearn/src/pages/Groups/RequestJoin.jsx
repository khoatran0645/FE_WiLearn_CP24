import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';

export default function RequestJoin() {
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState([
    {
      accountName: 'lanpt',
      name: 'Lan Anh',
      email: 'lanpt88@gmail.com',
      avatar: 'https://cdn.icon-icons.com/icons2/2560/PNG/512/woman_user_avatar_account_female_icon_153149.png',
    }
  ]);

  const handleRequestClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAccept = () => {
    setUsers((prevUserInfo) => ({
      ...prevUserInfo,
    }));
    handleCloseDialog();
  };

  const handleReject = () => {
    setUsers((prevUserInfo) => ({
      ...prevUserInfo,
    }));
    handleCloseDialog();
  };
  return (
    <>
      <Button variant="outlined" size="small" onClick={handleRequestClick}>
        Joining applications
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogContent>
          {users.map(users=>(
          <Box>
            <Grid container justifyContent="center">
              <Avatar src={users.avatar} sx={{ width: 100, height: 100, marginBottom: '10px' }} />
            </Grid>
            <Grid sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '120px' }}>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Account name:</span> {users.accountName}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>User name:</span> {users.name}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Email:</span> {users.email}
              </Typography>
            </Grid>
            <DialogActions sx={{ marginRight: '20px' }}>
              <Button onClick={handleReject} color="primary">
                Deny
              </Button>
              <Button onClick={handleAccept} color="primary">
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
