import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const UserPaper = (props) => {
  const { stream, name, isFocus=false } = props;
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <Paper
      sx={{
        p: '4px',
        // borderColor: { isFocus ? "blue" :"red"}
        border: isFocus ? 2 : 0,
        // border: 0,
        borderColor: 'border.red'
      }}
    >
      <Box
        sx={{
          '& video': {
            width: '100%'
          }
        }}
      >
        {/* <video ref={videoRef} autoPlay muted={true}></video> */}
        <video ref={videoRef} autoPlay controls muted></video>
      </Box>
      <Typography sx={{ textAlign: 'center' }}>{name}</Typography>

    </Paper>
  );
};

UserPaper.propTypes = {
  name: PropTypes.string,
  stream: PropTypes.any
};

export default UserPaper;
