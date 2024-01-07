import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

const RequireAuth = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const allowAccess = true;

  const goBack = () => navigate(-1);

  return (
    <>
      {allowAccess ? (
        <Outlet />
      ) : userInfo?.token ? (
        // prevent "flashing" of conditional for false case when rendering component
        // by checking userInfo and return null component
        <Box m="20px">
          <Typography variant="h5" fontWeight="bold">
            Không có quyền truy cập
          </Typography>
          <br />
          <Typography variant="p">Bạn không có quyền vào trang này</Typography>
          <Box>
            <Button variant="outlined" onClick={goBack} color="inherit">
              Quay Lại
            </Button>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

RequireAuth.propTypes = {
  allowedPermissions: PropTypes.arrayOf(PropTypes.string)
};

RequireAuth.defaultProps = {
  allowedPermissions: []
};

export default RequireAuth;
