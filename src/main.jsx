import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import NotFound404 from "./pages/NotFound404";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import People from "./pages/People";
import MovieDetails from "./pages/movieDetails";
import UserPage from "./pages/UserPage";
import WishList from "./pages/wishList";
import Register from "./pages/Register";
import SearchResults from "./pages/SearchResults";
import PersonDetails from "./pages/PersonDetails";
import { Navigate } from "react-router-dom";
import { useMovieStore } from "./store/useMovieStore";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useMovieStore((state) => state.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Movie />,
        handle: { title: "Movies - Movie App" },
      },
      {
        path: "login",
        element: <Login />,
        handle: { title: "Login" },
      },
      {
        path: "register",
        element: <Register />,
        handle: { title: "Register" },
      },

      {
        path: "people",
        element: <People />,
        handle: { title: "People" },
      },
      {
        path: "people/:id",
        element: <PersonDetails />,
        handle: { title: "PersonDetails" },
      },
      {
        path: "movie/:id",
        element: <MovieDetails />,
        handle: { title: "Movie Details" },
      },
      {
        path: "user",
        element: <UserPage />,
        handle: { title: "My Profile" },
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
        handle: { title: "Wishlist" },
      },
      {
        path: "search",
        element: <SearchResults />,
        handle: { title: "Search" },
      },
    ],
  },
  {
    path: "*",
    element: <NotFound404 />,
    handle: { title: "404 - Page Not Found" },
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
