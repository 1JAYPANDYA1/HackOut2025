import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <h1>Authentication Area</h1>
      <Outlet />
    </div>
  );
}
