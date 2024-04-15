import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from 'yup'

export default function UpdateMeetingButton({meeting}) {
  const [open, setOpen] = useState(false);
  const [meetingName, setMeetingName] = useState(meeting.name);
  const [meetingContent, setMeetingContent] = useState(meeting.content);
  const [selectedDate, setSelectedDate] = useState(meeting.date);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { groupId } = useParams();
  let leadGroups = [];
  const { userInfo } = useSelector(state => state.user);
  if (userInfo) {
    leadGroups = userInfo.leadGroups ? userInfo.leadGroups : [];
  }
  const isLead = leadGroups.some(g => g.id == parseInt(groupId));

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
    });
  };



  const handleDeleteMeeting = () => {
    console.log("Deleted meeting");
    handleClose();
  };

  const formatDatePickerResultToISOWithTimezone = (date) => {
    if (!date) return null;
    const padNumber = (number, length) => {
      return number.toString().padStart(length, '0');
    };
    console.log('utcOffset', date.utcOffset())
    const dateString = date.toISOString();
    // const timezoneOffset = date.getTimezoneOffset();
    // const timezoneOffset = date.utcOffset();

    const timezoneOffset = date.$d.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(timezoneOffset / 60));
    const offsetMinutes = Math.abs(timezoneOffset % 60);
    const offsetSign = timezoneOffset > 0 ? '-' : '+';

    const timezoneString = `${offsetSign}${padNumber(offsetHours, 2)}:${padNumber(offsetMinutes, 2)}`;

    return `${dateString.slice(0, -1)}${timezoneString}`;
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Require information.'),
    content: Yup.string().trim().required('Require information.'),
    // subjectIds: Yup.array().min(1, 'Please select at least one subject')
  });
  const formik = useFormik({
    initialValues: {
      groupId: parseInt(groupId),
      name: '',
      content: '',
      startTime: "",
      endTime: "",
      //Date for not repeat, startDate for Repeat
      // startDate: "",
      startDate: null,
      // startDate: dayjs(),
      endDate: null,
      dayOfWeeks: [],
      subjects: []
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("submit values", values);
      const isRepeat = currentTab !== 0;
      const data = {
        groupId: values.groupId,
        name: values.name,
        content: values.content,
        scheduleStartTime: values.startTime + ":00",
        scheduleEndTime: values.endTime + ":00",
        scheduleRangeStart: values.startDate.format(),
        scheduleRangeEnd: values.endDate.format(),
        dayOfWeeks: values.dayOfWeeks.map(day => day.id),
        subjectIds: values.subjects.map(sub => parseInt(sub.id)),
      }
      console.log("CreateSchedule mass submit values", values);
      console.log("CreateSchedule mass submit data", data);
      const response = await dispatch(massScheduleMeeting(data));
      if (response.type === massScheduleMeeting.fulfilled.type) {
        dispatch(getGroupLists());
        dispatch(getUserInfo())
        formik.resetForm();
        // handleCloseDialog();
        toast.success("Create repeating meetings successfully")
      } else {
        toast.error("Fail to create new meetings")
        const errorMap = response.payload.failuresMap;
        console.log("CreateSchedule error", errorMap)
        const {
          groupId,
          name,
          content,
          scheduleStartTime,
          scheduleEndTime,
          scheduleRangeStart,
          scheduleRangeEnd,
          subjectIds,
          ...others
        } = errorMap
        // alert(date)
        await formik.setErrors({
          ...formik.errors,
          groupId: groupId,
          name: name,
          content: content,
          startTime: scheduleStartTime,
          endTime: scheduleEndTime,
          startDate: scheduleRangeStart,
          endDate: scheduleRangeEnd,
          subjects: subjectIds,
          // others: others
        });
        console.log('formik.errors', formik.errors)
        dispatch(getUserInfo())
      }
    }

  });
  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={{
          backgroundColor: "#E6731e",
          "&:hover": {
            backgroundColor: "#E6731e",
          },
        }}
        onClick={handleOpen}
      >
        {isLead ? "Update" : "Info"}
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
            {isLead ? "Update meeting" : "Meeting info"}
          </Typography>
          <Box
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
          {isLead&&(
            <>
              <Button color="success" onClick={handleCreateMeeting}>Update</Button>
              <Button onClick={handleDeleteMeeting} color="error">Delete</Button>
            </>
          )}
          <Button sx={isLead?{ marginLeft: '100px' }:{}} onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </>
  );
}
