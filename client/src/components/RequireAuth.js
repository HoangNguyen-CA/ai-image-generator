import { Navigate, Outlet, useOutletContext } from "react-router-dom";
function RequireAuth() {
  const { accessToken } = useOutletContext();

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet context={{ accessToken }} />;
}

export default RequireAuth;
