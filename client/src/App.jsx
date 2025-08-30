import { useState, useEffect } from "react";
import axios from "axios";
import CompanySingupForm from "./pages/CompanySignupForm";
import ex from "./components/ex";
import { Route, Routes } from "react-router-dom";

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
    <div >
        <Routes>
        <Route path="/" element={<ex />} />
        <Route path="/company-signup" element={<CompanySingupForm />} />
        </Routes>
    </div>
  );
}