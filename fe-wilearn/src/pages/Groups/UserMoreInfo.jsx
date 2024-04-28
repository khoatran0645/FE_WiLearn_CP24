import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeleteMemButton from "./DeleteMemButton";
import ReportButton from "./ReportButton";

export default function UserMoreInfo(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { userInfo } = useSelector((state) => state.user);

  const { groupId } = useParams();
  let leadGroups = [];
  if (userInfo) {
    leadGroups = userInfo.leadGroups ? userInfo.leadGroups : [];
  }
  const isLead = leadGroups.some((g) => g.id == parseInt(groupId));

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => handleOpen()}>
        More info
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>User information</DialogTitle>
        <DialogContent>
          <TextField
            label="Full name"
            fullWidth
            defaultValue={props.fullname}
            InputProps={{
              readOnly: true,
            }}
            sx={{ marginTop: "10px" }}
          />
          <TextField
            label="Email"
            defaultValue={props.email}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            sx={{ marginTop: "10px" }}
          />
          <TextField
            label="Phone"
            defaultValue={props.phone}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            sx={{ marginTop: "10px" }}
          />
        </DialogContent>
        <DialogActions style={{ padding: "16px" }}>
          {!isLead && !(props.userId === userInfo.id) && (
            <ReportButton userId={props.userId} />
          )}
          {isLead && !props.isFirst && <DeleteMemButton />}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
