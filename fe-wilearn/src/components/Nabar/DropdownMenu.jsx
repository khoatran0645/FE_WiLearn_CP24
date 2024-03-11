import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function DropdownMenu() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        onClick={handleOpenNavMenu}
        color="inherit"
        aria-controls="menu-groups"
        aria-haspopup="true"
        sx={{ fontSize: 'inherit' }}
        endIcon={<KeyboardArrowDownIcon />}

      >
        Groups
      </Button>
      <Menu
        id="menu-groups"
        anchorEl={anchorElNav}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        <MenuItem onClick={handleCloseNavMenu} component={Link} to="/own">
          Own
        </MenuItem>
        <MenuItem onClick={handleCloseNavMenu} component={Link} to="/joined">
          Joined
        </MenuItem>
      </Menu>
    </Box>
  );
}
