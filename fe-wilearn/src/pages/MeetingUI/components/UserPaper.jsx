import { Box, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { RoomContext } from '../context/roomContext';
import {
  Avatar,
} from "@mui/material";

const UserPaper = (props) => {
  const {showAvaList}= useContext(RoomContext)
  const { stream, name, peerId, isFocus=false } = props;
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  const ava = showAvaList.find(focus => focus.peerId == peerId);

  return (
    <Paper
      sx={{
        p: '4px',
        // borderColor: { isFocus ? "blue" :"red"}
        border: isFocus ? 2 : 0,
        // border: 0,
        borderColor: 'border.red',
        maxWidth: '300px'
      }}
    >
      <Box
        sx={{
          '& video': {
            width: '100%'
          }
        }}
      >
         {
                ava &&(
                  <Avatar
                  src={ava?.imagePath}
                  sx={{ width: '100%', height:'100%' }}
                  />
                )
              }
              {/* <video ref={videoRef} autoPlay controls muted display={ava?"none":""} ></video> */}
              <video ref={videoRef} autoPlay controls muted style={{display:ava?"none":"" }}></video>
        {/* <video ref={videoRef} autoPlay muted={true}></video> */}
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
