import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../hooks/hooks";

export const OnlyUnAuthRoute = () => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const auth = useAppSelector((state) => state.auth.isAuth);
  return auth ? (
    <Navigate to={fromPage} replace />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
