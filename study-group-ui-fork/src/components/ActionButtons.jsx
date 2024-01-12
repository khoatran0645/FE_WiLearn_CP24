import { Box, IconButton, styled, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MicOffIcon from '@mui/icons-material/MicOff';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import WavingHandRoundedIcon from '@mui/icons-material/WavingHandRounded';
import BackHandRoundedIcon from '@mui/icons-material/BackHandRounded';
import ThumbsUpDownRoundedIcon from '@mui/icons-material/ThumbsUpDownRounded';
import MessageIcon from '@mui/icons-material/Message';
import PropTypes from 'prop-types';

const IconButtonStyled = styled(IconButton)(({ isActive }) => ({
  backgroundColor: isActive ? '#373737' : 'red',
  color: 'white',
  '&:hover': {
    backgroundColor: 'gray'
  }
}));

const ActionsBtn = (props) => {
  const { openChat, onToggleChat, fontSize, isMic, isChat, isCamera, isScreen, isHand, isVote } =
    props;
  const [mic, setMic] = useState(false);
  const [camera, setCamera] = useState(false);
  const [screen, setScreen] = useState(false);
  const [hand, setHand] = useState(false);
  const [vote, setVote] = useState(false);

  const toggleToggleMic = () => {
    setMic(!mic);
  };

  const toggleToggleCamera = () => {
    setCamera(!camera);
  };

  const toggleShareScreen = () => {
    setScreen(!screen);
  };

  const toggleRaiseHand = () => {
    setHand(!hand);
  };

  const toggleVote = () => {
    setVote(!vote);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '32px'
      }}
    >
      {isMic && (
        <Tooltip arrow title={mic ? 'Tắt mic' : 'Bật mic'} placeholder="top">
          <IconButtonStyled fontSize={fontSize} isActive={mic} onClick={toggleToggleMic}>
            {mic ? <MicIcon /> : <MicOffIcon />}
          </IconButtonStyled>
        </Tooltip>
      )}
      {isCamera && (
        <Tooltip arrow title={camera ? 'Tắt camera' : 'Bật camera'} placeholder="top">
          <IconButtonStyled fontSize={fontSize} isActive={camera} onClick={toggleToggleCamera}>
            {camera ? <CameraAltIcon /> : <NoPhotographyIcon />}
          </IconButtonStyled>
        </Tooltip>
      )}
      {isScreen && (
        <Tooltip arrow title={camera ? 'Tắt camera' : 'Bật camera'} placeholder="top">
          <IconButtonStyled fontSize={fontSize} isActive={!screen} onClick={toggleShareScreen}>
            <PresentToAllIcon />
          </IconButtonStyled>
        </Tooltip>
      )}
      {isChat && (
        <Tooltip arrow title={openChat ? 'Tắt chat' : 'Bật chat'} placeholder="top">
          <IconButtonStyled fontSize={fontSize} isActive={!openChat} onClick={onToggleChat}>
            <ThumbsUpDownRoundedIcon />
          </IconButtonStyled>
        </Tooltip>
      )}
      {isHand && (
        <Tooltip arrow title={hand ? 'Hạ tay' : 'Giơ tay'} placeholder="top">
          <IconButtonStyled fontSize={fontSize} isActive={hand} onClick={toggleRaiseHand}>
            {hand ? <WavingHandRoundedIcon /> : <BackHandRoundedIcon />}
          </IconButtonStyled>
        </Tooltip>
      )}
      {isVote && (
        <Tooltip arrow title={vote ? 'Tắt review' : 'Bật review'} placeholder="top">
          <IconButtonStyled fontSize={fontSize} isActive={!vote} onClick={toggleVote}>
            <MessageIcon />
          </IconButtonStyled>
        </Tooltip>
      )}
    </Box>
  );
};

ActionsBtn.propTypes = {
  openChat: PropTypes.bool,
  onToggleChat: PropTypes.func.isRequired,
  fontSize: PropTypes.string,
  isMic: PropTypes.bool,
  isChat: PropTypes.bool,
  isCamera: PropTypes.bool,
  isScreen: PropTypes.bool,
  isHand: PropTypes.bool,
  isVote: PropTypes.bool
};

ActionsBtn.defaultProps = {
  openChat: false,
  isMic: true,
  isChat: true,
  isCamera: true,
  isScreen: true,
  isHand: true,
  isVote: true
};

export default ActionsBtn;
