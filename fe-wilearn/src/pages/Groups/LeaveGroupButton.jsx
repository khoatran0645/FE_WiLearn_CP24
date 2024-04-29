import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";


import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { leaveGroup } from "../../app/reducer/studyGroupReducer/studyGroupActions";
import { toast } from "react-toastify";
export default function LeaveGroupButton(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.studyGroup);
  //   console.log("LeaveGroupButton", props);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(props.groupId);
    dispatch(leaveGroup(props.groupId));
    if(!error) {
        toast.success("You have left the group");
        setOpen(false);
        navigate("/groups");
    }
    else {
        toast.error(error);
    }
    handleClose();
  };
  return (
    <>
      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={handleClickOpen}
      >
        Leave group
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
       
      >
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to leave this group?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="error" onClick={handleSubmit}>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
