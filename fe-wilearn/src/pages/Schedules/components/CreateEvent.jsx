import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

const CreateEvent = ({ addNewEvent }) => {
  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const newEvent = {
      id: Math.floor(Math.random() * 1000) + 1,
      title: eventName,
      start: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), startTime.getHours(), startTime.getMinutes()),
      end: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), endTime.getHours(), endTime.getMinutes()),
    };
    addNewEvent(newEvent);
    // Đóng dialog sau khi lưu
    setOpen(false);
  };

  return (
    <Grid>
      <Button onClick={handleOpen}
            style={{
              textAlign: "center",
              cursor: "pointer",
              fontSize: "14px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              marginLeft: "1000px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
          + Create event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="eventName"
            label="Event name"
            fullWidth
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <Grid style={{ marginTop: "15px" }}>
            <DatePicker
              label="Event date"
              value={eventDate}
              onChange={(newValue) => setEventDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid container spacing={2} paddingTop={2}>
            <Grid item xs={6}>
              <TimePicker
                label="Start time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label="End time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CreateEvent;
