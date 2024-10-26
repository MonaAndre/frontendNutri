import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { SuccessReg } from "./pages/SuccessReg";
import { UserProfile } from "./pages/UserProfile";
import { Suspense } from "react";
import { Spinner } from "./components/Spinner";
import { ProtectedRoute } from "./components/ProtectedRoute";


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
            path: "", 
            element: <UserProfile />,
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
    ],
  },
]);
