import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../../app/reducer/studyGroupReducer/studyGroupActions";

export default function ReportGroup(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.studyGroup);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const reason = formJson.reason;
    console.log(props.groupId);

    const data = {
      detail: reason,
      groupId: props.groupId,
    };
    // console.log("data", data);
    dispatch(createReport(data));
    if (!error) {
      toast.success("Report sent successfully");
    } else {
      toast.error("Something went wrong when sending report");
    }

    handleClose();
  };

  return (
    <>
      <Tooltip title="Report this user">
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={handleClickOpen}
        >
          Report this group
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          //   onSubmit: (event) => {
          //     event.preventDefault();
          //     const formData = new FormData(event.currentTarget);
          //     const formJson = Object.fromEntries(formData.entries());
          //     const reason = formJson.reason;
          //     console.log(reason);
          //     handleClose();
          //   },
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Report this group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="reason"
            name="reason"
            label="Reason"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="error">
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
