import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
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
import { PrivateRoute } from "./components/common/PrivateRoute";
import { Toaster } from "react-hot-toast";

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
        path: "people",
        element: <People />,
      },
      {
        path: "people/:id",
        element: <PersonDetails />,
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
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: "search",
        element: <SearchResults />,
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
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#0f172a",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>,
);
