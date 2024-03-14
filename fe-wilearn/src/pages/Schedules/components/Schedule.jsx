import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function Schedule() {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([
    {
      title: "Math Class",
      start: new Date(2024, 2, 1, 10, 0),
      end: new Date(2024, 2, 1, 12, 0),
    },
    {
      title: "English Class",
      start: new Date(2024, 2, 2, 14, 0),
      end: new Date(2024, 2, 2, 16, 0),
    },
    {
      title: "Science Class",
      start: new Date(2024, 2, 3, 13, 0),
      end: new Date(2024, 2, 3, 15, 0),
    },
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setSelectedSlot(null);
    setNewEventTitle("");
    setSelectedStartTime(null);
    setSelectedEndTime(null);
  };

  const handleCreateEvent = () => {
    if (newEventTitle && selectedSlot && selectedStartTime && selectedEndTime) {
      const newEvent = {
        title: newEventTitle,
        start: selectedStartTime,
        end: selectedEndTime,
      };
      setEvents([...events, newEvent]);
      handleModalClose();
    }
  };

  return (
    <Box sx={{ maxWidth: "1200px", marginLeft: "20px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "left", marginBottom:"20px" }}>My Schedule</Typography>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Create Event Modal"
        style={{
          overlay: {
            position: "fixed",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            zIndex: 1000,
          },
          content: {
            width: "400px",
            height: "300px",
            margin: "auto",
            marginTop: "50px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ fontFamily: "sans-serif", display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" sx={{ textAlign: "left", marginBottom:"20px" }}>Create Event</Typography>
        </Box>
        <TextField
          label="Event name"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Start Time"
            type="time"
            value={selectedStartTime ? selectedStartTime.toTimeString().slice(0, 5) : ""}
            onChange={(e) => setSelectedStartTime(new Date(`2000-01-01T${e.target.value}:00`))}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ marginRight: "60px" }}
          />
          <TextField
            label="End Time"
            type="time"
            value={selectedEndTime ? selectedEndTime.toTimeString().slice(0, 5) : ""}
            onChange={(e) => setSelectedEndTime(new Date(`2000-01-01T${e.target.value}:00`))}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ marginLeft: "20px" }}
          />
        </Box>
        <Box sx={{ marginTop: "20px"}}>
          <Button variant="contained" color="primary" onClick={handleCreateEvent} sx={{  marginRight: "20px" }}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleModalClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
