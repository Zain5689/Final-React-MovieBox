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
import TvWatch from "./pages/TvWatch";
import UserPage from "./pages/UserPage";
import WishList from "./pages/wishList";
import Register from "./pages/Register";

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
        path: "tv",
        element: <TvWatch />,
        handle: { title: "TV Shows" },
      },
      {
        path: "people",
        element: <People />,
        handle: { title: "People" },
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
        element: <WishList />,
        handle: { title: "Wishlist" },
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
