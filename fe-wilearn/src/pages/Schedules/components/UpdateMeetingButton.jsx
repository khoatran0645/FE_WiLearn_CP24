import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from 'yup'

export default function UpdateMeetingButton({meeting}) {
  const [open, setOpen] = useState(false);
  // const [meetingName, setMeetingName] = useState(meeting.name);
  // const [meetingContent, setMeetingContent] = useState(meeting.content);
  // const [selectedDate, setSelectedDate] = useState(meeting.date);
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");
  let subjectLists = [];
  const { groupInfo } = useSelector((state) => state.studyGroup);
  if(groupInfo){
    subjectLists= groupInfo.subjects
  }
  const { groupId } = useParams();
  let leadGroups = [];
  const { userInfo } = useSelector(state => state.user);
  if (userInfo) {
    leadGroups = userInfo.leadGroups ? userInfo.leadGroups : [];
  }
  const isLead = leadGroups.some(g => g.id == parseInt(groupId));

  const handleOpen = () => {
    setOpen(true);
    console.log("UpdateMeetingButton meeting", meeting)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateMeeting = () => {
    // console.log("Submitted:", {
    //   meetingName,
    //   meetingContent,
    //   selectedDate,
    //   startTime,
    //   endTime,
    // });
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
      name: meeting.name,
      content: meeting.content,
      startTime: dayjs(meeting.scheduleStart).format("HH:mm"),
      endTime: dayjs(meeting.scheduleEnd).format("HH:mm"),
      //Date for not repeat, startDate for Repeat
      // startDate: null,
      startDate:dayjs(meeting.scheduleStart),
      // startDate: dayjs(),
      subjects: meeting.subjects
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
        handleClose();
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
              // value={meetingName}
              // onChange={(e) => setMeetingName(e.target.value)}
              disabled={!isLead}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Content"
              fullWidth
              // value={meetingContent}
              // onChange={(e) => setMeetingContent(e.target.value)}
              disabled={!isLead}
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
             <Box>
              <Typography variant="subtitle1" gutterBottom>
                Meeting date
              </Typography>
              <DatePicker
                disabled={!isLead}
                name="startDate"
                value={formik.values.startDate}
                // onChange={formik.handleChange}
                onChange={(date) => {
                  formik.setFieldValue('startDate', date)
                  console.log("DatePicker onChange", date)
                }}
                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                helperText={formik.touched.startDate && formik.errors.startDate}
                fullWidth
                sx={{width:"100%"}}
                disablePast
                // format="DD/MM/YYYY"
              />
              {formik.values.startDate&&formik.values.startDate.format()}
              {(formik.touched.startDate && formik.errors.startDate) && (
                <Typography variant="caption" gutterBottom sx={{color:"red"}}>
                  {formik.errors.startDate}
                </Typography>
              )}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Start time"
                  type="time"
                  fullWidth
                  disabled={!isLead}
                  // value={startTime}
                  // onChange={(e) => setStartTime(e.target.value)}
                  name="startTime"
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                  helperText={formik.touched.startTime && formik.errors.startTime}
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
                  disabled={!isLead}
                  // value={endTime}
                  // onChange={(e) => setEndTime(e.target.value)}
                  name="endTime"
                  value={formik.values.endTime}
                  onChange={formik.handleChange}
                  error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                  helperText={formik.touched.endTime && formik.errors.endTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ marginTop: "1rem" }}>
              <Autocomplete
                multiple
                id="subjects"
                disabled={!isLead}
                options={subjectLists}
                isOptionEqualToValue={
                  (option, value)=>option.id==value.id || option.name==value.name
                }
                getOptionLabel={(option) => option.name}
                value={formik.values.subjects}
                onChange={(event, selectedOptions) => {
                  formik.setFieldValue('subjects', selectedOptions);
                }}
                onBlur={formik.handleBlur('subjects')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select group subjects"
                    placeholder="Select subjects"
                    error={formik.touched.subjects && Boolean(formik.errors.subjects)}
                    helperText={formik.touched.subjects && formik.errors.subjects}
                  />
                )}
              />
            </Box>
          </Box>
          {isLead&&(
            <>
              <Button color="success" onClick={handleUpdateMeeting}>Update</Button>
              <Button onClick={handleDeleteMeeting} color="error">Delete</Button>
            </>
          )}
          <Button sx={isLead?{ marginLeft: '100px' }:{}} onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </>
  );
}
