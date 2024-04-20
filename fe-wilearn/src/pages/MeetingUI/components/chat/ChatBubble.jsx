import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { RoomContext } from "../../context/roomContext";
import { useSelector } from "react-redux";

const ChatBubble = ({ message }) => {
  // const { userName: myName } = useContext(RoomContext);
  const {userInfo} = useSelector(state=>state.user)
  const myName  = userInfo?.username
  const userName = message.username || "Anonimus";
  const isSelf = userName === myName;
  // const time = new Date(message.timestamp).toLocaleTimeString();
  const time = message.timeStamp;

  return (
    <Box
      sx={{
        // color: "white",
        p: "8px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: isSelf ? "flex-end" : "flex-start",
      }}
    >
      <Typography
        sx={{
          textAlign: isSelf ? "right" : "left",
        }}
        variant="subtitle2"
        color={"primary.main"}
      >
        {isSelf ? "You" : userName}
      </Typography>
      <Typography
        sx={{
          textAlign: isSelf ? "right" : "left",
          color: "darkGreen.main",
        }}
      >
        {message.content}
      </Typography>
      <Typography
        sx={{
          display: "inherit",
          textAlign: isSelf ? "right" : "left",
          color: "darkGreen.main",
        }}
        variant="caption"
      >
        {time}
      </Typography>
    </Box>
  );
};

ChatBubble.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string,
    author: PropTypes.string,
    timestamp: PropTypes.number,
    userName: PropTypes.string,
  }),
};

export default ChatBubble;
