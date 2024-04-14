import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Card,
  CardActionArea,
  Button,
  CardContent,
  Chip,
} from "@mui/material";
import { Calendar, momentLocalizer, Views as CalenderViews } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const localizer = momentLocalizer(moment);

function PersonalSchedule() {
  dayjs.extend(advancedFormat);
  const { meetings } = useSelector(state => state.user);
  // let { liveMeetings, scheduleMeetings } = groupInfo;
  let liveMeetings = [];
  let scheduleMeetings = [];
  let pastMeetings = [];
  if (meetings) {
    liveMeetings = meetings.live;
    scheduleMeetings = meetings.schedule;
    pastMeetings = meetings.past;
  }
  const liveMeetingsCal = liveMeetings.map(m => ({
    id: m.id,
    title: m.name,
    scheduleGroupId: m.scheduleGroupId,
    start: new Date(m.start),
    end: m.scheduleEnd ? new Date(m.scheduleEnd) : new Date(m.start),
    hasEnd: m.scheduleEnd ? true : false,
    canStart: true,
    state: "live"
  }))
  const scheduleMeetingsCal = scheduleMeetings.map(m => ({
    id: m.id,
    title: m.name,
    scheduleGroupId: m.scheduleGroupId,
    start: new Date(m.scheduleStart),
    end: m.scheduleEnd ? new Date(m.scheduleEnd) : new Date(m.start),
    hasEnd: m.scheduleEnd ? true : false,
    canStart: m.canStart,
    state: "schedule"
  }))
  const pastMeetingsCal = pastMeetings.map(m => ({
    id: m.id,
    title: m.name,
    scheduleGroupId: m.scheduleGroupId,
    start: new Date(m.scheduleStart),
    end: m.scheduleEnd ? new Date(m.scheduleEnd) : new Date(m.start),
    hasEnd: m.scheduleEnd ? true : false,
    canStart: m.canStart,
    state: "schedule"
  }))
  const schedule = [...liveMeetingsCal, ...scheduleMeetingsCal];

  const EventComponent = ({ event }) => {
    // const color=  "3px solid " +(
    const color = (
      event.state == 'live' ? "green"
        : event.canStart ? "orange" : "red"
    )
    return (
      <NavLink to={`/groups/${event.scheduleGroupId}/meetings`} style={{ textDecoration: "none" }}>
        <Box onClick={() => { }} style={{ backgroundColor: color }}>
          <Typography>{event.title}</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon sx={{ marginRight: 1 }} />
                {moment(event.start).format("HH:mm")}
                {event.hasEnd && (` - ${moment(event.end).format("HH:mm")}`)}
              </Box>
            </Typography>
          </Box>
        </Box>
      </NavLink>
    );
  };
  const eventStyleGetter = (event) => {
    var backgroundColor = (
      event.state == 'live' ? "green"
        : event.canStart ? "orange" : "red"
    )
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '10px',
      marginTop: '3px',
      opacity: 0.8,
      // color: 'black',
      // border: '0px',
      // display: 'block'
    };
    return {
      style: style
    };
  }

  // const addNewSchedule = (newSchedule) => {
  //   setSchedule([...schedule, newSchedule]);
  // };
  const LiveMeetingCard = (meeting) => {
    return (
      <Card
        key={meeting.id}
        sx={{ maxWidth: 345, minWidth: 345, border: `3px solid green` }}
      >
        
          <CardContent sx={{ textAlign: "left" }}>
            <Typography gutterBottom variant="h6">
              {meeting.name}
            </Typography>
            {/* <Chip label={meeting.subjects.map(s=>s.name).join(', ')} size="small" variant="filled" /> */}
            {meeting.subjects.map(s=>(
              <Chip label={s.name} size="small" variant="filled" />
            ))}
            <Typography variant="body1" color="text.secondary">
              Content: {meeting.content}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Group: {meeting.groupName}
            </Typography>
            {meeting.scheduleStart && (
              <Typography variant="body1" color="text.secondary">
                Expected: {moment(meeting.scheduleStart).format('DD/MM HH:mm')}
                {meeting.scheduleEnd && (
                  ` - ${moment(meeting.scheduleEnd).format('DD/MM HH:mm')}`
                )}
              </Typography>
            )}
            {meeting.start && (
              <Typography variant="body1" color="text.secondary">
                Happened: {moment(meeting.start).format('DD/MM HH:mm')}
                {meeting.end && (
                  ` - ${moment(meeting.end).format('DD/MM HH:mm')}`
                )}
              </Typography>
            )}
            {/* <Typography variant="body1" color="text.secondary">
              Status: Can join now
            </Typography> */}
            <Typography variant="body1" color="text.secondary">
              {meeting.countMember} people
            </Typography>
            <Grid container justifyContent="center" sx={{ paddingTop: "1rem" }}>
              <NavLink to={`/groups/${meeting.scheduleGroupId}/meetings`} style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#258f3b",
                    '&:hover': {
                      backgroundColor: "#258f3b"
                    },
                  }}
                >
                  Go to group
                </Button>
              </NavLink>
            </Grid>
          </CardContent>
        
      </Card>
    )
  }
  const ScheduleMeetingCard = (meeting) => {
    // alert(meeting.canStart);
    // const borderStyle = "3px solid orange" ;
    const borderStyle = "3px solid " +
      (meeting.canStart ? "orange" : "red")
    return (
      <Card
        key={meeting.id}
        sx={{ maxWidth: 345, minWidth: 345, border: borderStyle }}
      >
        
          <CardContent sx={{ textAlign: "left" }}>
            <Typography gutterBottom variant="h6">
              {meeting.name}
            </Typography>
            {/* <Chip label={meeting.subjects.map(s=>s.name).join(', ')} size="small" variant="filled" /> */}
            {meeting.subjects.map(s=>(
              <Chip label={s.name} size="small" variant="filled" />
            ))}
            <Typography variant="body1" color="text.secondary">
              Content: {meeting.content}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Group: {meeting.groupName}
            </Typography>
            {meeting.scheduleStart && (
              <Typography variant="body1" color="text.secondary">
                Expected: {moment(meeting.scheduleStart).format('DD/MM HH:mm')}
                {meeting.scheduleEnd && (
                  ` - ${moment(meeting.scheduleEnd).format('DD/MM HH:mm')}`
                )}
              </Typography>
            )}
            {meeting.start && (
              <Typography variant="body1" color="text.secondary">
                Happened: {moment(meeting.start).format('DD/MM HH:mm')}
                {meeting.end && (
                  ` - ${moment(meeting.end).format('DD/MM HH:mm')}`
                )}
              </Typography>
            )}
            <Typography variant="body1" color="text.secondary">
              Status: {meeting.canStart ? "Can start now" : "Cannot start"}
            </Typography>
            <Grid
              container
              justifyContent="center"
              sx={{ paddingTop: "1rem" }}
            >
              <Grid container justifyContent="center" sx={{ paddingTop: "1rem" }}>
                <NavLink to={`/groups/${meeting.scheduleGroupId}/meetings`} style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#258f3b",
                      '&:hover': {
                        backgroundColor: "#258f3b"
                      },
                    }}
                  >
                    Go to group
                  </Button>
                </NavLink>
              </Grid>
            </Grid>
          </CardContent>
        
      </Card>
    )
  }
  return (
    <Grid>
      {/* Live Meeting */}
      <Grid>
        {/* Header */}
        <Grid container paddingTop={2}>
          <Grid xs={6} item justifyContent={"flex-start"}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Live Meetings
            </Typography>
          </Grid>
          <Grid xs={6} item>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"} paddingRight={6}>
              {/* <MeetingNowButton groupId={groupInfo?.id} /> */}
            </Stack>
          </Grid>
        </Grid>
        {/* List */}
        <Grid
          xs={12}
          container
          justifyContent={"flex-start"}
          sx={{ overflow: "auto" }}
        >
          {liveMeetings?.length === 0 && (
            <Typography variant="h5">
              No meeting taking place yet
            </Typography>
          )}
          <Grid xs={12}>
            <Stack direction="row" spacing={1}>
              {liveMeetings.map((meeting => (LiveMeetingCard(meeting))))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      {/* Schedule Meeting */}
      <Grid>
        {/* Header */}
        <Grid container paddingTop={2}>
          <Grid xs={6} item justifyContent={"flex-start"}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Schedule Meetings
            </Typography>
          </Grid>
          <Grid xs={6} item>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"} paddingRight={5}>
            </Stack>
          </Grid>
        </Grid>
        {/* List */}
        <Grid
          xs={12}
          container
          justifyContent={"flex-start"}
          sx={{ overflow: "auto" }}
        >
          {scheduleMeetings?.length === 0 && (
            <Typography variant="h5">
              No meeting sheduled yet
            </Typography>
          )}
          <Grid xs={12}>
            <Stack direction="row" spacing={1}>
              {scheduleMeetings.map((meeting => (ScheduleMeetingCard(meeting))))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      <Grid xs={11.5} paddingTop={3} paddingBottom={2}>
        {/* <HistoryMeeting /> */}
      </Grid>
      {/* <Grid container paddingLeft={5}> */}
      <Grid container>
        <Grid item xs={6} sx={{ textAlign: "left" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Calendar
          </Typography>
        </Grid>
        <Grid xs={6} sx={{ textAlign: "right" }} paddingRight={5}>
        </Grid>
      </Grid>

      <Grid height={1000} paddingRight={5}>
        {/* <Box style={{ height: 800 }}> */}
        <Box style={{ height: 610 }}>
          <Calendar
            localizer={localizer}
            events={schedule}
            startAccessor="start"
            endAccessor="end"
            allDayMaxRows={2}
            popup={true}
            // showAllEvents={true}
            components={{
              event: EventComponent,
            }}
            eventPropGetter={eventStyleGetter}
            defaultView={CalenderViews.AGENDA}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default PersonalSchedule;
