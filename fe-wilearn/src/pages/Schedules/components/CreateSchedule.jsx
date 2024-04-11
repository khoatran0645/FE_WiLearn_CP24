import { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Tab,
  Tabs,
  Grid,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CreateSchedule() {
  const [open, setOpen] = useState(false);
  const [meetingName, setMeetingName] = useState("");
  const [meetingContent, setMeetingContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [repeatedDays, setRepeatedDays] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateMeeting = () => {
    console.log("Submitted:", {
      meetingName,
      meetingContent,
      selectedDate,
      startTime,
      endTime,
      repeatedDays,
    });
  };

  const handleTabChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        sx={{
          backgroundColor: "#4CAF50",
          "&:hover": {
            backgroundColor: "#4CAF50",
          },
        }}
        onClick={handleOpen}
      >
        Create Schedule
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "10px", textAlign: "center" }}
          >
            Create schedule
          </Typography>
          <Tabs value={currentTab} onChange={handleTabChange} centered>
            <Tab label="Do not repeat" />
            <Tab label="Repeat" />
          </Tabs>
          <Box
            hidden={currentTab !== 0}
            sx={{
              marginTop: "1rem",
              "& > :not(style)": { marginBottom: "1rem" },
            }}
          >
            <TextField
              label="Meeting name"
              fullWidth
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
            />
            <TextField
              label="Content"
              fullWidth
              value={meetingContent}
              onChange={(e) => setMeetingContent(e.target.value)}
            />
            <TextField
              label="Meeting date"
              type="date"
              fullWidth
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Start time"
                  type="time"
                  fullWidth
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End time"
                  type="time"
                  fullWidth
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            hidden={currentTab !== 1}
            sx={{
              marginTop: "1rem",
              "& > :not(style)": { marginBottom: "1rem" },
            }}
          >
            <TextField
              label="Meeting name"
              fullWidth
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
            />
            <TextField
              label="Content"
              fullWidth
              value={meetingContent}
              onChange={(e) => setMeetingContent(e.target.value)}
            />
            <TextField
              label="Meeting date"
              type="date"
              fullWidth
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Start time"
                  type="time"
                  fullWidth
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End time"
                  type="time"
                  fullWidth
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ marginTop: "1rem" }}>
              <Autocomplete
                sx={{ width: "100%" }}
                multiple
                options={daysOfWeek}
                value={repeatedDays}
                onChange={(event, newValue) => {
                  setRepeatedDays(newValue);
                }}
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select days to repeat"
                    placeholder="Days"
                    fullWidth
                  />
                )}
                renderOption={(props, option, { selected }) => (
                  <MenuItem
                    {...props}
                    key={option}
                    value={option}
                    sx={{ justifyContent: "space-between" }}
                  >
                    {option}
                    {selected ? <CheckIcon color="info" /> : null}
                  </MenuItem>
                )}
              />
            </Box>
          </Box>
          <Button onClick={handleCreateMeeting} color="success">
            Create
          </Button>
          <Button onClick={handleClose} color="inherit">
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
