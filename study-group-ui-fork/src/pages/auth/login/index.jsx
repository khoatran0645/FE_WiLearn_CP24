import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../reducer";
import * as Yup from "yup";
import FormLabel from "src/components/FormLabel";
import TextField from "src/components/TextField";
import Button from "src/components/Button";
import { publicRoutes } from "src/common/constants";
import ForgotPassword from "src/auth/ForgotPassword";

const validationSchema = Yup.object({
  usernameOrEmail: Yup.string().required("Xin hãy điền tên đăng nhập"),
  password: Yup.string().required("Xin hãy nhập mật khẩu."),
});

const LoginPage = () => {
  const { userInfo, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgotPasswordRef = useRef();

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
      navigate(publicRoutes.root);
    }
  }, [userInfo]);

  const openForgotPasswordModal = () => {
    forgotPasswordRef.current.openModal();
  };

  return (
    <Box
      sx={{
        width: 1,
        height: "100vh",
        px: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        letterSpacing: "2px",
        backgroundColor: "background.main",
      }}
    >
      <ForgotPassword ref={forgotPasswordRef} />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ width: 1, maxWidth: "450px" }}
      >
        <Typography variant="h4" align="center" mb={4}>
          ĐĂNG NHẬP
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <FormControl fullWidth>
            <FormLabel>Tên Đăng Nhập/Email</FormLabel>
            <TextField
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
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Mật Khẩu</FormLabel>
            <TextField
              name="password"
              type={"password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "24px" }}>
          <MuiLink
            underline="hover"
            sx={{ cursor: "pointer" }}
            onClick={openForgotPasswordModal}
          >
            Quên mật khẩu?
          </MuiLink>
        </Box>

        <Button type="submit" sx={{ mt: "32px" }} variant="contained" fullWidth>
          {!loading ? "Đăng Nhập" : <CircularProgress />}
        </Button>

        <Box sx={{ display: "flex", justifyContent: "center", mt: "24px" }}>
          <MuiLink
            component={Link}
            to={publicRoutes.register}
            underline="hover"
          >
            Đăng Kí Tài Khoản
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
