import { FormControl } from '@mui/material';
import React from 'react';
import TextField from './TextField';

const NameInput = () => {
  return (
    <FormControl>
      <TextField placeholder="Enter your name" />
    </FormControl>
  );
};

export default NameInput;
