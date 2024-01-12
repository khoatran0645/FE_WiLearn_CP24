import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, styled, Tooltip, Typography } from '@mui/material';

const IconButtonStyled = styled(IconButton)(({ isActive, isChangeColor }) => ({
  backgroundColor: !isChangeColor ? 'red' : isActive ? '#373737' : 'red',
  // backgroundColor: isChangeColor || !isActive ? 'red' : '#373737',
  color: 'white',
  height: 'fit-content',
  padding: '8px',
  cursor: 'pointer',
  width: 'fit-content',
  '&:hover': {
    backgroundColor: 'gray'
  }
}));

const CustomIcon = (props) => {
  // const { tooltipOn, tooltipOff, onClick, activeIcon, offIcon, sx, title, titleOff, disabled, isChangeColor } =
  const {
    tooltipOn,
    tooltipOff,
    onClick,
    activeIcon,
    offIcon,
    sx,
    title,
    titleOff,
    disabled
    // isChangeColor
  } = props;
  let { isChangeColor } = props;

  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
    onClick && onClick(active);
  };
  const showTitle = () => {
    if (titleOff && !active) {
      return titleOff;
    }
    return title;
  };
  if (isChangeColor === undefined) {
    isChangeColor = true;
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
      <Tooltip arrow title={active ? tooltipOff : tooltipOn} placeholder="top">
        <IconButtonStyled
          disabled={disabled}
          sx={{
            ...sx
          }}
          isActive={active}
          isChangeColor={isChangeColor}
          onClick={handleClick}
        >
          {active ? activeIcon : offIcon ? offIcon : active}
        </IconButtonStyled>
      </Tooltip>
      {title && (
        <Typography width={70} height={50} alignItems="center" textAlign="center">
          {showTitle()}
        </Typography>
      )}
    </Box>
  );
};

CustomIcon.propTypes = {
  tooltipOn: PropTypes.string,
  tooltipOff: PropTypes.string,
  onClick: PropTypes.func,
  activeIcon: PropTypes.node,
  offIcon: PropTypes.node,
  sx: PropTypes.any,
  disabled: PropTypes.bool,
  title: PropTypes.string
};

export default CustomIcon;
