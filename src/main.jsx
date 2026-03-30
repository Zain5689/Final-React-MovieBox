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
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "tv",
        element: <TvWatch />,
      },
      {
        path: "people",
        element: <People />,
      },
      {
        path: "movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "wishlist",
        element: <WishList />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
