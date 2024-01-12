import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CustomIcon from './CustomIcon';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import MessageIcon from '@mui/icons-material/Message';

const UserPaper = (props) => {
  const { stream, name } = props;
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // const renderActions = () => {
  //   return [
  //     <CustomIcon
  //       sx={{
  //         padding: '4px',
  //         '& svg': {
  //           width: '1.5rem',
  //           height: '1.5rem'
  //         }
  //       }}
  //       key={0}
  //       activeIcon={<MicIcon />}
  //       offIcon={<MicOffIcon />}
  //     />,
  //     <CustomIcon
  //       sx={{
  //         padding: '4px',
  //         '& svg': {
  //           width: '1.5rem',
  //           height: '1.5rem'
  //         }
  //       }}
  //       key={3}
  //       activeIcon={<PresentToAllIcon />}
  //       offIcon={<PresentToAllIcon />}
  //     />,
  //     <CustomIcon
  //       sx={{
  //         padding: '4px',
  //         '& svg': {
  //           width: '1.5rem',
  //           height: '1.5rem'
  //         }
  //       }}
  //       key={2}
  //       activeIcon={<MessageIcon />}
  //       offIcon={<MessageIcon />}
  //     />
  //   ];
  // };

  return (
    <Paper
      sx={{
        p: '4px'
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          mt: '12px'
        }}
      >
        {/* {renderActions()} */}
      </Box>
    </Paper>
  );
};

UserPaper.propTypes = {
  name: PropTypes.string,
  stream: PropTypes.any
};

export default UserPaper;
