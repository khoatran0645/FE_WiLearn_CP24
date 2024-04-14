import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { register } from "./../../app/reducer/userReducer/userActions";
import moment from "moment";

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

function Register() {
  const { userInfo, loading } = useSelector((state) => state.auth || {});
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phone: "",
      dateOfBirth: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await dispatch(register(values));
      if (response.success) {
        setRegisterSuccess(true);
        console.log(registerSuccess);
      }
    },
  });
  useEffect(() => {
    if (userInfo) {
      navigate("/signin");
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
    <Grid
      style={{
        backgroundImage: `url(https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-042.jpg)`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <ThemeProvider theme={createTheme()}>
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
            <Box component="form" noValidate sx={{ mt: 3 }}>
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
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
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
                    helperText={
                      formik.touched.fullName && formik.errors.fullName
                    }
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
                    autoFocus
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
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
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
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    id="dob"
                    autoComplete="bday"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChangeDateOfBirth}
                    value={
                      formik.values.dateOfBirth
                        ? moment(formik.values.dateOfBirth)
                        : null
                    }
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
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {registerSuccess && (
        <Typography variant="body1" color="success">
          Đăng ký thành công! Vui lòng đăng nhập vào tài khoản của bạn.
        </Typography>
      )}
    </Grid>
  );
}

export default Register;
