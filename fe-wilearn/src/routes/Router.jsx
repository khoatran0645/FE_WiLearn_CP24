import HomePage from "../pages/Home/HomePage";
import SignIn from "../pages/Signin/SigninPage";
import { Navigate, useRoutes } from "react-router-dom";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage";
import EmptyLayout from "../layouts/EmptyLayout";
import MainLayout from "../layouts/MainLayout";
import MeetingPage from "../pages/Meeting/MeetingPage";
import GuestLayout from "../layouts/GuestLayout";
import LandingPage from "../pages/Landing/LandingPage";
import Groups from "../pages/Groups/Groups";
import Members from "../components/Members";
import Discussion from "../pages/Discussion/components/Discussion";
import GroupLayout from "../layouts/GroupLayout";
import Schedule from "../pages/Schedules/components/Schedule";
import Statistics from "../pages/Statistic/components/Statistics";
import StudyDocs from "../components/StudyDocs";
import GroupSettings from "../components/GroupSettings";
import DiscussionDetail from "../pages/Discussion/components/DiscussionDetail";
import UserProfile from './../components/UserProfile';

export default function Router() {
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
          errorElement: <ErrorPage />,
          children: [
            {
              path: "",
              index: true,
              element: <Groups />,
            },
            {
              path: "usersettings",
              element: <UserProfile />,
            },
            {
              path: "groups/:id",
              element: <GroupLayout />,
              errorElement: <ErrorPage />,
              children: [
                {
                  index: true,
                  element: <Members />,
                },
                {
                  path: "",
                  element: <Members />,
                },
                {
                  path: "discussions",
                  element: <Discussion />,
                },
                {
                  path: "discussionDetail",
                  element: <DiscussionDetail />,
                },
                {
                  path: "schedules",
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
                  path: "groupsettings",
                  element: <GroupSettings />,
                },
                {
                  path: "meetings",
                  element: <h1>Meetings list page with big calender</h1>,
                },
                {
                  path: "meetings/:meetingId",
                  element: <MeetingPage />,
                },
                {
                  path: "meetings/:meetingId",
                  element: <MeetingPage />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
  return routes;
}
