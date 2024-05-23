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
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { checkLoginGoogle, checkLoginGoogleJWT } from "../../app/reducer/userReducer/userActions";
import axios from "axios";

const defaultTheme = createTheme();
const validationSchema = Yup.object({
  usernameOrEmail: Yup.string().required("Xin hãy điền tên đăng nhập"),
  password: Yup.string().required("Xin hãy nhập mật khẩu."),
});

export default function SignIn() {
  const [open, setOpen] = useState(false);
  const [ggProfile, setGgProfile] = useState();
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

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log('GG Login Success:', codeResponse)
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
            Accept: 'application/json'
          }
        }).then((res) => {
            console.log('gg profile: ', res)
            setGgProfile(res.data);
          }).catch((err) => console.log(err));
      dispatch(checkLoginGoogle(codeResponse.access_token))
    },
    onError: (error) => console.log('GG Login Failed:', error)
  });
  const googleLoginSuccess = (response) =>{
    console.log('googleLoginSuccess', response)
    dispatch(checkLoginGoogleJWT(response.credential))
  }
  const googleLoginError = (response) =>{
    console.log('googleLoginError:', response)
  }
  const logOut = () => {
    googleLogout();
  };

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
              sx={{ m: 1, bgcolor: "secondary.main", marginTop: "180px" }}
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
                id="my-login-btn"
                // onClick={handleLogin}
              >
                {!loading ? "Sign In" : <CircularProgress />}
              </Button>
              <Box alignItems="center" alignContent="center" width="100%">
                {/* <div class="g-signin2" ondata data-onsuccess={onGgSignIn}>abc xyz</div> */}
                  {/* {ggProfile && (
                    <div>
                      <img src={ggProfile.picture} alt="user image" />
                      <h3>User Logged in</h3>
                      <p>Name: {ggProfile.name}</p>
                      <p>Email Address: {ggProfile.email}</p>
                      <button onClick={logOut}>Log out</button>
                    </div>
                  )}                     */}
                  {/* <button onClick={() => login()}>Đăng nhập với Google 🚀 </button> */}
                  <GoogleLogin 
                    onSuccess={googleLoginSuccess} 
                    onError={googleLoginError} 
                    text="Đăng nhập với Google"
                    flow='implicit'
                    shape="pill"
                    // theme="filled_blue"
                    locale="en-us"
                    size="large"
                    auto_select={false}
                    logo_alignment="center"
                    width="10000px"
                    // style={{
                    //   alignContent:"center",
                    //   alignItems:"center",
                    //   width:"100%",
                    // }}
                  />
              </Box>
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
