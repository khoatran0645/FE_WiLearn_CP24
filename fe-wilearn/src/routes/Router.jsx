import EmptyLayout from "../layouts/EmptyLayout";
import MainLayout from "../layouts/MainLayout";
// import MeetingPage from "../pages/Meeting/MeetingPage";
// import GuestLayout from "../layouts/GuestLayout";

import LandingPage from "../pages/Landing/LandingPage";
import HomePage from "../pages/Home/HomePage";
import SignIn from "../pages/Signin/SigninPage";
import { Navigate, useRoutes } from "react-router-dom";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage";

import Groups from "../pages/Groups/Groups";
import Members from "../pages/Groups/Members";
import Discussion from "../pages/Discussion/components/Discussion";
import GroupLayout from "../layouts/GroupLayout";
import Schedule from "../pages/Schedules/components/Schedule";
import Statistics from "../pages/Statistic/components/Statistics";
import StudyDocs from "../components/StudyDocs";
import GroupSettings from "../components/GroupSettings";
import DiscussionDetail from "../pages/Discussion/components/DiscussionDetail";
import UserProfile from "./../components/UserProfile";
import SearchPage from "./../pages/SearchGr/components/SearchPage";
import { RoomProvider } from "../pages/MeetingUI/context/roomContext";
import Meeting from "../pages/MeetingUI/Meeting";
import WhiteBoard from "../pages/MeetingUI/components/Whiteboard";

// import { lazy } from "react";

// const HomePage = lazy(() => import("../pages/Home/HomePage"));
// const Groups = lazy(() => import("../pages/Groups/Groups"));
// const SignIn = lazy(() => import("../pages/Signin/SigninPage"));
// const Register = lazy(() => import("../pages/Register/Register"));
// const Members = lazy(() => import("../pages/Groups/Members"));
// const Discussion = lazy(() => import("../pages/Discussion/components/Discussion"));
// const LandingPage = lazy(() => import("../pages/Landing/LandingPage"));
// const Schedule = lazy(() => import("../pages/Schedules/components/Schedule"));
// const Statistics = lazy(() => import("../pages/Statistic/components/Statistics"));
// const StudyDocs = lazy(() => import("../components/StudyDocs"));
// const GroupSettings = lazy(() => import("../components/GroupSettings"));
// const DiscussionDetail = lazy(() => import("../pages/Discussion/components/DiscussionDetail"));
// const UserProfile = lazy(() => import("../components/UserProfile"));
// const SearchPage = lazy(() => import("../pages/SearchGr/components/SearchPage"));
// const Meeting = lazy(() => import("../pages/MeetingUI/Meeting"));

export default function Router() {
  const routes = useRoutes([
    {
      //start of the app
      path: "/",
      index: true,
      element: <Navigate to="/landing" />,
      errorElement: <ErrorPage />,
    },
    {
      //landing page
      path: "/",
      element: <EmptyLayout />,
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
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "home",
          index: true,
          element: <HomePage />,
        },
        {
          path: "groups",
          element: <EmptyLayout />,
          children: [
            {
              path: "",
              index: true,
              element: <Groups />,
            },
            {
              path: "search",
              element: <SearchPage />,
            },
          ],
        },
        {
          path: "statistics",
          element: <Statistics />,
        },
        {
          path: "schedules",
          element: <Schedule />,
        },
        {
          path: "profile",
          element: <UserProfile />,
        },
        {
          path: "search",
          element: <SearchPage />,
        },
        {
          path: "groups/:groupId/meetings/:meetingId",
          element: (
            <RoomProvider>
              {/* <MeetingPage /> */}
              <Meeting />
            </RoomProvider>
          ),
        },
        {
          path: "groups/:groupId/meetings/:meetingId/whiteboard",
          element: <WhiteBoard/>,
        },
        {
          path: "groups/:groupId",
          element: <GroupLayout />,
          children: [
            {
              index: true,
              element: <Members />,
            },
            {
              path: "members",
              element: <Members />,
            },
            {
              path: "discussions",
              element: <Discussion />,
            },
            {
              path: "discussions/:discussionId",
              element: <DiscussionDetail />,
            },
            {
              path: "meetings",
              element: <EmptyLayout />,
              children: [{ path: "", index: true, element: <Schedule /> }],
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
            // {
            //   path: "meetings/:meetingId",
            //   element: <MeetingPage />,
            // },
          ],
        },
      ],
    },
  ]);
  return routes;
}
