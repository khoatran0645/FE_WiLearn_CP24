import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Tooltip,
} from "@mui/material";

import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReport } from "../app/reducer/studyGroupReducer/studyGroupActions";

export default function ReportIconButton(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.studyGroup);

  const { discussionId } = useParams();
//   console.log("discussionId", discussionId);
//   console.log("props", props);

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

    const data = {
      detail: reason,
      discussionId: discussionId !== undefined ? discussionId : null,
      fileId: props.fileId ? props.fileId : null,
    };
    console.log("data", data);
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
      <Tooltip title={`Report this ${props.type}`}>
        <IconButton size="large">
          <FlagCircleIcon fontSize="inherit" onClick={handleClickOpen} color="error" />
        </IconButton>
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
        <DialogTitle>Report this {props.type}</DialogTitle>
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
