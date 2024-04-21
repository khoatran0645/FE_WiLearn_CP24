import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const VideoPlayer = (props) => {
  const { stream, muted, height="100%" } = props;
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.srcObject = null;
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <Box
    id={`Box`}
    // height= {height}
    transition= 'all 2s ease'
    sx={{
        '& video': {
          width: '100%',
          height: {height},
        }
      }}
    >
      {/* <video style={{ width: '100%' }} ref={videoRef} autoPlay muted={true}></video> */}
      <video style={{ width: '100%' }} ref={videoRef} autoPlay controls muted={muted}></video>
    </Box>
  );
};

VideoPlayer.propTypes = {
  stream: PropTypes.any
};

export default VideoPlayer;
