import { useState } from 'react';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ChatBubble from '../MeetingUI/components/chat/ChatBubble';
import VoteResultDetailDialog from '../MeetingUI/components/VoteResultDetailDialog';

export default function HistoryCanvas(props) {
  const [voteResultDetail, setVoteResultDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentVoteData, setCurrentVoteData] = useState(null);
  // const [chatHistory, setChatHistory] = useState([]);
  const { canvasPath } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onOpenVoteResultDetail = (data) => {
    setVoteResultDetail(true);
    setCurrentVoteData(data);
  };
  const onCloseVoteResultDetail = () => {
    setVoteResultDetail(false);
  };

  return (
    <>
      <Button variant="contained" fullWidth onClick={handleClickOpen}>
        Whiteboard
      </Button>
      {/* <Box sx={{ width: "1000px", maxHeight: '80vh', alignItems: 'center' }}> */}
      <Box>
        <Dialog
          fullScreen
          open={open} onClose={handleClose} >
          <DialogContent >
          <Paper elevation={3} sx={{ padding: 2, marginTop: 1 }}>

            <DialogTitle fullWidth align='center'>Whiteboard</DialogTitle>
            {(!canvasPath || canvasPath.length == 0) ? (
              <Typography align='center'>No whiteboard found</Typography>
            ):(
              <img src={canvasPath}/>
            )}
           </Paper>
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
