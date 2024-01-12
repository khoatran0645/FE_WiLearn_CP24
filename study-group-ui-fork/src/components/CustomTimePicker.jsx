import { styled } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';

export default styled(TimePicker)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    fontWeight: 300
  },
  '& .Mui-disabled.Mui-error': {
    WebkitTextFillColor: '#FF0000'
  },
  '& .Mui-disabled.Mui-error fieldset.MuiOutlinedInput-notchedOutline': {
    borderColor: '#FF0000'
  }
});
