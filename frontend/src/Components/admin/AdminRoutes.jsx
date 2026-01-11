import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/home" replace />;
  if (user.role !== "admin") return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default AdminRoutes;
