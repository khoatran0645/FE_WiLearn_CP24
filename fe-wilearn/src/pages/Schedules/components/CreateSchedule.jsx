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
import CheckIcon from "@mui/icons-material/Check";
import { scheduleMeeting } from "../../../app/reducer/studyGroupReducer";
import { massScheduleMeeting } from "../../../app/reducer/studyGroupReducer/studyGroupActions";

const daysOfWeek = [
  {
    id: 2,
    value: 2,
    label: "Monday",
  },
  {
    id: 3,
    value: 3,
    label: "Tuesday",
  },
  {
    id: 4,
    value: 4,
    label: "Wednesday",
  },
  {
    id: 5,
    value: 5,
    label: "Thursday",
  },
  {
    id: 6,
    value: 6,
    label: "Friday",
  },
  {
    id: 7,
    value: 7,
    label: "Saturday",
  },
  {
    id: 8,
    value: 8,
    label: "Sunday",
  },
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

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Require information.'),
    description: Yup.string().trim().required('Require information.'),
    // subjectIds: Yup.array().min(1, 'Please select at least one subject')
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
      subjects: [],
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const isRepeat = currentTab !== 0;
      if (isRepeat) {
        const data = {
          name: values.name,
          description: values.description,
          image: values.image,
          subjectIds: values.subjects.map(sub => parseInt(sub.id)),
        }
        console.log("CreateSchedule submit values", values);
        console.log("CreateSchedule submit data", data);
        const response = await dispatch(scheduleMeeting(data));
        if (response.type === scheduleMeeting.fulfilled.type) {
          dispatch(getGroupLists());
          dispatch(getUserInfo())
          formik.resetForm();
          handleCloseDialog();
          toast.success("Create meeting successfully")
        } else {
          toast.error("Fail to create a new meeting")
          dispatch(getUserInfo())
        }
      } else {
        const data = {
          name: values.name,
          description: values.description,
          image: values.image,
          subjectIds: values.subjects.map(sub => parseInt(sub.id)),
        }
        console.log("CreateSchedule mass submit values", values);
        console.log("CreateSchedule mass submit data", data);
        const response = await dispatch(massScheduleMeeting(data));
        if (response.type === massScheduleMeeting.fulfilled.type) {
          dispatch(getGroupLists());
          dispatch(getUserInfo())
          formik.resetForm();
          handleCloseDialog();
          toast.success("Create repeating meetings successfully")
        } else {
          toast.error("Fail to create new repeatings meeting")
          dispatch(getUserInfo())
        }
      }
    }

  });

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
          {/* Do not repeat */}
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
          {/* Repeat */}
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
                  formik.setFieldValue('subjects', selectedOptions);
                }}
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select days to repeat"
                    placeholder="Days"
                    fullWidth
                    error={formik.touched.subjects && Boolean(formik.errors.subjects)}
                    helperText={formik.touched.subjects && formik.errors.subjects}
                  />
                )}
                renderOption={(props, option, { selected }) => (
                  <MenuItem
                    {...props}
                    key={option.id}
                    value={option.id}
                    sx={{ justifyContent: "space-between" }}
                  >
                    {option.label}
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
