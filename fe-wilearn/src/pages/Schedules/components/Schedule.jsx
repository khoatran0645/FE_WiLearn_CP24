import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Card,
  CardActionArea,
  CardContent
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateEvent from "./CreateEvent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import JoinMeetingButton from "../../Meeting/JoinMeetingButton";
import StartMeetingButton from "../../Meeting/StartMeetingButton";
import UpdateMeetingButton from "../../Meeting/UpdateMeetingButton";
import HistoryMeeting from "../../Meeting/HistoryMeeting";
import PlanningButton from "../components/PlanningButton";
import MeetingNowButton from "../../Meeting/MeetingNowButton";

const localizer = momentLocalizer(moment);

function Schedule() {
  const [events, setEvents] = useState([
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

  const addNewEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <Grid>
      <Grid paddingLeft={5}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Schedule
        </Typography>
      </Grid>
      <CreateEvent addNewEvent={addNewEvent} />
      <Grid height={700}>
        <Box style={{ height: 600 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ margin: "50px" }}
            components={{
              event: EventComponent,
            }}
          />
        </Box>
      </Grid>

      <Grid xs={12} paddingTop={2}>
        <Typography variant="h4" textAlign={"left"}>
          Meetings
        </Typography>
      </Grid>

      <Grid xs={2} container justifyContent={"center"}>
        <Stack spacing={1} justifyContent={"center"}>
          <PlanningButton />
          <MeetingNowButton />
        </Stack>
      </Grid>

      <Grid
        xs={10}
        container
        justifyContent={"flex-start"}
        sx={{ overflow: "auto" }}
      >
        <Grid xs={12}>
          <Stack direction="row" spacing={1}>
            <Card
              key="1"
              sx={{ maxWidth: 345, minWidth: 200, border: "3px solid green" }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography gutterBottom variant="h6">
                    Meeting name
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Content: on tap kiem tra Ly
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
                    Meeting name
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Content: on tap kiem tra Ly
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
                    Meeting name
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Content: on tap kiem tra Ly
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
          </Stack>
        </Grid>
      </Grid>
      <Grid xs={11.5} paddingTop={3}>
        <HistoryMeeting />
      </Grid>
    </Grid>
  );
}

export default Schedule;
