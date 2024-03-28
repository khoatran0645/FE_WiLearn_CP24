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
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
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
              path: "searchgroup",
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
          path: "usersettings",
          element: <UserProfile />,
        },
        {
          path: "searchgroup",
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
              children: [
                { path: "", index: true, element: <Schedule /> },
                
              ],
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
