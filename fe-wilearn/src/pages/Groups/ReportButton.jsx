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
import {useDispatch} from "react-redux";
import {createReport} from "../../app/reducer/studyGroupReducer/studyGroupActions";
import { toast } from "react-toastify";

export default function ReportButton(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

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
    // console.log(reason);
    // console.log(props.userId);
    const data = {
        detail: reason,
        accountId: props.userId,
    }
    dispatch(createReport(data))
    .then(() => {
       toast.success("Report sent successfully");
       handleClose();
     })
    .catch((err) => {
       toast.error("Something went wrong when sending report");
     });
    handleClose();
  };

  return (
    <>
      <Tooltip title="Report this user">
        <Button variant="text" color="error" onClick={handleClickOpen}>
          Report
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
        <DialogTitle>Report this user</DialogTitle>
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
          <Button type="submit" color="error">Report</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
