import { Box, Typography } from "@mui/material";
import React from "react";

const PageNotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1">404</Typography>
    </Box>
  );
};

export default PageNotFound;
