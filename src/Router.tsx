import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { SuccessReg } from "./pages/SuccessReg";

// import { Suspense } from "react";
// import { Spinner } from "../components/Spinner";

// Skapa routern med olika vägar
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Grundläggande layout som innehåller navigering och Outlet
    children: [
      {
        path: "/", // Home route
        element: <Home />,
      },
      {
        path: "/register", // Register route
        element: <Register />,
      },
      {
        path: "/login", // Login route
        element: <Login />,
      },
      {
        path: "/successReg", // Login route
        element: <SuccessReg />,
      },
    ],
  },
]);
