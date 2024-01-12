import { styled } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

export default styled(DateTimePicker)({
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
