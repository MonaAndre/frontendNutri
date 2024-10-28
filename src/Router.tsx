import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { SuccessReg } from "./pages/SuccessReg";
import { UserProfile } from "./pages/UserProfile";
import { Suspense } from "react";
import { Spinner } from "./components/Spinner";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserSettings } from "./pages/UserSettings";
import { SuccessDeleteUser } from "./pages/SuccessDeleteUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/userStartPage",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute />
          </Suspense>
        ),
        children: [
          {
            path: "/userStartPage/userProfile",  // Fullständig väg för att matcha navigate
            element: <UserProfile />,
          },
          {
            path: "/userStartPage/userSettings",  // Fullständig väg för att matcha navigate
            element: <UserSettings />,
          },
        ],
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<Spinner />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Spinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/successReg",
        element: (
          <Suspense fallback={<Spinner />}>
            <SuccessReg />
          </Suspense>
        ),
      },
      {
        path: "/successDeleteUser",
        element: (
          <Suspense fallback={<Spinner />}>
            <SuccessDeleteUser />
          </Suspense>
        ),
      },
    ],
  },
]);
