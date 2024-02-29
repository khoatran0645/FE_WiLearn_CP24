import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Landing/Home";
import SignIn from "./pages/Login/SignIn";
import Register from "./pages/Register/Register";
import ErrorPage from "./pages/ErrorPage";
import MemberList from "../src/components/Members";
import Discussion from "./components/Discussion";
import Schedule from "./components/Schedule";
import StudyDocs from "./components/StudyDocs";
import Statistics from "./components/Statistics";
import Settings from "./components/Settings";
import Groups from "./components/Groups";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {index: true, element: <Groups />},
      {
        path: "group",
        element: <Groups />,
      },
      {
        path: "members",
        element: <MemberList />,
      },
      {
        path: "discussion",
        element: <Discussion />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "docs",
        element: <StudyDocs />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
