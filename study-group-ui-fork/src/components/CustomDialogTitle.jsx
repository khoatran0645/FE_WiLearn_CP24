import { DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import PropTypes from 'prop-types';

const CustomDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle fontSize={'2.4rem'} fontWeight={600} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 12,
            color: '#ffffff'
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

CustomDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default CustomDialogTitle;
