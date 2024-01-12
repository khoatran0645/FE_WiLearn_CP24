import { Box, styled } from '@mui/material';

export default styled(Box)(({ open }) => {
  return {
    width: open ? '100%' : 0,
    maxWidth: '300px',
    height: `100%`,
    maxHeight: '70vh',
    position: 'relative',
    transform: open ? 'translateX(0)' : 'translateX(calc(100% + 24px))'
  };
});
