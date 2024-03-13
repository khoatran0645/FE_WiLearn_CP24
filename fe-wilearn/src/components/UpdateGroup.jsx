import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function UpdateGroup() {
  const [openDialog, setOpenDialog] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [subject, setSubject] = useState("");

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdateGroup = () => {
    console.log("Updating group:", { groupName, subject });
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        variant="contained"
        size="medium"
        onClick={() => setOpenDialog(true)}
      >
        Update
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Update Group</DialogTitle>
        <DialogContent>
          <TextField
            label="Group Name"
            fullWidth
            sx={{ marginTop: "10px" }}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel htmlFor="subject-label">Subject</InputLabel>
            <Select
              fullWidth
              labelId="subject-label"
              id="demo-simple-select"
              value={subject}
              label="Subject"
              onChange={(e) => setSubject(e.target.value)}
            >
              <MenuItem value="React">React</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions style={{ padding: "16px" }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateGroup}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
