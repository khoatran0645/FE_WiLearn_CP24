import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  API_ACCEPT_INVITATION,
  API_ACCEPT_JOIN_REQUEST,
  API_ADD_GROUP,
  API_CREATE_GROUP,
  API_DECLINE_INVITATION,
  API_DECLINE_JOIN_REQUEST,
  API_GET_GROUP_LEAD,
  API_GET_GROUP_MEMBER,
  API_GET_LEAD_GROUP_INFO,
  API_GET_LIST_CLASS,
  API_GET_MEMBER_GROUP_INFO,
  API_GET_REQUEST_FORM_LIST,
  API_GET_ROOM_BY_GROUP_ID,
  API_GET_STUDENT_INVITES,
  API_GET_SUBJECT_LISTS,
  API_INVITE_STUDENT,
  API_MEETING_NOW,
  API_MEETING_PARENT,
  API_REQUEST_JOIN_GROUP,
  API_SCHEDULE_MEETING,
  API_SEARCH_GROUP,
  API_SEARCH_STUDENT,
  API_UPDATE_GROUP_INFO,
  API_UPLOAD_DISCUSSION,
} from "../../../constants";
// import mockStudyGroupService from "./mockStudyGroupService";
import { toast } from "react-toastify";
import axiosClient from "../../../services/axiosClient";
// import { API_GET_SUBJECT_LISTS } from "../../../constants";
// import { useNavigate } from 'react-router-dom';
// import * as RequestUtils from 'src/common/requestUtils';

// export const addNewGroup = createAsyncThunk(
//   "studyGroup/addNewGroup",
//   async ({ name }, { rejectWithValue }) => {
//     // Call API checkLogin
//     const submitData = { name };
//     return await mockStudyGroupService
//       .fetchAddNewGroup(API_ADD_GROUP, submitData)
//       .then((response) => response.data)
//       .catch((error) => {
//         return rejectWithValue(error.messageCode);
//       });
//   }
// );

// export const getRoomsByGroupId = createAsyncThunk(
//   "studyGroup/getRoomsByGroupId",
//   async ({ id }, { rejectWithValue }) => {
//     // Call API checkLogin
//     const submitData = { id };
//     return await mockStudyGroupService
//       .fetchGetRoomsByGroupId(API_GET_ROOM_BY_GROUP_ID, submitData)
//       .then((response) => response.data)
//       .catch((error) => {
//         return rejectWithValue(error.messageCode);
//       });
//   }
// );

export const getSubjectLists = createAsyncThunk(
  "studyGroup/getSubjectLists",
  async (_, { rejectWithValue }) => {
    return await axiosClient
      .get(API_GET_SUBJECT_LISTS)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const getMeetingList = createAsyncThunk(
  "studyGroup/getMeetingLists",
  async (_, { rejectWithValue }) => {
    return await axiosClient
      .get(API_MEETING_PARENT)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const createGroup = createAsyncThunk(
  "studyGroup/createGroup",
  async (values, { rejectWithValue }) => {
    const submitData = values;
    return await axiosClient
      .post(API_CREATE_GROUP, submitData)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const getGroupLists = createAsyncThunk(
  "studyGroup/getGroupLists",
  async (_, { rejectWithValue }) => {
    return await axiosClient
      .get(API_GET_GROUP_LEAD)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const searchStudent = createAsyncThunk(
  "studyGroup/searchStudent",
  async ({ search, groupId }, { rejectWithValue }) => {
    return await axiosClient
      .get(
        API_SEARCH_STUDENT.replace("{search}", search).replace(
          "{groupId}",
          groupId
        )
      )
      .then((response) => {
        return response;
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const inviteStudent = createAsyncThunk(
  "studyGroup/inviteStudent",
  async ({ studentId, groupId }, { rejectWithValue }) => {
    return await axiosClient
      .post(API_INVITE_STUDENT, {
        accountId: parseInt(studentId),
        groupId,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const getStudentInvites = createAsyncThunk(
  "studyGroup/getStudentInvites",
  async (_, { rejectWithValue }) => {
    return await axiosClient
      .get(API_GET_STUDENT_INVITES)
      .then((response) => {
        return response;
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const acceptInvitation = createAsyncThunk(
  "studyGroup/acceptInvitation",
  async (inviteId, { rejectWithValue }) => {
    return await axiosClient
      .put(API_ACCEPT_INVITATION.replace("{inviteId}", inviteId))
      .then((response) => {
        return response;
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);
export const getClassLists = createAsyncThunk(
  "studyGroup/getClassLists",
  async (_, { rejectWithValue }) => {
    return await axiosClient
      .get(API_GET_LIST_CLASS)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);
export const declineInvitation = createAsyncThunk(
  "studyGroup/declineInvitation",
  async (inviteId, { rejectWithValue }) => {
    return await axiosClient
      .put(API_DECLINE_INVITATION.replace("{inviteId}", inviteId))
      .then((response) => {
        return response;
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const getGroupMemberLists = createAsyncThunk(
  "studyGroup/getGroupMemberLists",
  async (_, { rejectWithValue }) => {
    return await axiosClient
      .get(API_GET_GROUP_MEMBER)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const getGroupInfo = createAsyncThunk(
  "studyGroup/getGroupInfo",
  async (groupId, { rejectWithValue }) => {
    return await axiosClient
      .get(API_GET_LEAD_GROUP_INFO.replace("{groupId}", groupId))
      .then((response) => response)
      .catch((error) => {
        toast.error("Bạn không phải thành viên nhóm mã số " + groupId);
        return rejectWithValue(error.response.data);
      });
  }
);

export const getGroupInfoAsMember = createAsyncThunk(
  "studyGroup/getGroupInfo",
  async (groupId, { rejectWithValue }) => {
    return await axiosClient
      .get(API_GET_MEMBER_GROUP_INFO.replace("{groupId}", groupId))
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const updateGroupInfo = createAsyncThunk(
  "studyGroup/updateGroupInfo",
  async (data, { rejectWithValue }) => {
    return await axiosClient
      .put(API_UPDATE_GROUP_INFO.replace("{groupId}", data.id), data)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const scheduleMeeting = createAsyncThunk(
  "studyGroup/scheduleMeeting",
  async (data, { rejectWithValue }) => {
    return await axiosClient
      .post(API_SCHEDULE_MEETING, data)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);
export const meetingNow = createAsyncThunk(
  "studyGroup/meetingNow",
  async (data, { rejectWithValue }) => {
    return await axiosClient
      .post(API_MEETING_NOW, data)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);
// export const meetingNow = createAsyncThunk(
//   "studyGroup/meetingNow",
//   async (groupId, { rejectWithValue }) => {
//     const data = {
//       name: "Họp ngay",
//       groupId: parseInt(groupId),
//     };
//     return await axiosClient
//       .post(API_MEETING_NOW, data)
//       .then((response) => response)
//       .catch((error) => rejectWithValue(error.response.data));
//   }
// );

export const searchGroups = createAsyncThunk(
  "studyGroup/searchGroups",
  async (keyword, { rejectWithValue }) => {
    return await axiosClient
      .get(API_SEARCH_GROUP.replace("{keyword}", keyword))
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const requestJoinGroup = createAsyncThunk(
  "studyGroup/requestJoinGroup",
  async ({ groupId, studentId }, { rejectWithValue }) => {
    return await axiosClient
      .post(API_REQUEST_JOIN_GROUP, {
        groupId,
        accountId: studentId,
      })
      .then((response) => {
        toast.success("Xin vào thành công");
      })
      .catch((error) => {
        toast.error("Bạn đã xin vào nhóm này rồi");
        rejectWithValue(error.response.data);
      });
  }
);

export const getRequestFormList = createAsyncThunk(
  "studyGroup/getRequestFormList",
  async (groupId, { rejectWithValue }) => {
    return await axiosClient
      .get(API_GET_REQUEST_FORM_LIST.replace("{groupId}", groupId))
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const acceptJoinGroup = createAsyncThunk(
  "studyGroup/acceptJoinGroup",
  async (requestId, { rejectWithValue }) => {
    return await axiosClient
      .put(API_ACCEPT_JOIN_REQUEST.replace("{requestId}", requestId))
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const declineJoinGroup = createAsyncThunk(
  "studyGroup/declineJoinGroup",
  async (requestId, { rejectWithValue }) => {
    return await axiosClient
      .put(API_DECLINE_JOIN_REQUEST.replace("{requestId}", requestId))
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const addDiscussion = createAsyncThunk(
  "studyGroup/AddDiscussion",
  async (data, { rejectWithValue }) => {
    console.log("discussion data", data);


    const form = new FormData();
    form.append("Question", data.Question);
    form.append("Content", data.Content);
    form.append("File", data.File);
    return await axiosClient
      .post(
        API_UPLOAD_DISCUSSION.replace("{accountId}", data.accountId).replace(
          "{groupId}",
          data.groupId
        ),
        form
      )
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);
