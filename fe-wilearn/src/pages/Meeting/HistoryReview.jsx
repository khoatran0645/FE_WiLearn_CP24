import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ChatBubble from '../MeetingUI/components/chat/ChatBubble';
import VoteResultDetailDialog from '../MeetingUI/components/VoteResultDetailDialog';

export default function HistoryReview(props) {
  const [voteResultDetail, setVoteResultDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentVoteData, setCurrentVoteData] = useState(null);
  // const [chatHistory, setChatHistory] = useState([]);
  const { reviewHistory } = props;

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
        Review History
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
            <DialogTitle fullWidth align='center'>Reivew History</DialogTitle>
            {(!reviewHistory || reviewHistory.length == 0) && (
              <Typography align='center'>No review found</Typography>
            )}
            {/* <List >
              {reviewHistory
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
            </List> */}
            {reviewHistory?.map((v) => {
              return (
                <Box
                  key={v.id}
                  sx={{
                    marginTop: "1rem",
                    padding: "12px",
                    backgroundColor: "#6c707b6e",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                      component={"span"}
                    >
                      {v.revieweeUsername} review
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                      component={"span"}
                    >
                      Number of reviewers: {v.details.length}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                      component={"span"}
                    >
                      Average: {v.average}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => onOpenVoteResultDetail(v?.details)}
                        style={{ margin: "5px" }}
                      >
                        Valuations
                      </Button>
                    </Box>
                  </Box>
                  <VoteResultDetailDialog
                    data={currentVoteData}
                    open={voteResultDetail}
                    onClose={onCloseVoteResultDetail}
                  />
                </Box>
              );
            })}
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
