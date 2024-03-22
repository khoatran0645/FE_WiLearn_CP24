import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function MeetingNowButton() {
  const [openDialog, setOpenDialog] = useState(false);
  const [nameRoom, setNameRoom] = useState("");
  const [contentRoom, setContentRoom] = useState("");

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateRoom = () => {
    console.log("Creating room:", { nameRoom, contentRoom });
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        onClick={() => setOpenDialog(true)}
      >
        Meeting now
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Create meeting</DialogTitle>
        <DialogContent>
          <TextField
            label="Meeting Name"
            fullWidth
            sx={{ marginTop: "10px" }}
            value={nameRoom}
            onChange={(e) => setNameRoom(e.target.value)}
          />
          <TextField
            label="Content"
            fullWidth
            sx={{ marginTop: "10px" }}
            value={contentRoom}
            onChange={(e) => setContentRoom(e.target.value)}
          />
        </DialogContent>
        <DialogActions style={{ padding: "16px" }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateRoom}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
