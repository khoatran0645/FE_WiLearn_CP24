import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { kickMember } from "../../app/reducer/studyGroupReducer/studyGroupActions";
import { useParams } from "react-router-dom";

export default function DeleteMemButton(props) {
  const dispatch = useDispatch();
  const{username, id} =props
  const [open, setOpen] = React.useState(false);
  const {groupId} = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleConfirm= async()=>{
    const response = await dispatch(kickMember({groupId: groupId, accId: id}))
    if(response.type==kickMember.fulfilled.type){
      toast.success('Kick '+ username+ " successfully");
      handleClose();
    }else{
      toast.error('Something went wrong when kicking '+ username);
      response?.payload?.Failures && response?.payload?.Failures?.forEach(error => {
        toast.error(error)
      });
    }
  }
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
          "&:hover": {
            backgroundColor: "#DD0000",
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
            Are you sure you want to kick member {username}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
          <Button
            onClick={handleConfirm}
            autoFocus
            variant="contained"
            color="error"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
