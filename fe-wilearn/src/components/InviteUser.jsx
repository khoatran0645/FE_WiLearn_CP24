import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

export default function InviteUser() {
  const [openDialog, setOpenDialog] = useState(false);
  const handleSearchUser = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchSubmit = () => {
    // Xử lý tìm kiếm ở đây
    // Sau khi tìm kiếm, bạn có thể đóng dialog bằng cách gọi setOpenDialog(false);
    console.log("Đã thực hiện tìm kiếm");
    setOpenDialog(false);
  };

  return (
    <>
      <Button onClick={handleSearchUser} variant="contained" size="small">
        Invite new member
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Search for user</DialogTitle>
        <DialogContent>
          <TextField label="UserID" fullWidth sx={{ marginTop: "10px" }} />
        </DialogContent>
        <DialogActions sx={{ marginRight: "10px" }}>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSearchSubmit} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
