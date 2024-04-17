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
  API_GET_DISCUSSION_BY_ID,
  API_GET_ANSWER_BY_DISCUSSION_ID,
  API_POST_ANSWER_DISCUSSION,
  API_GET_GROUP_NOT_JOIN,
  GET_LIST_DOCUMENTS_BY_GROUP,
  CREATE_DOCUMENT,
  API_MEETING_REPEAT,
  API_UPDATE_MEETING,
  API_SEARCH_GROUP_CODE,
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

export const createGroupOld = createAsyncThunk(
  "studyGroup/createGroup",
  async (values, { rejectWithValue }) => {
    const submitData = values;

    return await axiosClient
      .post(API_CREATE_GROUP, submitData)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const createGroup = createAsyncThunk(
  "studyGroup/createGroup",
  async (values, { rejectWithValue }) => {
    const submitData = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        // Check if the property belongs to the object (not inherited)
        const keyValue = values[key];
        if (key != "subjectIds") {
          submitData.append(key, keyValue);
        } else {
          //subjectIds là list lại xài formdata nên đặt biệt
          keyValue.forEach((subId) => {
            submitData.append(key, subId);
          });
        }
        console.log(`studyGroup/createGroup Key: ${key}, Value:`, keyValue);
      }
    }
    console.log(`studyGroup/createGroup submitData:`, submitData);

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

export const updateGroupInfoOld = createAsyncThunk(
  "studyGroup/updateGroupInfo",
  async (data, { rejectWithValue }) => {
    return await axiosClient
      .put(API_UPDATE_GROUP_INFO.replace("{groupId}", data.id), data)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const updateGroupInfo = createAsyncThunk(
  "studyGroup/updateGroupInfo",
  async (values, { rejectWithValue }) => {
    const submitData = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        // Check if the property belongs to the object (not inherited)
        const keyValue = values[key];
        if (key != "subjectIds") {
          submitData.append(key, keyValue);
        } else {
          //subjectIds là list lại xài formdata nên đặt biệt
          keyValue.forEach((subId) => {
            submitData.append(key, subId);
          });
        }
        console.log(`studyGroup/updateGroupInfo Key: ${key}, Value:`, keyValue);
      }
    }
    return await axiosClient
      .put(API_UPDATE_GROUP_INFO.replace("{groupId}", values.id), submitData)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);
export const massScheduleMeeting = createAsyncThunk(
  "studyGroup/massScheduleMeeting",
  async (data, { rejectWithValue }) => {
    return await axiosClient
      .post(API_MEETING_REPEAT, data)
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
export const updateMeeting = createAsyncThunk(
  "studyGroup/updateMeeting",
  async (data, { rejectWithValue }) => {
    return await axiosClient
      .put(API_UPDATE_MEETING.replace("{id}", data.id), data)
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

export const searchGroupsCode = createAsyncThunk(
  "studyGroup/searchGroupsCode",
  async (keyword, { rejectWithValue }) => {
    return await axiosClient
      .get(API_SEARCH_GROUP_CODE.replace("{keyword}", keyword))
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

export const getGroupNotJoin = createAsyncThunk(
  "studyGroup/getGroupNotJoin",
  async (_, { rejectWithValue }) => {
    return await axiosClient
      .get(API_GET_GROUP_NOT_JOIN)
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
        API_UPLOAD_DISCUSSION.replace("{accountId}", data.userId).replace(
          "{groupId}",
          data.groupId
        ),
        form
      )
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const getDiscussionById = createAsyncThunk(
  "studyGroup/getDiscussionById",
  async (id, { rejectWithValue }) => {
    console.log("id", id);
    return await axiosClient
      .get(API_GET_DISCUSSION_BY_ID.replace("{discussionId}", id))
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const getAnswerByDiscussionId = createAsyncThunk(
  "studyGroup/getAnswerByDiscussionId",
  async (id, { rejectWithValue }) => {
    console.log("id", id);
    return await axiosClient
      .get(API_GET_ANSWER_BY_DISCUSSION_ID.replace("{discussionId}", id))
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const addAnswer = createAsyncThunk(
  "studyGroup/addAnswer",
  async (data, { rejectWithValue }) => {
    console.log("answer data", data);
    const form = new FormData();
    form.append("File", '');
    return await axiosClient
      .post(
        API_POST_ANSWER_DISCUSSION.replace("{accountId}", data.userId).replace(
          "{discussionId}",
          data.discussionId
        ).replace("{content}", data.content),
        form
      )
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const getDocumentListByGroup = createAsyncThunk(
  "studyGroup/getDocumentList",
  async (groupId, { rejectWithValue }) => {
    return await axiosClient
      .get(GET_LIST_DOCUMENTS_BY_GROUP.replace("{groupId}", groupId))
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const uploadFile = createAsyncThunk(
  "studyGroup/uploadFile",
  async (data, { rejectWithValue }) => {
    console.log("upload action", data.file);
    const form = new FormData();
    form.append("file", data.file);
    console.log("upload success", form);
    return await axiosClient
      .post(
        CREATE_DOCUMENT.replace("{groupId}", data.groupId).replace(
          "{accountId}",
          data.userId
        ),
        form
      )
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);
