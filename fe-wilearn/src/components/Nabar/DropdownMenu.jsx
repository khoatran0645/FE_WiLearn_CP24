import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ListItemIcon } from '@mui/material';

export default function DropdownMenu() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setIsSubMenuOpen(false);
  };

  const handleSubMenuOpen = () => {
    setIsSubMenuOpen(true);
  };

  const handleSubMenuClose = () => {
    setIsSubMenuOpen(false);
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
        <MenuItem
          onClick={handleSubMenuOpen}
          onMouseLeave={handleCloseNavMenu}
          sx={{ position: 'relative' }}
        >
          Joined
          <ListItemIcon>
            <KeyboardArrowRightIcon />
          </ListItemIcon>
          <Menu
            anchorEl={anchorElNav}
            open={isSubMenuOpen}
            onClose={handleSubMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            sx={{ marginTop: '45px', marginLeft: '13px' }}
          >
            <MenuItem onClick={handleSubMenuClose} component={Link} to="/joined/nhom1">
              Nhóm 1
            </MenuItem>
            <MenuItem onClick={handleSubMenuClose} component={Link} to="/joined/nhom2">
              Nhóm 2
            </MenuItem>
          </Menu>
        </MenuItem>
      </Menu>
    </Box>
  );
}
