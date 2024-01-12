import { FormControl, Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormLabel from 'src/components/FormLabel';
import TextField from 'src/components/TextField';
import moment from 'moment';
import { scheduleMeeting } from '../reducer';
import { useDispatch } from 'react-redux';
import CustomTimePicker from 'src/components/CustomTimePicker';
import CustomDatePicker from 'src/components/CustomDatePicker';

const validationSchema = Yup.object({
  name: Yup.string().required('Require information.'),
  schedulerStart: Yup.string().required('Require information.'),
  schedulerEnd: Yup.string().required('Require information.')
});

const dateOfWeek = [
  {
    id: 0,
    label: 'T2',
    value: 'T2'
  },
  {
    id: 1,
    label: 'T3',
    value: 'T3'
  },
  {
    id: 2,
    label: 'T4',
    value: 'T4'
  },
  {
    id: 3,
    label: 'T5',
    value: 'T5'
  },
  {
    id: 4,
    label: 'T6',
    value: 'T6'
  },
  {
    id: 7,
    label: 'T7',
    value: 'T7'
  },
  {
    id: 8,
    label: 'CN',
    value: 'CN'
  }
];

const DailyScheduleForm = (props) => {
  const { onClose, groupId, meetingInfo } = props;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: meetingInfo || {
      groupId: parseInt(groupId),
      name: '',
      date: '',
      schedulerStart: '',
      schedulerEnd: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (meetingInfo) {
        // TODO: handle re schedule meeting
      } else {
        const response = await dispatch(scheduleMeeting(values));
        if (response.type === scheduleMeeting.fulfilled.type) {
          formik.resetForm();
          onClose();
        }
      }
    }
  });

  const handleChangeField = (field, value) => {
    formik.setFieldValue(field, value);
  };

  const handleChangeScheduleStart = (e) => {
    let newDate = null;
    if (e) {
      newDate = e.format();
    }
    handleChangeField('date', newDate);
  };

  const handleChangeScheduleEnd = (e) => {
    let newDate = null;
    if (e) {
      newDate = e.format();
    }
    handleChangeField('schedulerEnd', newDate);
  };



  return (
    <Box>
      <Box component={'form'} display="flex" mt={'24px'} flexDirection="column" rowGap={'32px'}>
        <FormControl fullWidth>
          <FormLabel>Tên buổi học</FormLabel>
          <TextField
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Thời gian bắt đầu</FormLabel>
          <CustomTimePicker
            ampm={false}
            name="schedulerStart"
            onChange={handleChangeScheduleStart}
            value={formik.values.schedulerStart ? moment(formik.values.schedulerStart) : null}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Thời gian kết thúc</FormLabel>
          <CustomTimePicker
            ampm={false}
            name="schedulerEnd"
            onChange={handleChangeScheduleEnd}
            value={formik.values.schedulerEnd ? moment(formik.values.schedulerEnd) : null}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Ngày</FormLabel>
          <FormGroup row>
            {dateOfWeek.map((sbj) => (
              <FormControlLabel
                key={sbj.id}
                name="dates"
                control={<Checkbox value={sbj.value} />}
                label={sbj.label}
                labelPlacement="end"
              />
            ))}
          </FormGroup>
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Ngày bắt đầu</FormLabel>
          <CustomDatePicker
            name="dateStart"
            onChange={handleChangeScheduleEnd}
            value={formik.values.dateStart ? moment(formik.values.dateStart) : null}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Ngày kết thúc</FormLabel>
          <CustomDatePicker
            name="dateEnd"
            onChange={handleChangeScheduleEnd}
            value={formik.values.dateEnd ? moment(formik.values.dateEnd) : null}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

DailyScheduleForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  groupId: PropTypes.string,
  meetingInfo: PropTypes.object
};

DailyScheduleForm.defaultProps = {
  open: false,
  groupId: null
};

export default DailyScheduleForm;
