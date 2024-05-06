//export const BE_URL = "https://www.groupstudy.somee.com";
// export const BE_URL = "https://we-learn.somee.com";
 export const BE_URL = "http://localhost:8000";
// export const BE_URL = "http://localhost:5000";
// link to swagger api: "https://www.groupstudy.somee.com/swagger/index.html";

export const API_SIGNIN_URL = "/api/Auth/Login";
export const API_GOOGLE_SIGNIN_URL = "/api/Auth/Login/Google/Access-Token";
export const API_SIGNUP_URL = "/api/Auth/Register/Student";
export const API_GET_USER_INFO = "/api/Accounts/profile";
export const API_UPDATE_PASSWORD = "/api/Accounts/{id}/Password";
export const API_UPDATE_PROFILE = "/api/Accounts/{id}";
export const API_LIST_STUDENT_PARENT = "/api/Accounts/Students";

export const API_GET_SUBJECT_LISTS = "/api/Subjects";
export const API_CREATE_SUBJECT = "/api/Subjects?name={name}";

export const API_CREATE_GROUP = "/api/Groups";
export const API_GROUP_JOINED = "/api/Groups/Join";
export const API_MEETING_PARENT = "api/Meetings/Children";
export const API_GET_GROUP_LEAD = "/api/Groups/Lead";
export const API_GET_LIST_CLASS = "/api/Classes";
export const API_SEARCH_STUDENT =
  "/api/Accounts/search?search={search}&groupId={groupId}";
export const API_INVITE_STUDENT = "/api/GroupMembers/Invite";
export const API_GET_STUDENT_INVITES = "/api/GroupMembers/Invite/Student";
export const API_ACCEPT_INVITATION =
  "/api/GroupMembers/Invite/{inviteId}/Accept";
export const API_DECLINE_INVITATION =
  "/api/GroupMembers/Invite/{inviteId}/Decline";
export const API_GET_REVIEW_INFO = "/api/Reviews/Meeting/{meetingId}";
export const API_START_REVIEW = "/api/Reviews/Start?meetingId={meetingId}";
export const API_END_REVIEW = "/api/Reviews/End?meetingId={meetingId}";
export const API_VOTE = "/api/Reviews/Vote";
export const API_GET_LEAD_GROUP_INFO = "/api/Groups/Lead/{groupId}";
export const API_GET_GROUP_MEMBER = "/api/Groups/Member";
export const API_GET_MEMBER_GROUP_INFO = "/api/Groups/Member/{groupId}";
export const API_UPDATE_GROUP_INFO = "/api/Groups/{groupId}";
export const API_ADD_GROUP = "/api/studyGroup/add";

export const API_GET_GROUP_NOT_JOIN = "/api/Groups/NotJoined";

export const API_GET_MEMBER_BY_GROUP_ID = "/api/GroupMembers/Group/{groupId}";
export const API_GET_ROOM_BY_GROUP_ID = "/api/studyGroup/{groupId}/room";
export const API_SCHEDULE_MEETING = "/api/Meetings/Schedule";
export const API_MEETING_NOW = "/api/Meetings/Instant";

export const API_SEARCH_GROUP =
  "/api/Groups/Search?search={keyword}&newGroup=true";
export const API_SEARCH_GROUP_CODE =
  "/api/Groups/Search/Code?search={keyword}&newGroup=true";
export const API_REQUEST_JOIN_GROUP = "/api/GroupMembers/Request";
export const API_GET_REQUEST_FORM_LIST =
  "/api/GroupMembers/Request/Group/{groupId}";
export const API_ACCEPT_JOIN_REQUEST =
  "api/GroupMembers/Request/{requestId}/Accept";
export const API_DECLINE_JOIN_REQUEST =
  "api/GroupMembers/Request/{requestId}/Decline";
export const API_GET_REVIEWS_MEETING = "/api/Reviews/Meeting/{meetingId}";

//Student stats
export const API_STUDENTS_STATS = "/api/Stats";
export const API_PARENTS_STATS = "/api/Accounts/Students";
export const API_PAST_MEETINGS = "/api/Meetings/Past/Student";

//Student Setting
// export const API_PARENT_SETTINGS = "/api/Accounts/Parents";
// export const API_REMOVE_PARENT = "/api/Accounts/Superise";
// export const API_PARENT_WAITING = "/api/Accounts/Supervise/Student";
// export const API_ACCEPT_PARENT = "/api/Accounts/Superise";
// export const API_DECLINE_PARENT = "/api/Accounts/Superise";

//Parents setting
// export const API_ACCEPT_STUDENT = "/api/Accounts/Supervise";
// export const API_SEARCH_STUDENT_BY_PARENTS = "/api/Accounts/search";
export const API_MEETING_REPEAT = "/api/Meetings/Mass-schedule";

//Documents
export const GET_LIST_DOCUMENTS_BY_GROUP =
  "/api/DocumentFiles/api/Document/Get/{groupId}";
export const CREATE_DOCUMENT =
  "/api/DocumentFiles/api/Document/Upload?groupId={groupId}&accountId={accountId}";
export const CHECK_FILE =
  "/api/DocumentFiles/api/Document/AproveOrReject?documentId={docId}&groupId={groupId}&check={check}";
// export const DELETE_DOCUMENT = "/delete-file";

// Auth
export const API_FORGOT_PASSWORD = "/api/Accounts/Password/Reset?email={email}";

//Lessons
export const API_YOUR_MEETINGS = "/api/Meetings/All/Student";
export const DELETE_MEMBER = "/api/GroupMembers/Group";

//DELETE MEETING
export const API_DELETE_MEETING = "/api/Meetings/Schedule";
export const API_UPDATE_MEETING = "/api/Meetings/Schedule/{id}";

// discussion
export const API_UPLOAD_DISCUSSION =
  "/api/Discussion/Upload?accountId={accountId}&groupId={groupId}";
export const API_UPLOAD_DISCUSSION_FILE = "/api/Discussion/Upload/File";
export const API_GET_DISCUSSION_BY_GROUP_ID = "/api/Discussion/Get/{groupId}";
export const API_GET_DISCUSSION_BY_ID =
  "/api/Discussion/GetByDiscussionId?dicussionId={discussionId}";

// discussion answer
export const API_GET_ANSWER_BY_DISCUSSION_ID =
  "/api/AnswerDiscussion/Get?discussionId={discussionId}";
export const API_POST_ANSWER_DISCUSSION =
  "/api/AnswerDiscussion/Upload?accountId={accountId}&discussionId={discussionId}&Content={content}";

// personal stats
export const API_GET_PERSONAL_STATS = "/api/Stats/Account/{userId}/{time}";
export const API_GET_MORE_PERSONAL_STATS =
  "/api/Stats/ForStudentInMonths/{userId}";

// group stats
export const API_GET_GROUP_STATS = "/api/Stats/Group/{groupId}/{time}";
export const API_GET_MORE_GROUP_STATS =
  "/api/Stats/ForGroupInMonths?groupId={groupId}";

// reports
export const API_GET_REPORTS = "/api/Reports";
export const API_CREATE_REPORTS = "/api/Reports/SendReport";
export const API_RESOLVED_REPORTS =
  "/api/Reports?reportId={id}&isApproved={isApproved}";
export const API_GET_NEW_REPORTS = "/api/Reports/Unresolve";

//leave group
export const API_LEAVE_GROUP = "/api/GroupMembers/LeaveGroup?groupId={groupId}";

// export const publicRoutes = {
//   root: "/",
//   login: "/login",
//   pageNotFound: "/404",
//   register: "/sign-up",
//   forgotPassword: "/forgot-password",
//   resetPassword: "/resetPassword",
// };

// export const privateRoutes = {
//   studyGroup: "/groups",
//   studyGroupDetail: "/groups/:groupId",
//   schedule: "/schedule",
//   settings: "/settings",
//   app: "/app",
//   room: "/room/:id",
//   meeting: "/groups/:groupId/meeting/:meetingId",
//   studentStats: "/student/stats",
//   studentDocuments: "/student/documents",
//   whiteboard: "/groups/:groupId/meeting/:meetingId/whiteboard",
//   study: "/study",
// };

// export const MEETING_TYPE = {
//   PAST: "PAST",
//   LIVE: "LIVE",
//   SCHEDULE: "SCHEDULE",
// };

// export const TOP_BAR_HEIGHT = 64;

// export const drawerWidth = 300;
