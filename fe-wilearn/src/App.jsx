import HomePage from "./pages/Home/HomePage";
import SignIn from "./pages/Signin/SigninPage";
import { Navigate, useRoutes } from "react-router-dom";
import Register from "./pages/Register/Register";
import ErrorPage from "./pages/ErrorPage";
import EmptyLayout from "./layouts/EmptyLayout";
import MainLayout from "./layouts/MainLayout";
import MeetingPage from "./pages/Meeting/MeetingPage";
import GuestLayout from "./layouts/GuestLayout";
import LandingPage from "./pages/Landing/LandingPage";
import Groups from "./components/Groups";

export default function App() {
  const routes = useRoutes([
    {
      //start of the app, change to Landing page when done
      path: "/",
      index: true,
      element: <Navigate to="/landing" />,
      errorElement: <ErrorPage />,
    },
    {
      //landing page
      path: "/",
      element: <GuestLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "landing",
          element: <LandingPage />,
        },
      ],
    },
    {
      //use Empty layout, public route
      path: "/",
      element: <EmptyLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "signin",
          element: <SignIn />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      // use Main Layout, protected route
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "home",
          element: <HomePage />,
          children: [
            {
              index: true,
              element: <Groups />,
            },
          ],
        },
        {
          path: "meeting",
          element: <MeetingPage />,
        },
      ],
    },
  ]);
  return routes;
}
