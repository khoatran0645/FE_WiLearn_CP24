import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Container,
  CssBaseline,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../app/reducer/userReducer/userActions";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);
  console.log("loading", loading);
  console.log("error", error);
  const validationSchema = Yup.object({
    username: Yup.string().required("Xin hãy nhập tên đăng nhập."),
    email: Yup.string().required("Xin hãy nhập Email.").email("Email không hop le."),
    password: Yup.string().required("Xin hãy nhập Mật Khẩu."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Xác nhận mật Khẩu không trùng khớp"
    ),
    fullName: Yup.string().required("Xin hãy nhập Tên Đầy Đủ."),
    phone: Yup.string().required("Xin hãy nhập Số Điện Thoại."),
    dateOfBirth: Yup.string().required("Xin hãy nhập ngày sinh."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phone: "",
      career: "Student",
      dateOfBirth: dayjs(),
    },
    validationSchema,
    onSubmit: (values) => {
      //   console.log(values);
      dispatch(register(values));
      if(error === null) {
        navigate("/signin");
      }else{
        toast.error(error);
        return
      }
      
    },
  });

  //   useEffect(() => {
  //     if (userInfo) {
  //       navigate("/signin");
  //     }
  //   }, [userInfo]);
  return (
    <Grid
      style={{
        backgroundImage: `url(https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-042.jpg)`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Typography component="h1" variant="h5" sx={{ marginTop: "40px" }}>
            Register
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ marginTop: "20px" }}
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="family-name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone"
                type="tel"
                id="phone"
                autoComplete="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                slotProps={{ textField: { fullWidth: true } }}
                disableFuture
                label="Date of Birth"
                name="dateOfBirth"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundImage: "linear-gradient(to left, #00b4db, #0083b0)",
            }}
          >
            {!loading ? "Register" : <CircularProgress />}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signin">Already have an account? Sign In</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}
