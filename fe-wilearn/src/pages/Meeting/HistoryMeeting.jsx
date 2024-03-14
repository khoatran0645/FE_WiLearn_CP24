import { useState } from 'react';
import { Button, Dialog, DialogContent, DialogActions, CardActionArea, CardContent, Typography, Grid, Card, Box } from '@mui/material';
import HistoryChat from './HistoryChat';

export default function HistoryMeeting() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" fullWidth onClick={handleClickOpen}>
        Meeting history
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box display="flex" justifyContent="space-between" flexWrap="wrap" flexDirection="column">
            <Card
              key="1"
              sx={{ width: "500px", border: "3px solid red", margin: "0.5rem" }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    On tap kiem tra Ly
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Content: on tap kiem tra Ly 29/02
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Expect: 29/02 10:34 - 11:19
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Happen: 29/02 10:49
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Status: Happened
                  </Typography>
                  <Grid container justifyContent="center" sx={{ paddingTop: "1rem" }}>
                    <HistoryChat />
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              key="2"
              sx={{ width: "500px", border: "3px solid red", margin: "0.5rem" }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    On tap kiem tra Toan
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Content: on tap kiem tra Toan 29/02
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Expect: 29/02 10:34 - 11:19
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Happen: 29/02 10:49
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Status: Happened
                  </Typography>
                  <Grid container justifyContent="center" sx={{ paddingTop: "1rem" }}>
                    <HistoryChat />
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              key="2"
              sx={{ width: "500px", border: "3px solid red", margin: "0.5rem" }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    On tap kiem tra Toan
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Content: on tap kiem tra Toan 01/03
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Expect: 29/02 10:34 - 11:19
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Happen: 29/02 10:49
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Status: Happened
                  </Typography>
                  <Grid container justifyContent="center" sx={{ paddingTop: "1rem" }}>
                    <HistoryChat />
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
