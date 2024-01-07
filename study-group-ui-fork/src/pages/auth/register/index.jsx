import {
  Box,
  CircularProgress,
  FormControl,
  Link as MuiLink,
  Typography,
  MenuItem,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../reducer";
import * as Yup from "yup";
import FormLabel from "src/components/FormLabel";
import TextField from "src/components/TextField";
import Button from "src/components/Button";
import { publicRoutes } from "src/common/constants";
import moment from "moment";
import CustomDatePicker from "src/components/CustomDatePicker";
// import { Select } from 'antd';

const validationSchema = Yup.object({
  username: Yup.string().required("Xin hãy nhập tên đăng nhập."),
  email: Yup.string().required("Xin hãy nhập Email."),
  password: Yup.string().required("Xin hãy nhập Mật Khẩu."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Xác nhận mật Khẩu không trùng khớp"
  ),
  fullName: Yup.string().required("Xin hãy nhập Tên Đầy Đủ."),
  phone: Yup.string().required("Xin hãy nhập Số Điện Thoại."),
  // schhool: Yup.string().required('Xin hãy nhập tên trường.'),
  dateOfBirth: Yup.string().required("Xin hãy nhập ngày sinh."),
});

const RegisterPage = () => {
  const { userInfo, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      classId: 6,
      phone: "",
      schhool: "",
      role: "Student",
      isStudent: true,
      dateOfBirth: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await dispatch(register(values));
    },
  });
  const classes = [
    {
      id: 6,
      name: "Lớp 6",
    },
    {
      id: 7,
      name: "Lớp 7",
    },
    {
      id: 8,
      name: "Lớp 8",
    },
    {
      id: 9,
      name: "Lớp 9",
    },
    {
      id: 10,
      name: "Lớp 10",
    },
    {
      id: 11,
      name: "Lớp 11",
    },
    {
      id: 12,
      name: "Lớp 12",
    },
  ];

  useEffect(() => {
    if (userInfo) {
      navigate(publicRoutes.root);
    }
  }, [userInfo]);

  const handleChangeDateOfBirth = (e) => {
    let newDate = null;
    if (e) {
      newDate = e.format();
    }
    formik.setFieldValue("dateOfBirth", newDate);
  };

  return (
    <Box
      sx={{
        width: 1,
        minHeight: "100vh",
        px: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: "50px",
        letterSpacing: "2px",
        backgroundColor: "background.main",
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ width: 1, maxWidth: "450px" }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "bodyText.main",
          }}
        >
          ĐĂNG KÍ
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <FormControl fullWidth>
            <FormLabel>Tên Đăng Nhập</FormLabel>
            <TextField
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Email</FormLabel>
            <TextField
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Họ tên</FormLabel>
            <TextField
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Mật Khẩu</FormLabel>
            <TextField
              type={"password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Xác Nhận Mật Khẩu</FormLabel>
            <TextField
              type={"password"}
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Số Điện Thoại</FormLabel>
            <TextField
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
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
          <FormControl fullWidth>
            <FormLabel>Tôi là</FormLabel>
            <Select
              value={formik.values.isStudent}
              name="isStudent"
              onChange={formik.handleChange}
            >
              <MenuItem value={true}>Học sinh</MenuItem>
              <MenuItem value={false}>Phụ huynh</MenuItem>
            </Select>
          </FormControl>
          {formik.values.isStudent && (
            <>
              <FormControl fullWidth>
                <FormLabel>Trường</FormLabel>
                <TextField
                  name="schhool"
                  value={formik.values.schhool}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.schhool && Boolean(formik.errors.schhool)
                  }
                  helperText={formik.touched.schhool && formik.errors.schhool}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel>Lớp</FormLabel>
                <Select
                  value={formik.values.classId}
                  name="classId"
                  onChange={formik.handleChange}
                >
                  {classes.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          {/* <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Tôi là</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={formik.values.isStudent}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="Student" control={<Radio />} label="Học sinh" />
              <FormControlLabel value="Parent" control={<Radio />} label="Phụ huynh" />
              <FormControlLabel value="true" control={<Radio />} label="Học sinh" />
              <FormControlLabel value="false" control={<Radio />} label="Phụ huynh" />
            </RadioGroup>
          </FormControl> */}
        </Box>

        <Button type="submit" sx={{ mt: "32px" }} variant="contained" fullWidth>
          {!loading ? "Đăng ký" : <CircularProgress />}
        </Button>

        <Box sx={{ display: "flex", justifyContent: "center", mt: "24px" }}>
          <MuiLink component={Link} to={publicRoutes.login} underline="hover">
            Quay lại trang đăng nhập
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
