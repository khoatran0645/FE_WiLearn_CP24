import React from "react";
import PropTypes from "prop-types";
import { Box, CircularProgress, Stack } from "@mui/material";
import CustomTitle from "./CustomTitle";

const CustomSection = (props) => {
  const { title, listItem, actions, footer, loading } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        overflow: "auto",
      }}
    >
      <CustomTitle>{title}</CustomTitle>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
          minWidth: "150vw",
        }}
      >
        <Stack spacing={2}>{actions?.map((a) => a)}</Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "32px",
            flex: 1,
            overflow: "auto",

            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {loading ? <CircularProgress /> : listItem.map((item) => item)}
        </Box>
      </Box>
      <Box>{footer}</Box>
    </Box>
  );
};

CustomSection.propTypes = {
  listItem: PropTypes.arrayOf(PropTypes.node),
  actions: PropTypes.arrayOf(PropTypes.node),
  loading: PropTypes.bool,
  footer: PropTypes.node,
  title: PropTypes.string,
};

CustomSection.defaultProps = {
  listItem: [],
};

export default CustomSection;
