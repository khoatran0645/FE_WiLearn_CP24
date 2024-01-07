import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const CardGroup = (props) => {
  const { actions, data } = props;

  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        backgroundColor: "rgba(211,211,211, 0.5)",
        borderRadius: "12px",
        padding: "24px",
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          <Typography>
            <Typography component={"span"}>Tên nhóm: </Typography>
            {data?.name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <Typography component={"span"}>Số thành viên: </Typography>
            {data?.memberCount}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <Typography component={"span"}>Môn: </Typography>
            {data?.subjects?.join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <Typography component={"span"}>Lớp: </Typography>
            {data?.classId}
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {actions}
      </Box>
    </Box>
  );
};

CardGroup.propTypes = {
  actions: PropTypes.arrayOf(Object),
  data: PropTypes.shape(Object),
};

export default CardGroup;
