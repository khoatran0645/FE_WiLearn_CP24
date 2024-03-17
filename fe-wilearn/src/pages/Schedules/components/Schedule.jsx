import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CreateEvent from './CreateEvent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const localizer = momentLocalizer(moment);

function Schedule() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Math class',
      start: new Date(2024, 2, 18, 9, 0),
      end: new Date(2024, 2, 18, 11, 0),
    },
    {
      id: 2,
      title: 'Chemistry class',
      start: new Date(2024, 2, 22, 14, 0),
      end: new Date(2024, 2, 22, 16, 0),
    },
  ]);

  const EventComponent = ({ event }) => {
    return (
      <Box>
        <Typography>{event.title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ marginRight: 1 }} />
              {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
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
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>Statistics</Typography>
      </Grid>
      <CreateEvent addNewEvent={addNewEvent} />
      <Grid height={700}>
      <Box style={{ height: 600 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ margin: '50px' }}
          components={{
            event: EventComponent
          }}
        />
      </Box>
      </Grid>
    </Grid>
  );
}

export default Schedule;
