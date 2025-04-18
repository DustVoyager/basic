import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import Chart from "../pages/Chart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/chart",
    element: <Chart />,
  },
]);
