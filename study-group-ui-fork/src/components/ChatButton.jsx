import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const ChatButton = (props) => {
  const { onClick } = props;

  return <Button onClick={onClick}>Chat</Button>;
};

ChatButton.propTypes = {
  onClick: PropTypes.func
};

export default ChatButton;
