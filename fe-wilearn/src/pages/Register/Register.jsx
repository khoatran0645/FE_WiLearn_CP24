import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Thực hiện logic đăng ký tại đây
      // Ví dụ: kiểm tra và lưu thông tin tài khoản

      // Giả sử có một hàm API đăng ký trả về một đối tượng người dùng
      const response = await registerUser(username, password);

      // Kiểm tra nếu đăng ký thành công
      if (response.success) {
        alert('Đăng ký thành công!');
        // Chuyển hướng đến trang đăng nhập
        navigate('/');
      } else {
        alert('Đăng ký không thành công. Thử lại.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Có lỗi xảy ra. Thử lại sau.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
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
                    onChange={(e) => setUsername(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );

 // Giả định hàm API đăng ký
async function registerUser(username, password) {
    try {
      // Gửi yêu cầu đăng ký đến máy chủ hoặc dịch vụ đăng ký
      const response = await fetch('https://example.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      // Kiểm tra nếu yêu cầu đăng ký thành công (status code 200-299)
      if (response.ok) {
        // Phân tích kết quả JSON
        const result = await response.json();
  
        // Trả về kết quả từ máy chủ (ví dụ: thông tin người dùng mới)
        return result;
      } else {
        // Xử lý lỗi nếu yêu cầu đăng ký không thành công
        console.error('Đăng ký không thành công:', response.statusText);
        throw new Error('Đăng ký không thành công');
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu đăng ký:', error);
      throw new Error('Lỗi khi gửi yêu cầu đăng ký');
    }
  }  
}

export default Register;