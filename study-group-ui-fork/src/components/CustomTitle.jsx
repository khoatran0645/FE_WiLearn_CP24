import { styled, Typography } from '@mui/material';

export default styled(Typography)(({ theme }) => ({
  textTransform: 'unset',
  fontSize: '3.2rem',
  fontWeight: 600,
  letterSpacing: '1px',
  color: theme.palette.bodyText.main
}));
