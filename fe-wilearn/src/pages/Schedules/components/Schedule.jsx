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
const localizer = momentLocalizer(moment);

function Schedule() {
  dayjs.extend(advancedFormat);
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

  return (
    <Grid>
      <Grid container paddingTop={2}>
        <Grid xs={6} item justifyContent={"flex-start"}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Meetings
          </Typography>
        </Grid>
        <Grid xs={6} item>
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"flex-end"}
            paddingRight={6}
          >
            <MeetingNowButton />
          </Stack>
        </Grid>
      </Grid>
      {/* ongoing meeting */}
      <Grid
        xs={12}
        container
        justifyContent={"flex-start"}
        sx={{ overflow: "auto" }}
      >
        <Grid xs={12}>
          <Typography variant="h6">Ongoing meeting</Typography>
        </Grid>
        <Grid xs={12}>
          <Stack direction="row" spacing={1}>
            <Card
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
                    Expect:{" "}
                    {dayjs(new Date())
                      .subtract(1, "hour")
                      .format("DD-MM-YYYY HH:mm")}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Happen: {dayjs(new Date()).format("DD-MM-YYYY HH:mm")}
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
                    Expect:{" "}
                    {dayjs(new Date())
                      .subtract(1, "hour")
                      .format("DD-MM-YYYY HH:mm")}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Happen: {dayjs(new Date()).format("DD-MM-YYYY HH:mm")}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Status: Can join now
                  </Typography>
                  <JoinMeetingButton />
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Grid>
        {/* upcoming meeting */}
        <Grid xs={12}>
          <Typography variant="h6">Upcoming meeting</Typography>
        </Grid>
        <Grid xs={12}>
          <Stack direction="row" spacing={1}>
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
                    Expect:{" "}
                    {dayjs(new Date())
                      .add(1, "hour")
                      .format("DD-MM-YYYY HH:mm")}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Happen:{" "}
                    {dayjs(new Date())
                      .add(2, "hour")
                      .format("DD-MM-YYYY HH:mm")}
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
                    Expect:{" "}
                    {dayjs(new Date())
                      .add(5, "hour")
                      .format("DD-MM-YYYY HH:mm")}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Happen:{" "}
                    {dayjs(new Date())
                      .add(10, "hour")
                      .format("DD-MM-YYYY HH:mm")}
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
          </Stack>
        </Grid>
      </Grid>

      <Grid xs={11.5} paddingTop={3} paddingBottom={2}>
        {/* <HistoryMeeting /> */}
      </Grid>
      <Grid container paddingLeft={5}>
        <Grid item xs={6} sx={{ textAlign: "left" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Schedule
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
            style={{ margin: "50px" }}
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
