// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

// Layout   
import Layout from "../layouts/Layout";

// Private Route
const PrivateRoute = ({ children }) => {
  const tokens = localStorage.getItem("tokens");
  const isAuthenticated = tokens ? true : false;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Private Route (with Layout) */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Route>



      </Routes>
    </Router>
  );
}
