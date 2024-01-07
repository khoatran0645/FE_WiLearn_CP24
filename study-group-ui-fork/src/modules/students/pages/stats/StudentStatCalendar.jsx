import { Box } from '@mui/material';
import { Calendar } from 'antd';
import React, { useRef, useState } from 'react';
import CalendarDetail from './Modal/CalendarDetail';
import dayjs from 'dayjs';

const DATETIME_FORMAT = 'YYYY-MM';

const StudentStatCalendar = () => {
  const calendarModalRef = useRef();
  const [dateTime, setDateTime] = useState('');

  const onChangeCalendar = (value) => {
    const convertDateTime = dayjs(value).format(DATETIME_FORMAT);
    setDateTime(convertDateTime);
    calendarModalRef.current.openModal();
  };

  return (
    <Box>
      <CalendarDetail ref={calendarModalRef} dateTime={dateTime} />
      <Calendar onChange={onChangeCalendar} />
    </Box>
  );
};

export default StudentStatCalendar;
