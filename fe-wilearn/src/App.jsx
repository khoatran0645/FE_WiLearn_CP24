import HomePage from "./pages/Home/HomePage";
import SignIn from "./pages/Login/SignIn";
import { Navigate, useRoutes } from "react-router-dom";
import Register from "./pages/Register/Register";
import ErrorPage from "./pages/ErrorPage";
import EmptyLayout from "./layouts/EmptyLayout";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  const routes = useRoutes([
    {
      //start of the app, change to Landing page when done
      path: "/",
      index: true,
      element: <Navigate to="/login" />,
      errorElement: <ErrorPage />,
    },
    {
      //use Empty layout
      path: "/",
      element: <EmptyLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <SignIn />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      // use Main Layout
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "home",
          element: <HomePage />,
        },
      ],
    },
  ]);
  return routes;
}
