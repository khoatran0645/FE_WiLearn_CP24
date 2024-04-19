import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import dayjs from 'dayjs';
import ChatBubble from '../MeetingUI/components/chat/ChatBubble';

export default function HistoryChat(props) {
  const [open, setOpen] = useState(false);
  // const [chatHistory, setChatHistory] = useState([]);
  const { chatHistory } = props;

  const handleClickOpen = () => {
    // const history = [
    //   { sender: 'Alice', message: 'Hello!', time: '10:00 AM' },
    //   { sender: 'Bob', message: 'Hi Alice!', time: '10:05 AM' },
    //   { sender: 'Alice', message: 'How are you? I miss you so much <3', time: '10:10 AM' },
    //   { sender: 'Bob', message: 'Fine!', time: '10:12 AM' },
    //   { sender: 'Bob', message: 'I love you', time: '10:13 AM' },
    //   { sender: 'Alice', message: 'Hello!', time: '10:00 AM' },
    //   { sender: 'Bob', message: 'Hi Alice!', time: '10:05 AM' },
    //   { sender: 'Alice', message: 'How are you? I miss you so much <3', time: '10:10 AM' },
    //   { sender: 'Bob', message: 'Fine!', time: '10:12 AM' },
    //   { sender: 'Bob', message: 'I love you', time: '10:13 AM' },
    // ];
    // setChatHistory(history);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" fullWidth onClick={handleClickOpen}>
        Chat History
      </Button>
      {/* <Box sx={{ width: "1000px", maxHeight: '80vh', alignItems: 'center' }}> */}
      <Box>
        <Dialog
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "600px",  // Set your width here
                minheight: '60vh',
                maxheight: '80vh'
              },
            },
          }}
          open={open} onClose={handleClose} >
          <DialogContent >
            <DialogTitle fullWidth align='center'>Chat History</DialogTitle>
            <List >
              {/* {chatHistory.map((chat, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${chat.accountUsername}: ${chat.content}`} secondary={dayjs(chat.time).format("HH:MM:ss")} />
                </ListItem>
              ))} */}
              {chatHistory
                .map(chat => {
                  return {
                    username: chat.accountUsername,
                    content: chat.content,
                    timeStamp: dayjs(chat.time).format("HH:MM:ss")
                  }
                })
                .map((message, index) => (
                  <ListItem key={index}>
                    <Box
                      sx={{
                        flex: 1,
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}
                    >
                      <ChatBubble key={message.timestamp} message={message} />
                    </Box>
                  </ListItem>
                )
                )}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
