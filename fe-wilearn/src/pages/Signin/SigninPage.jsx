import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  checkLogin,
  setLoginError,
  resetPassword,
} from "../../app/reducer/userReducer";
import { toast } from "react-toastify";

const defaultTheme = createTheme();
const validationSchema = Yup.object({
  usernameOrEmail: Yup.string().required("Xin hãy điền tên đăng nhập"),
  password: Yup.string().required("Xin hãy nhập mật khẩu."),
});

export default function SignIn() {
  const [open, setOpen] = useState(false);
  const { userInfo, loading, loginError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(checkLogin(values));
    },
  });

  useEffect(() => {
    if (userInfo?.token) {
      navigate("/home");
    }
    if (loginError) {
      toast.error(loginError);
      dispatch(setLoginError(null));
    }
  }, [userInfo, loginError]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleForgotPassword = (email) => {
    // console.log(email);
    dispatch(resetPassword(email))
      .then(() => {
        toast.success("Reset Password successfully");
        navigate("/signin");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Grid
      style={{
        backgroundImage: `url('/backgrounds.jpg')`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main", marginTop: "100px" }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              // onSubmit={handleSubmit}
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                // name="email"
                autoComplete="email"
                autoFocus
                // onChange={(e) => setUsername(e.target.value)}
                name="usernameOrEmail"
                value={formik.values.usernameOrEmail}
                onChange={formik.handleChange}
                error={
                  formik.touched.usernameOrEmail &&
                  Boolean(formik.errors.usernameOrEmail)
                }
                helperText={
                  formik.touched.usernameOrEmail &&
                  formik.errors.usernameOrEmail
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                // onChange={(e) => setPassword(e.target.value)}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                name="rememberMe"
                value={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundImage: "linear-gradient(to left, #00b4db, #0083b0)",
                }}
                // onClick={handleLogin}
              >
                {!loading ? "Sign In" : <CircularProgress />}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#" onClick={handleClickOpen}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  component: "form",
                  onSubmit: (event) => {
                    event.preventDefault();
                    const form = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(form.entries());
                    const email = formJson.email;
                    handleForgotPassword(email);
                    handleClose();
                  },
                }}
              >
                <DialogTitle>Forgot your password</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please enter your email to reset your password.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Submit</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Grid>
  );
}
