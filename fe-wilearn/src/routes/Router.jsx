import EmptyLayout from "../layouts/EmptyLayout";
import MainLayout from "../layouts/MainLayout";
// import MeetingPage from "../pages/Meeting/MeetingPage";
// import GuestLayout from "../layouts/GuestLayout";

import LandingPage from "../pages/Landing/LandingPage";
import HomePage from "../pages/Home/HomePage";
import SignIn from "../pages/Signin/SigninPage";
import { Navigate, useRoutes } from "react-router-dom";
// import Register from "../pages/Register/Register";
import RegisterPage from "../pages/Register/RegisterPage";
import ErrorPage from "../pages/ErrorPage";
import Groups from "../pages/Groups/Groups";
import Members from "../pages/Groups/Members";
import Discussion from "../pages/Discussion/components/Discussion";
import GroupLayout from "../layouts/GroupLayout";
import Schedule from "../pages/Schedules/components/Schedule";
import StudyDocs from "../components/StudyDocs";
import GroupSettings from "../components/GroupSettings";
import DiscussionDetail from "../pages/Discussion/components/DiscussionDetail";
import UserProfile from "./../components/UserProfile";
import SearchPage from "./../pages/SearchGr/components/SearchPage";
import { RoomProvider } from "../pages/MeetingUI/context/roomContext";
import Meeting from "../pages/MeetingUI/Meeting";
import WhiteBoard from "../pages/MeetingUI/components/Whiteboard";
import PersonalSchedule from "../pages/Schedules/components/PersonalSchedule";
import SearchCodePage from "../pages/SearchGr/components/SearchCodePage";
import AdminLayout from "../layouts/AdminLayout";
import ReportsPage from "../pages/Admin/ReportsPage";
import SubjectsPage from "../pages/Admin/SubjectsPage";

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
          element: <RegisterPage />,
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
            {
              path: "search/code",
              element: <SearchCodePage />,
            },
            {
              path: "search/code/:code",
              element: <SearchCodePage />,
            },
          ],
        },
        {
          path: "statistics",
          element: <PersonalStatistics />,
        },
        {
          path: "schedules",
          element: <PersonalSchedule />,
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
          element: <WhiteBoard />,
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
              element: <GroupStatistics />,
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
    {
      path: '/admin',
      element:(
        <AdminLayout> 
          {/* <h1>Admin</h1> */}
          {/* <ReportsPage/> */}
        </AdminLayout>
      ),
      // element: <h1>Admin</h1>,
      errorElement: <ErrorPage />,
      children:[
        {
          index: true,
          element: <ReportsPage/>
        },
        {
          path: 'reports',
          element: <ReportsPage/>
        },
        {
          path: 'subjects',
          element: <SubjectsPage/>
        }
      ]
    },
  ]);
  return routes;
}
