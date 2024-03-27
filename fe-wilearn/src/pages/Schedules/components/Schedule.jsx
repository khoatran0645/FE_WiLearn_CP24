import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import JoinMeetingButton from "../../Meeting/JoinMeetingButton";
import StartMeetingButton from "../../Meeting/StartMeetingButton";
import UpdateMeetingButton from "./UpdateMeetingButton";
import HistoryMeeting from "../../Meeting/HistoryMeeting";
import MeetingNowButton from "./MeetingNowButton";
import CreateSchedule from "./CreateSchedule";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useSelector } from "react-redux";

const localizer = momentLocalizer(moment);

function Schedule() {
  dayjs.extend(advancedFormat);
  const { groupInfo } = useSelector(state => state.studyGroup);
  // let { liveMeetings, scheduleMeetings } = groupInfo;
  let liveMeetings=[];
  let scheduleMeetings=[];
  if(groupInfo){
    liveMeetings = groupInfo.liveMeetings;
    scheduleMeetings = groupInfo.scheduleMeetings;
  }
  const [schedule, setSchedule] = useState([
    {
      id: 1,
      title: "Math class",
      start: new Date(2024, 2, 18, 9, 0),
      end: new Date(2024, 2, 18, 11, 0),
    },
    {
      id: 2,
      title: "Chemistry class",
      start: new Date(2024, 2, 22, 14, 0),
      end: new Date(2024, 2, 22, 16, 0),
    },
  ]);

  const EventComponent = ({ event }) => {
    return (
      <Box>
        <Typography>{event.title}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon sx={{ marginRight: 1 }} />
              {moment(event.start).format("HH:mm")} -{" "}
              {moment(event.end).format("HH:mm")}
            </Box>
          </Typography>
        </Box>
      </Box>
    );
  };

  // const addNewSchedule = (newSchedule) => {
  //   setSchedule([...schedule, newSchedule]);
  // };
  const LiveMeetingCard = (meeting) => {
    return (
      <Card
        key={meeting.id}
        sx={{ maxWidth: 345, minWidth: 200, border: `3px solid green` }}
      >
        <CardActionArea>
          <CardContent sx={{ textAlign: "left" }}>
            <Typography gutterBottom variant="h6">
              {meeting.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Content: {meeting.content}
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
            <JoinMeetingButton meetingId={meeting.id} />
          </CardContent>
        </CardActionArea>
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
        key={meeting.id }
        sx={{ maxWidth: 345, minWidth: 200, border: borderStyle }}
      >
        <CardActionArea>
          <CardContent sx={{ textAlign: "left" }}>
            <Typography gutterBottom variant="h6">
              {meeting.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Content: {meeting.content}
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
              {meeting.canStart && (<StartMeetingButton meetingId={meeting.id} />)}
              <UpdateMeetingButton />
            </Grid>
          </CardContent>
        </CardActionArea>
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
              <MeetingNowButton />
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
          <Grid xs={12}>
            <Stack direction="row" spacing={1}>
              {liveMeetings.map((meeting => (LiveMeetingCard(meeting))))}
              {/* <Card
                key="1"
                sx={{ maxWidth: 345, minWidth: 200, border: "3px solid green" }}
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography gutterBottom variant="h6">
                      Meeting Kteam
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Content: Metaprogramming
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Expect: 29/02 10:34 - 11:19
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Happen: 29/02 10:49
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Status: Can join now
                    </Typography>
                    <JoinMeetingButton />
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card
                key="2"
                sx={{ maxWidth: 345, minWidth: 200, border: "3px solid orange" }}
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography gutterBottom variant="h6">
                      Java basic
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Content: Java basic for you
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Expect: 29/02 10:34 - 11:19
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Happen: 29/02 10:49
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Status: Can start now
                    </Typography>
                    <Grid
                      container
                      justifyContent="center"
                      sx={{ paddingTop: "1rem" }}
                    >
                      <StartMeetingButton />
                      <UpdateMeetingButton />
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card
                key="3"
                sx={{ maxWidth: 345, minWidth: 200, border: "3px solid red" }}
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography gutterBottom variant="h6">
                      Data Structures
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Content: Deep dive using C#
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Expect: 29/02 10:34 - 11:19
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Happen: 29/02 10:49
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Status: Cannot start
                    </Typography>
                    <Grid
                      container
                      justifyContent="center"
                      sx={{ paddingTop: "1rem" }}
                    >
                      <UpdateMeetingButton />
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card
                key="4"
                sx={{ maxWidth: 345, minWidth: 200, border: "3px solid green" }}
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography gutterBottom variant="h6">
                      Meeting Kteam
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Content: Metaprogramming
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Expect: 29/02 10:34 - 11:19
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Happen: 29/02 10:49
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Status: Can join now
                    </Typography>
                    <JoinMeetingButton />
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card
                key="5"
                sx={{ maxWidth: 345, minWidth: 200, border: "3px solid orange" }}
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography gutterBottom variant="h6">
                      Java basic
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Content: Java basic for you
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Expect: 29/02 10:34 - 11:19
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Happen: 29/02 10:49
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Status: Can start now
                    </Typography>
                    <Grid
                      container
                      justifyContent="center"
                      sx={{ paddingTop: "1rem" }}
                    >
                      <StartMeetingButton />
                      <UpdateMeetingButton />
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card> */}
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
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"} paddingRight={6}>
              <CreateSchedule />
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
          <Grid xs={12}>
            <Stack direction="row" spacing={1}>
              {scheduleMeetings.map((meeting => (ScheduleMeetingCard(meeting))))}

              {/* <Card
                key="1"
                sx={{ maxWidth: 345, minWidth: 200, border: "3px solid green" }}
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography gutterBottom variant="h6">
                      Meeting Kteam
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Content: Metaprogramming
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Expect: 29/02 10:34 - 11:19
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Happen: 29/02 10:49
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Status: Can join now
                    </Typography>
                    <JoinMeetingButton />
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card
                key="2"
                sx={{ maxWidth: 345, minWidth: 200, border: "3px solid orange" }}
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography gutterBottom variant="h6">
                      Java basic
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Content: Java basic for you
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Expect: 29/02 10:34 - 11:19
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Happen: 29/02 10:49
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Status: Can start now
                    </Typography>
                    <Grid
                      container
                      justifyContent="center"
                      sx={{ paddingTop: "1rem" }}
                    >
                      <StartMeetingButton />
                      <UpdateMeetingButton />
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card
                key="3"
                sx={{ maxWidth: 345, minWidth: 200, border: "3px solid red" }}
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography gutterBottom variant="h6">
                      Data Structures
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Content: Deep dive using C#
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Expect: 29/02 10:34 - 11:19
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Happen: 29/02 10:49
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Status: Cannot start
                    </Typography>
                    <Grid
                      container
                      justifyContent="center"
                      sx={{ paddingTop: "1rem" }}
                    >
                      <UpdateMeetingButton />
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card
                key="4"
                sx={{ maxWidth: 345, minWidth: 200, border: "3px solid green" }}
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography gutterBottom variant="h6">
                      Meeting Kteam
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Content: Metaprogramming
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Expect: 29/02 10:34 - 11:19
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Happen: 29/02 10:49
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Status: Can join now
                    </Typography>
                    <JoinMeetingButton />
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card
                key="5"
                sx={{ maxWidth: 345, minWidth: 200, border: "3px solid orange" }}
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography gutterBottom variant="h6">
                      Java basic
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Content: Java basic for you
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Expect: 29/02 10:34 - 11:19
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Happen: 29/02 10:49
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Status: Can start now
                    </Typography>
                    <Grid
                      container
                      justifyContent="center"
                      sx={{ paddingTop: "1rem" }}
                    >
                      <StartMeetingButton />
                      <UpdateMeetingButton />
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card> */}
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      <Grid xs={11.5} paddingTop={3} paddingBottom={2}>
        {/* <HistoryMeeting /> */}
      </Grid>
      <Grid container paddingLeft={5}>
        <Grid item xs={6} sx={{ textAlign: "left" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Calendar
          </Typography>
        </Grid>
        <Grid xs={6} sx={{ textAlign: "right" }} paddingRight={5}>
          <CreateSchedule />
        </Grid>
      </Grid>

      <Grid height={700}>
        <Box style={{ height: 600 }}>
          <Calendar
            localizer={localizer}
            events={schedule}
            startAccessor="start"
            endAccessor="end"
            // style={{ margin: "50px" }}
            components={{
              event: EventComponent,
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Schedule;
