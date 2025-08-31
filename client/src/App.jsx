import { Box, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/about";
import CompanySingupForm from "./pages/CompanySignupForm";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
axios.defaults.withCredentials = true;

export default function App() {
  const [csrfToken, setCsrfToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCsrf = async () => {
      const res = await axios.get("http://localhost:3000/csrf-token", {
        withCredentials: true,
      });
      setCsrfToken(res.data.csrfToken);

      axios.defaults.headers.post["X-CSRF-Token"] = res.data.csrfToken;
    };
    getCsrf();
  }, []);

  const login = async () => {
    const res = await axios.post("http://localhost:3000/login",
      { email, password },
      { headers: { "X-CSRF-Token": csrfToken } }
    );
    alert(res.data.message);
  };

  const me = async () => {
    try {
      const res = await axios.get("http://localhost:3000/me", {
        withCredentials: true,
      });
      alert(`Message: ${res.data.message}\nUserId: ${res.data.user.id}`);
      setUser(res.data.user);
    } catch (err) {
      alert("Not authenticated");
    }
  };

  const logout = async () => {
    await axios.post("http://localhost:3000/logout", {}, {
      headers: { "X-CSRF-Token": csrfToken }
    });
    setUser(null);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Navbar */}
    
      {/* Main Content */}
      <Container sx={{ flex: 1, py: 3 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/company-signup" element={<CompanySingupForm />} />
        </Routes>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}