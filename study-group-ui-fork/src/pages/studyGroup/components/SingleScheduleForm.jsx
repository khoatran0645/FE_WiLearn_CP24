/* eslint-disable no-unused-vars */
import {
  FormControl,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormLabel from "src/components/FormLabel";
import TextField from "src/components/TextField";
import moment from "moment";
import { getGroupInfo, scheduleMeeting } from "../reducer";
import { useDispatch } from "react-redux";
import CustomDatePicker from "src/components/CustomDatePicker";
import CustomTimePicker from "src/components/CustomTimePicker";
import Button from "src/components/Button";

// const validationSchema = Yup.object({
//   name: Yup.string().required('Require information.'),
//   scheduleStartTime: Yup.string().required('Require information.'),
//   scheduleEndTime: Yup.string().required('Require information.')
// });

const date = [
  {
    id: 2,
    value: "T2",
    label: "T2",
  },
  {
    id: 3,
    value: "T3",
    label: "T3",
  },
  {
    id: 4,
    value: "T4",
    label: "T4",
  },
  {
    id: 5,
    value: "T5",
    label: "T5",
  },
  {
    id: 6,
    value: "T6",
    label: "T6",
  },
  {
    id: 7,
    value: "T7",
    label: "T7",
  },
  {
    id: 8,
    value: "CN",
    label: "CN",
  },
];

const SingleScheduleForm = (props) => {
  const { onClose, groupId, meetingInfo } = props;
  const dispatch = useDispatch();
  const [repeat, setRepeat] = useState(false);

  const formik = useFormik({
    initialValues: meetingInfo || {
      groupId: parseInt(groupId),
      name: "",
      date: "",
      scheduleStartTime: "",
      scheduleEndTime: "",
    },
    // validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (meetingInfo) {
        // TODO: handle re schedule meeting
      } else {
        const date = moment(values.date).toISOString();
        const scheduleStartTime = moment(values.scheduleStartTime).format(
          "hh:mm:ss"
        );
        const scheduleEndTime = moment(values.scheduleEndTime).format(
          "hh:mm:ss"
        );
        const response = await dispatch(
          scheduleMeeting({
            ...values,
            date,
            scheduleStartTime,
            scheduleEndTime,
          })
        );
        if (response.type === scheduleMeeting.fulfilled.type) {
          formik.resetForm();
          dispatch(getGroupInfo(groupId));
          onClose();
        }
      }
    },
  });

  const handleChangeField = (field, value) => {
    formik.setFieldValue(field, value);
  };

  const handleChangeDate = (e) => {
    let newDate = null;
    if (e) {
      newDate = e.format();
    }
    handleChangeField("date", newDate);
  };

  const handleChangeScheduleStart = (e) => {
    let newDate = null;
    if (e) {
      newDate = e.format();
    }
    handleChangeField("scheduleStartTime", newDate);
  };

  const handleChangeScheduleEnd = (e) => {
    let newDate = null;
    if (e) {
      newDate = e.format();
    }
    handleChangeField("scheduleEndTime", newDate);
  };

  return (
    <Box>
      <Box
        onSubmit={formik.handleSubmit}
        component={"form"}
        display="flex"
        mt={"24px"}
        flexDirection="column"
        rowGap={"32px"}
      >
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
        {!repeat && (
          <FormControl fullWidth>
            <FormLabel>Ngày</FormLabel>
            <CustomDatePicker
              name="date"
              onChange={handleChangeDate}
              value={formik.values.date ? moment(formik.values.date) : null}
            />
          </FormControl>
        )}
        <FormControl fullWidth>
          <FormLabel>Thời gian bắt đầu</FormLabel>
          <CustomTimePicker
            ampm={false}
            name="scheduleStartTime"
            onChange={handleChangeScheduleStart}
            value={
              formik.values.scheduleStartTime
                ? moment(formik.values.scheduleStartTime)
                : null
            }
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Thời gian kết thúc</FormLabel>
          <CustomTimePicker
            ampm={false}
            name="scheduleEndTime"
            onChange={handleChangeScheduleEnd}
            value={
              formik.values.scheduleEndTime
                ? moment(formik.values.scheduleEndTime)
                : null
            }
          />
        </FormControl>
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={repeat}
                onChange={(e) => setRepeat(e.target.checked)}
              />
            }
            label="Lặp lại"
          />
        </FormControl>
        {repeat && (
          <FormControl fullWidth>
            <FormGroup row>
              {date.map((sbj) => (
                <FormControlLabel
                  key={sbj.id}
                  name="date"
                  control={
                    <Checkbox
                      defaultChecked={formik.values.date}
                      value={sbj.id}
                      onChange={formik.handleChange}
                    />
                  }
                  label={sbj.label}
                  labelPlacement="end"
                />
              ))}
            </FormGroup>
          </FormControl>
        )}
        {repeat && (
          <FormControl fullWidth>
            <FormLabel>Ngày bắt đầu</FormLabel>
            <CustomDatePicker
              name="dateStart"
              onChange={handleChangeScheduleEnd}
              value={
                formik.values.dateStart ? moment(formik.values.dateStart) : null
              }
            />
          </FormControl>
        )}
        {repeat && (
          <FormControl fullWidth>
            <FormLabel>Ngày kết thúc</FormLabel>
            <CustomDatePicker
              name="dateEnd"
              onChange={handleChangeScheduleEnd}
              value={
                formik.values.dateEnd ? moment(formik.values.dateEnd) : null
              }
            />
          </FormControl>
        )}
        <Box
          sx={{
            display: "flex",
            gap: "12px",
          }}
        >
          <Button variant="contained" onClick={onClose}>
            Huỷ
          </Button>
          <Button type="submit" variant="contained">
            Lên kế hoạchh
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

SingleScheduleForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  groupId: PropTypes.string,
  meetingInfo: PropTypes.object,
};

SingleScheduleForm.defaultProps = {
  open: false,
  groupId: null,
};

export default SingleScheduleForm;
