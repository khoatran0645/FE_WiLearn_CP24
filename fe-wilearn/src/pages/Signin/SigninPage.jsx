import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { checkLogin } from "../../app/reducer/userReducer";

const defaultTheme = createTheme();
const validationSchema = Yup.object({
  usernameOrEmail: Yup.string().required("Xin hãy điền tên đăng nhập"),
  password: Yup.string().required("Xin hãy nhập mật khẩu."),
});

export default function SignIn() {
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    // Kiểm tra thông tin đăng nhập, ví dụ: nếu username và password là 'admin'
    if (username === "user@gmail.com" && password === "123456") {
      // Đăng nhập thành công, chuyển hướng đến trang Home
      navigate("/home");
    } else {
      alert("Đăng nhập không thành công. Thử lại.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
    console.log("userInfo", userInfo);
    if (userInfo?.token) {
      navigate("/home");
    }
  }, [userInfo]);

  return (
    <Grid
      style={{
        backgroundImage: `url(https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-042.jpg)`,
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
                  formik.touched.usernameOrEmail && formik.errors.usernameOrEmail
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
                error={formik.touched.password && Boolean(formik.errors.password)}
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
                sx={{ mt: 3, mb: 2, backgroundImage: "linear-gradient(to left, #00b4db, #0083b0)" }}
                // onClick={handleLogin}
              >
                {!loading ? "Sign In" : <CircularProgress />}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Grid>
  );
}
