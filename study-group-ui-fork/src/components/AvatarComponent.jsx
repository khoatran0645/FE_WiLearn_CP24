import { Avatar, styled } from '@mui/material';

export default styled(Avatar)(({ theme }) => ({
  width: '100px',
  height: '100px',
  cursor: 'pointer',
  textAlign: 'center',
  backgroundColor: theme.palette.darkGreen.main
}));
