import { Alert, Box, CircularProgress, FormControl, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/Button';
import FormLabel from 'src/components/FormLabel';
import TextField from 'src/components/TextField';
import * as Yup from 'yup';
import { changePassword } from './reducer';

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Nhập mật khẩu hiện tại.'),
  password: Yup.string().required('Nhập mật khẩu mới.'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Xác Nhận Mật Khẩu không khớp.')
});

const UpdatePasswordForm = () => {
  const { loading } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      id: userInfo?.id,
      oldPassword: '',
      password: '',
      confirmPassword: ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const response = await dispatch(changePassword({ data: values, id: values.id }));
      if (response.type === changePassword.fulfilled.type) {
        setSuccess('Cập nhật mật khẩu thành công');
        setError('');
      } else {
        setError('Đổi mật khẩu thất bại!!!');
        setSuccess('');
      }
    }
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: 1, maxWidth: '450px' }}>
      <Typography variant="h4" mb={3}>
        Đổi mật khẩu
      </Typography>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <br />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FormControl fullWidth>
          <FormLabel>Mật khẩu cũ</FormLabel>
          <TextField
            type={'password'}
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Mật khẩu mới</FormLabel>
          <TextField
            type={'password'}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Xác nhận mật khẩu mới</FormLabel>
          <TextField
            type={'password'}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </FormControl>
      </Box>

      <Button type="submit" sx={{ mt: '32px' }} variant="contained">
        {!loading ? 'Đổi mật khẩu' : <CircularProgress />}
      </Button>
    </Box>
  );
};

export default UpdatePasswordForm;
