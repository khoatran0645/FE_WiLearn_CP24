import GroupsIcon from '@mui/icons-material/Groups';
import { Button } from '@mui/material';
export default function ButtonFindGroup() {
    const handleSearch = () => {
        console.log('Đã nhấp vào nút tìm kiếm');
      };
  return (
      <Button
        onClick={handleSearch}
        variant="contained"
        startIcon={<GroupsIcon />}
      >
        Find Group
      </Button>          
  )
}
