import { useState } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

export default function ButtonFindGroup() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleSearch = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchSubmit = () => {
    // Xử lý tìm kiếm ở đây
    // Sau khi tìm kiếm, bạn có thể đóng dialog bằng cách gọi setOpenDialog(false);
    console.log('Đã thực hiện tìm kiếm');
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        onClick={handleSearch}
        variant="contained"
        startIcon={<GroupsIcon />}
      >
        Find Group
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Find Group</DialogTitle>
        <DialogContent>
          {/* Các trường tìm kiếm (ví dụ: TextField) sẽ ở đây */}
          <TextField label="Group Name" fullWidth />
          {/* Thêm các trường tìm kiếm khác nếu cần thiết */}
        </DialogContent>
        <DialogActions>
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

