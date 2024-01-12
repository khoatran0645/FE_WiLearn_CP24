import { styled, TextField } from '@mui/material';

export default styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    '&.Mui-focused fieldset': {
      borderWidth: '1px'
    }
  }
}));
