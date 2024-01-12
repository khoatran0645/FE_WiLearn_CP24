import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import App from "./App";
import { privateRoutes, publicRoutes } from "./common/constants";
import PrivateRoute from "./components/PrivateRoute";
import RequireAuth from "./components/RequiredAuth";
import { RoomProvider } from "./context/roomContext";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import PageNotFound from "./pages/pageNotFound";
import SchedulePage from "./pages/schedule";
import Setting from "./pages/settings";
import StudyGroup from "./pages/studyGroup";
import GroupDetail from "./pages/studyGroup/groupDetail";
import Meeting from "./pages/studyGroup/meeting";
import { Room } from "./pages/studyGroup/meeting/components/Room";
import StudentStat from "./pages/students/StudentStat";
import WhiteBoard from "./pages/studyGroup/meeting/whiteboard/whiteboard";
import ParentStudy from "./pages/studyGroup/groupDetail/ParentStudies";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <RoomProvider>
            <PrivateRoute />
          </RoomProvider>
        }
        path={publicRoutes.root}
      >
        <Route index element={<Navigate to={privateRoutes.studyGroup} />} />
        <Route element={<RequireAuth />}>
          <Route element={<StudyGroup />} path={privateRoutes.studyGroup} />
          <Route
            element={<GroupDetail />}
            path={privateRoutes.studyGroupDetail}
          />
          <Route element={<Setting />} path={privateRoutes.settings} />
          <Route element={<Meeting />} path={privateRoutes.meeting} />
          <Route element={<SchedulePage />} path={privateRoutes.schedule} />
          <Route element={<App />} path={privateRoutes.app} />
          <Route element={<Room />} path={privateRoutes.room} />
          <Route element={<StudentStat />} path={privateRoutes.studentStats} />
          <Route element={<ParentStudy />} path={privateRoutes.study} />
          <Route element={<WhiteBoard />} path={privateRoutes.whiteboard} />
        </Route>
      </Route>

      <Route element={<PageNotFound />} path={publicRoutes.pageNotFound} />
      <Route element={<LoginPage />} path={publicRoutes.login} />
      <Route element={<RegisterPage />} path={publicRoutes.register} />
      <Route
        path="*"
        element={<Navigate to={publicRoutes.pageNotFound} replace />}
      />
    </>
  )
);

export default router;
