import { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, List, ListItem, ListItemText } from '@mui/material';

export default function HistoryChat() {
  const [open, setOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleClickOpen = () => {
    const history = [
      { sender: 'Alice', message: 'Hello!', time: '10:00 AM' },
      { sender: 'Bob', message: 'Hi Alice!', time: '10:05 AM' },
      { sender: 'Alice', message: 'How are you?', time: '10:10 AM' },
      { sender: 'Bob', message: 'Fine!', time: '10:12 AM' },
      { sender: 'Bob', message: 'Fine!', time: '10:12 AM' },
      { sender: 'Bob', message: 'Fine!', time: '10:12 AM' },
      { sender: 'Bob', message: 'Fine!', time: '10:12 AM' },
    ];
    setChatHistory(history);
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
      <Box sx={{width:"400px"}}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chat History</DialogTitle>
        <List>
          {chatHistory.map((chat, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${chat.sender}: ${chat.message}`} secondary={chat.time} />
            </ListItem>
          ))}
        </List>
        <Button onClick={handleClose}>
          Close
        </Button>
      </Dialog>
      </Box>     
    </>
  );
}
