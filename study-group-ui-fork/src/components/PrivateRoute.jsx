import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';
import MainLayout from './MainLayout';
import { useNavigate } from 'react-router-dom';
import { publicRoutes } from 'src/common/constants';
import { getUserInfo } from 'src/pages/auth/reducer';

const PrivateRoute = () => {
  const { loading, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      dispatch(getUserInfo()).then((response) => {
        if (response.type === getUserInfo.rejected.type) {
          navigate(publicRoutes.login);
        }
      });
    }
  }, [userInfo]);

  return loading ? (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <CircularProgress />
    </Grid>
  ) : (
    <MainLayout />
  );
};

export default PrivateRoute;
