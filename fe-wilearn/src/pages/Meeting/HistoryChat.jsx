import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';

export default function HistoryChat() {
  const [open, setOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleClickOpen = () => {
    const history = [
      { sender: 'Alice', message: 'Hello!', time: '10:00 AM' },
      { sender: 'Bob', message: 'Hi Alice!', time: '10:05 AM' },
      { sender: 'Alice', message: 'How are you? I miss you so much <3', time: '10:10 AM' },
      { sender: 'Bob', message: 'Fine!', time: '10:12 AM' },
      { sender: 'Bob', message: 'I love you', time: '10:13 AM' },
      { sender: 'Alice', message: 'Hello!', time: '10:00 AM' },
      { sender: 'Bob', message: 'Hi Alice!', time: '10:05 AM' },
      { sender: 'Alice', message: 'How are you? I miss you so much <3', time: '10:10 AM' },
      { sender: 'Bob', message: 'Fine!', time: '10:12 AM' },
      { sender: 'Bob', message: 'I love you', time: '10:13 AM' },
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
      <Box sx={{ width: "400px", maxHeight: '80vh' }}>
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
            <DialogTitle sx={{ textAlign: 'center' }}>Chat History</DialogTitle>
            <List>
                {chatHistory.map((chat, index) => (
                <ListItem key={index}>
                    <ListItemText primary={`${chat.sender}: ${chat.message}`} secondary={chat.time} />
                </ListItem>
                ))}
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
