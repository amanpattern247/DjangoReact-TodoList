import { Outlet, Navigate } from "react-router-dom";
import AuthUser from "../pages/AuthUser";

const PrivateRoute = () => {
  const { isValidToken } = AuthUser();

  const token = localStorage.getItem("token");

  if (!isValidToken(token)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
