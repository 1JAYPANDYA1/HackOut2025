import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Common style for rounded buttons
  const buttonStyle = {
    borderRadius: "20px",        // round corners
    backgroundColor: "#1565c0",  // darker blue
    textTransform: "none",       // keep text normal
    marginLeft: 1,
    "&:hover": {
      backgroundColor: "#0d47a1" // darker on hover
    }
  };

  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Company Portal
        </Typography>

        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/about" color="inherit">
          About
        </Button>
        <Button component={Link} to="/contact-us" color="inherit">
          Contact Us
        </Button>

        {!isLoggedIn ? (
          <Button component={Link} to="/login" color="inherit" sx={buttonStyle}>
            Login/Signup
          </Button>
        ) : (
          <Button onClick={handleLogout} color="inherit" sx={buttonStyle}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
