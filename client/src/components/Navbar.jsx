import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Company Portal
        </Typography>
        {/* Navigation Links */}
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/company-signup" color="inherit">
          Signup
        </Button>
      </Toolbar>
    </AppBar>
  );
}
