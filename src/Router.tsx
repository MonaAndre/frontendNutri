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
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/frontendNutri/",
    element: <Layout />,
    children: [
      {
        path: "/frontendNutri/userStartPage",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute />
          </Suspense>
        ),
        children: [
          {
            path: "/frontendNutri/userStartPage/userProfile", 
            element: <UserProfile />,
          },
          {
            path: "/frontendNutri/userStartPage/userSettings", 
            element: <UserSettings />,
          },
        ],
      },
      {
        path: "/frontendNutri/register",
        element: (
          <Suspense fallback={<Spinner />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/frontendNutri/login",
        element: (
          <Suspense fallback={<Spinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/frontendNutri/",
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/frontendNutri/successReg",
        element: (
          <Suspense fallback={<Spinner />}>
            <SuccessReg />
          </Suspense>
        ),
      },
      {
        path: "/frontendNutri/successDeleteUser",
        element: (
          <Suspense fallback={<Spinner />}>
            <SuccessDeleteUser />
          </Suspense>
        ),
      },
    ],
  },
]);
