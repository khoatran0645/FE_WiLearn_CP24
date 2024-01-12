import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Stack, Typography } from '@mui/material';

const InviteComponent = (props) => {
  const { key, data, actions } = props;
  return (
    <Box
      sx={{
        backgroundColor: 'background.main',
        borderRadius: '12px',
        padding: '24px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '18px'
      }}
    >
      <Grid container>
        {Object.keys(data).map((key) => (
          <Grid key={key} item xs={6}>
            <Typography>
              <strong>{key}: </strong>
              {data[key]}
            </Typography>
          </Grid>
        ))}
        {/* <Grid key={key} item xs={6}>
          <Typography>
            <strong>Mã số học sinh: </strong>
            {data['ID']}
          </Typography>
        </Grid>
        <Grid key={key} item xs={6}>
          <Typography>
            <strong>Họ tên: </strong>
            {data['HoTen']}
          </Typography>
        </Grid>
        <Grid key={key} item xs={6}>
          <Typography>
            <strong>Tên tài khoản: </strong>
            {data['Username']}
          </Typography>
        </Grid>
        <Grid key={key} item xs={6}>
          <Typography>
            <strong>Email: </strong>
            {data['Email']}
          </Typography>
        </Grid>
        <Grid key={key} item xs={6}>
          <Typography>
            <strong>Lớp: </strong>
            {data['Class']}
          </Typography>
        </Grid>
        <Grid key={key} item xs={6}>
          <Typography>
            <strong>Trường: </strong>
            {data['School']}
          </Typography>
        </Grid> */}
      </Grid>
      <Stack spacing={2} direction="row">
        {actions}
      </Stack>
    </Box>
  );
};

InviteComponent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    fullName: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string
  }),
  actions: PropTypes.any
};

export default InviteComponent;
