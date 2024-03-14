import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import React from 'react'

export default function DeleteMemButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        sx={{ 
          backgroundColor: "#DD0000",
          '&:hover': {
            backgroundColor: "#DD0000"
          },
        }}
        >
        Kick           
      </Button>
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Are you sure you want to kick this member?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  )
}
