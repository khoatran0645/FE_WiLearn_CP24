import { Box } from '@mui/material';
import React from 'react';
// import { stringToColor } from 'src/common/utils';
import PropTypes from 'prop-types';

const MeetingAvatar = (props) => {
  return (
    <Box
      sx={{
        minWidth: '150px',
        borderRadius: '10px',
        backgroundColor: '#cccccc',
        color: '#ffffff',
        padding: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {props.children}
    </Box>
  );
};

MeetingAvatar.propTypes = {
  children: PropTypes.string
};

export default MeetingAvatar;
