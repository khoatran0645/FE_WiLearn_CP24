import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import 'react-datetime/css/react-datetime.css';
import { TextField } from '@mui/material';

export default function Schedule() {
  const localizer = momentLocalizer(moment);
  const [hovered, setHover] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = 'auto'; // Bật lại scroll khi đóng popup
  };

  const [events, setEvents] = useState([
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
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setSelectedSlot(null);
    setNewEventTitle('');
    setSelectedStartTime(null);
    setSelectedEndTime(null);
  };

  const handleCreateEvent = () => {
    if (newEventTitle && selectedSlot && selectedStartTime && selectedEndTime) {
      const newEvent = {
        title: newEventTitle,
        start: new Date(selectedSlot.start.getFullYear(), selectedSlot.start.getMonth(), selectedSlot.start.getDate(), selectedStartTime.getHours(), selectedStartTime.getMinutes()),
        end: new Date(selectedSlot.end.getFullYear(), selectedSlot.end.getMonth(), selectedSlot.end.getDate(), selectedEndTime.getHours(), selectedEndTime.getMinutes()),
      };
      setEvents([...events, newEvent]);
      handleModalClose();
      closeModal();
    }
  };

  const buttonHoverStyleSave = {
    backgroundColor: '#008000',
    border: 'none',
    color: 'white',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '8px 15px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginLeft: '22px',
    transition: 'background-color 0.3s ease',
    ...(hovered && buttonHoverStyleSave)
  };

  const buttonHoverStyle = {
    backgroundColor: '#666666',
    border: 'none',
    color: 'white',
  };

  const closeButtonStyle = {
    backgroundColor: '#808080',
    border: 'none',
    color: 'white',
    padding: '8px 15px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginTop: '50px',
    transition: 'background-color 0.3s ease',
    marginLeft: '120px',
    ...(hovered && buttonHoverStyle)
  };

  return (
    <div style={{ maxWidth: '1200px', marginLeft: '20px' }}>
    <h1>My Schedule</h1>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      selectable
      onSelectSlot={handleSelectSlot}
    />

    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Create Event Modal"
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          zIndex: 1000,
        },
        content: {
          width: '400px',
          height: '250px',
          margin: 'auto',
          marginTop: '50px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
>
        <div style={{ fontFamily: 'sans-serif' }}>
    <h3>Create Event</h3>
  </div>
    <label style={{ marginTop: '20px' }}>
      Event's name
      <input
        style={{ marginLeft: '20px' }}
        type="text"
        value={newEventTitle}
        onChange={(e) => setNewEventTitle(e.target.value)}
      />
    </label>
  <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
    <TextField
      label="Start Time"
      type="time"
      value={selectedStartTime ? selectedStartTime.toTimeString().split(' ')[0] : ''}
      onChange={(e) => setSelectedStartTime(new Date(`2000-01-01T${e.target.value}:00`))}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
    />
    <span style={{ margin: '0 20px' }}>to</span>
    <TextField
      label="End Time"
      type="time"
      value={selectedEndTime ? selectedEndTime.toTimeString().split(' ')[0] : ''}
      onChange={(e) => setSelectedEndTime(new Date(`2000-01-01T${e.target.value}:00`))}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
    />
  </div>
        <div>
          <button
            style={buttonStyle}
            onMouseEnter={() => { setHover(true); }}
            onMouseLeave={() => { setHover(false); }}
            onClick={handleCreateEvent}
          >
            Save
          </button>
          <button
            style={closeButtonStyle}
            onMouseEnter={() => { setHover(true); }}
            onMouseLeave={() => { setHover(false); }}
            onClick={handleModalClose}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
