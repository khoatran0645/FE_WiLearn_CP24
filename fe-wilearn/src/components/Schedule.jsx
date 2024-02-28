import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
export default function Schedule(){
    const localizer = momentLocalizer(moment);

  const events = [
    {
      title: 'Math Class',
      start: new Date(2024, 2, 1, 10, 0),
      end: new Date(2024, 2, 1, 12, 0),
    },
    {
      title: 'English Class',
      start: new Date(2024, 2, 2, 14, 0),
      end: new Date(2024, 2, 2, 16, 0),
    },
    {
      title: 'Science Class',
      start: new Date(2024, 2, 3, 13, 0),
      end: new Date(2024, 2, 3, 15, 0),
    },

  ];

  return (
    <div style={{maxWidth:'1200px', marginLeft:'20px'}}>
      <h1>My Schedule</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}