import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <nav>
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Outlet />
    </div>
  );
}
