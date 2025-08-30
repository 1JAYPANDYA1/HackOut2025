import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        py: 2,
        textAlign: "center",
        borderTop: "1px solid #ddd",
        mt: "auto"
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} My Company. All rights reserved.
      </Typography>
    </Box>
  );
}
