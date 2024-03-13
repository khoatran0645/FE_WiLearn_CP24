import { useId, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

export default function UserMoreInfo(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const randomNumber = Math.floor(
    Math.random() * (999999999 - 111111111 + 1) + 111111111
  );

  return (
    <>
      <Button variant="outlined" size="medium" onClick={() => handleOpen()}>
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
            defaultValue={props.fullname + "_" + useId() + "@gmail.com"}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            sx={{ marginTop: "10px" }}
          />
          <TextField
            label="Phone"
            defaultValue={"0" + randomNumber}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            sx={{ marginTop: "10px" }}
          />
        </DialogContent>
        <DialogActions style={{ padding: "16px" }}>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}