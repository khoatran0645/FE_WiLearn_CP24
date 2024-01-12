import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const ShareScreenButton = (props) => {
  const { onClick } = props;

  return <Button onClick={onClick}>Share screen</Button>;
};

ShareScreenButton.propTypes = {
  onClick: PropTypes.func
};

export default ShareScreenButton;
