import { Box, CircularProgress, FormControl, Typography } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "src/components/Button";
import CustomDatePicker from "src/components/CustomDatePicker";
import FormLabel from "src/components/FormLabel";
import TextField from "src/components/TextField";
import * as Yup from "yup";
import { changeProfile } from "./reducer";

const validationSchema = Yup.object({});

const convertData = (data) => {
  const { id, fullName, phone, dateOfBirth, schhool } = data;
  return {
    id,
    fullName,
    phone,
    dateOfBirth,
    schhool,
  };
};

const UpdateProfileForm = () => {
  const { loading } = useSelector((state) => state.settings);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: userInfo
      ? convertData(userInfo)
      : {
          id: userInfo?.id,
          fullName: "",
          phone: "",
          schhool: "",
          dateOfBirth: "",
        },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const response = dispatch(changeProfile({ data: values, id: values.id }));
      response;
    },
  });

  const handleChangeDateOfBirth = (e) => {
    let newDate = null;
    if (e) {
      newDate = e.format();
    }
    formik.setFieldValue("dateOfBirth", newDate);
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ width: 1, maxWidth: "450px" }}
    >
      <Typography variant="h4" mb={3}>
        Cập nhật thông tin
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <FormControl fullWidth>
          <FormLabel>Tên đầy đủ</FormLabel>
          <TextField
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Số điện thoại</FormLabel>
          <TextField
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Trường</FormLabel>
          <TextField
            name="schhool"
            value={formik.values.schhool || "THCS Nguyen Thi Minh Khai"}
            onChange={formik.handleChange}
            error={formik.touched.schhool && Boolean(formik.errors.schhool)}
            helperText={formik.touched.schhool && formik.errors.schhool}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Ngày sinh</FormLabel>
          <CustomDatePicker
            name="dateOfBirth"
            onChange={handleChangeDateOfBirth}
            value={
              formik.values.dateOfBirth
                ? moment(formik.values.dateOfBirth)
                : null
            }
          />
        </FormControl>
      </Box>

      <Button type="submit" sx={{ mt: "32px" }} variant="contained">
        {!loading ? "Cập nhật hồ sơ" : <CircularProgress />}
      </Button>
    </Box>
  );
};

export default UpdateProfileForm;
