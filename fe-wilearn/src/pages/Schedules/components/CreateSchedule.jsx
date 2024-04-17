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
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import * as Yup from 'yup'
import { scheduleMeeting } from "../../../app/reducer/studyGroupReducer";
import { getGroupInfo, getGroupLists, massScheduleMeeting } from "../../../app/reducer/studyGroupReducer/studyGroupActions";
import { ErrorMessage, useFormik } from "formik";
import { useParams } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs'
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../app/reducer/userReducer";
import { toast } from "react-toastify";

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
  const dispatch = useDispatch();
  const {groupId} = useParams();
  let subjectLists = [];
  const { groupInfo } = useSelector((state) => state.studyGroup);
  if(groupInfo){
    subjectLists= groupInfo.subjects
  }

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
      subjects:[]
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("submit values", values);
      const isRepeat = currentTab !== 0;
      if (isRepeat) {
        const data = {
          groupId: values.groupId,
          name: values.name,
          content: values.content,
          scheduleStartTime: values.startTime+":00",
          scheduleEndTime: values.endTime+":00",
          scheduleRangeStart: values.startDate.format(),
          scheduleRangeEnd: values.endDate.format(),
          dayOfWeeks: values.dayOfWeeks.map(day=>day.id),
          subjectIds: values.subjects.map(sub=> parseInt(sub.id)),
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
        dispatch(getGroupInfo(groupId))
      } else {
        const data = {
          groupId: values.groupId,
          name: values.name,
          content: values.content,
          scheduleStartTime: values.startTime+":00",
          scheduleEndTime: values.endTime+":00",
          date: values.startDate.format(),
          subjectIds: values.subjects.map(sub=> parseInt(sub.id)),
        }
        console.log("CreateSchedule  submit values", values);
        console.log("CreateSchedule  submit data", data);
        const response = await dispatch(scheduleMeeting(data));
        if (response.type === scheduleMeeting.fulfilled.type) {
          dispatch(getGroupLists());
          dispatch(getUserInfo())
          formik.resetForm();
          // handleCloseDialog();
          toast.success("Create meeting successfully")
        } else {
          toast.error("Fail to create a new meeting")
          const errorMap = response.payload.failuresMap;
          console.log("CreateSchedule error", errorMap)
          const {
            groupId,
            name,
            content,
            scheduleStartTime,
            scheduleEndTime,
            date,
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
            startDate: date,
            subjects: subjectIds, 
            // others: others
          });
          console.log('formik.errors', formik.errors)
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
          component={'form'}
          onSubmit={formik.handleSubmit}
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
              // value={meetingName}
              // onChange={(e) => setMeetingName(e.target.value)}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Content"
              type="text"
              fullWidth
              // value={meetingContent}
              // onChange={(e) => setMeetingContent(e.target.value)}
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
                name="startDate"
                value={formik.values.startDate}
                // onChange={formik.handleChange}
                onChange={(date) => formik.setFieldValue('startDate', date)}
                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                helperText={formik.touched.startDate && formik.errors.startDate}
                fullWidth
                sx={{width:"100%"}}
                disablePast
                format="DD/MM/YYYY"
              />
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
              // value={meetingName}
              // onChange={(e) => setMeetingName(e.target.value)}
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
                  // onChange={(e) => setMeetingContent(e.target.value)} name="content"
                  name="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  error={formik.touched.content && Boolean(formik.errors.content)}
                  helperText={formik.touched.content && formik.errors.content}
                />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Start date
                    </Typography>
                    <DatePicker
                      name="startDate"
                      value={formik.values.startDate}
                      // onChange={formik.handleChange}
                      onChange={(date) => formik.setFieldValue('startDate', date)}
                      error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                      helperText={formik.touched.startDate && formik.errors.startDate}
                      // renderInput={(params) => <input {...params.inputProps} />}
                      fullWidth
                      format="DD/MM/YYYY"
                      disablePast
                    />
                    {(formik.touched.startDate && formik.errors.startDate) && (
                      <Typography variant="caption" gutterBottom sx={{color:"red"}}>
                        {formik.errors.startDate}
                      </Typography>
                    )}
                  </Box>
              </Grid>
              <Grid item xs={6}>
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      End date
                    </Typography>
                    <DatePicker
                      name="startDate"
                      value={formik.values.endDate}
                      // onChange={formik.handleChange}
                      onChange={(date) => formik.setFieldValue('endDate', date)}
                      error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                      helperText={formik.touched.endDate && formik.errors.endDate}
                      // renderInput={(params) => <input {...params.inputProps} />}
                      fullWidth
                      sx={{width:"100%"}}
                      disablePast
                      format="DD/MM/YYYY"
                    />
                    {(formik.touched.endDate && formik.errors.endDate) && (
                      <Typography variant="caption" gutterBottom sx={{color:"red"}}>
                        {formik.errors.endDate}
                      </Typography>
                    )}
                  </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Start time"
                  type="time"
                  fullWidth
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
                sx={{ width: "100%" }}
                multiple
                options={daysOfWeek}
                // value={repeatedDays}
                isOptionEqualToValue={
                  (option, value)=>option.id==value.id || option.value==value.value
                }
                onChange={(event, newValue) => {
                  setRepeatedDays(newValue);
                  formik.setFieldValue('dayOfWeeks', newValue);
                }}
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select days to repeat"
                    placeholder="Days"
                    fullWidth
                    error={formik.touched.dayOfWeeks && Boolean(formik.errors.dayOfWeeks)}
                    helperText={formik.touched.dayOfWeeks && formik.errors.dayOfWeeks}
                  />
                )}
              />
            </Box>
            <Box sx={{ marginTop: "1rem" }}>
              <Autocomplete
                multiple
                id="subjects"
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
          {/* <Button onClick={handleCreateMeeting} color="success"> */}
          <Button type="submit" color="success">
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
