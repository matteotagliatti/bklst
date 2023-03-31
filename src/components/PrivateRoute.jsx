import { Navigate } from "react-router-dom";

export default function PrivateRoute({ user, children }) {
  const auth = user;
  return auth ? <>{children}</> : <Navigate to="/sign-in" />;
}
