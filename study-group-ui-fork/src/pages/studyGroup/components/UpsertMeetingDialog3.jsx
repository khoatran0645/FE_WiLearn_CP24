import { DialogActions, DialogContent, FormControl, Box } from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import CustomDialogTitle from 'src/components/CustomDialogTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormLabel from 'src/components/FormLabel';
import Button from 'src/components/Button';
import TextField from 'src/components/TextField';
import moment from 'moment';
import { scheduleMeeting } from '../reducer';
import { useDispatch } from 'react-redux';
import CustomDatePicker from 'src/components/CustomDatePicker';
import CustomTimePicker from 'src/components/CustomTimePicker';

const validationSchema = Yup.object({
  name: Yup.string().required('Require information.'),
  schedulerStart: Yup.string().required('Require information.'),
  schedulerEnd: Yup.string().required('Require information.')
});

const ScheduleMeetingDialog = (props) => {
  const { onClose, open, groupId, meetingInfo } = props;
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
    <Dialog
      fullWidth
      sx={{ '& .MuiPaper-root': { borderRadius: '10px' } }}
      onClose={onClose}
      open={open}
    >
      <CustomDialogTitle onClose={onClose}>Lên lịch cho 1 buổi học nhóm</CustomDialogTitle>
      <DialogContent>
        <Box display="flex" mt={'24px'} flexDirection="column" rowGap={'32px'}>
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
            <FormLabel>Ngày</FormLabel>
            <CustomDatePicker
              name="date"
              onChange={handleChangeScheduleStart}
              value={formik.values.date ? moment(formik.values.date) : null}
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Huỷ
        </Button>
        <Button onClick={formik.submitForm} variant="contained">
          Lên kế hoạch
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ScheduleMeetingDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  groupId: PropTypes.string,
  meetingInfo: PropTypes.object
};

ScheduleMeetingDialog.defaultProps = {
  open: false,
  groupId: null
};

export default ScheduleMeetingDialog;
