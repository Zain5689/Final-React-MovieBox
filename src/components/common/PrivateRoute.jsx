import { useMovieStore } from "@/store/useMovieStore";
import { Navigate } from "react-router";

export const PrivateRoute = ({ children }) => {
  const user = useMovieStore((state) => state.user);
  return user ? children : <Navigate to="/login" replace />;
};
