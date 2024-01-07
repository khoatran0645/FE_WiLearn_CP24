import React, { useContext } from 'react';
import { Box } from '@mui/material';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { RoomContext } from 'src/context/roomContext';

const Chat = () => {
  const { chat } = useContext(RoomContext);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: 'background.main'
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        {/* {chat?.messages?.map((message) => (
          <ChatBubble key={message.timestamp} message={message} />
        ))} */}
        {mapChat(chat?.messages)}
      </Box>
      <ChatInput />
    </Box>
  );
};

const mapChat = (messages) => {
  const set = Array.from(new Set(messages));
  return set.map((message) => <ChatBubble key={message.timestamp} message={message} />);
};

Chat.propTypes = {};

export default Chat;
