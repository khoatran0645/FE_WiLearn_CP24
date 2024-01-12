import { createSlice } from "@reduxjs/toolkit";
import {
  addNewGroup,
  createGroup,
  getGroupInfo,
  getGroupLists,
  searchStudent,
  getGroupMemberLists,
  getRoomsByGroupId,
  getSubjectLists,
  scheduleMeeting,
  updateGroupInfo,
  inviteStudent,
  getStudentInvites,
  acceptInvitation,
  declineInvitation,
  searchGroups,
  requestJoinGroup,
  acceptJoinGroup,
  getRequestFormList,
  declineJoinGroup,
  meetingNow,
  getMeetingList,
  getClassLists,
} from "./actions";

const initialState = {
  loading: false,
  error: null,
  rooms: [],
  subjectLists: [],
  leadGroups: [],
  listClass: [],
  memberGroups: [],
  groupInfo: null,
  meetingList: null,
  searchStudentList: [],
  invitations: [],
  groupsAsMember: [],
  searchGroupss: [],
  requestFormList: [],
  listClass: [],
};

const studyGroupSlice = createSlice({
  name: "studyGroup",
  initialState,
  reducers: {
    // Define reducers for synchronous actions

    reset: (state) => {
      state.loading = false;
      state.error = null;
    },
    clearSearchGroup: (state) => {
      state.searchGroupss = [];
    },
  },
  extraReducers: {
    // Define reducers for asynchronous actions

    // Reducers for createGroup action
    [createGroup.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createGroup.fulfilled]: (state) => {
      state.loading = false;
    },
    [createGroup.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Reducers for getRequestFormList action
    [getRequestFormList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getRequestFormList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.requestFormList = payload;
    },
    [getRequestFormList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Reducers for searchGroups action
    [searchGroups.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [searchGroups.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.searchGroupss = payload;
    },
    [searchGroups.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Reducers for getGroupLists action
    [getGroupLists.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getGroupLists.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.leadGroups = payload;
    },
    [getGroupLists.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Reducers for getGroupMemberLists action
    [getGroupMemberLists.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getGroupMemberLists.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.memberGroups = payload;
    },
    [getGroupMemberLists.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //Classlist
    [getClassLists.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getClassLists.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.listClass = payload;
    },
    [getClassLists.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Reducers for updateGroupInfo action
    [updateGroupInfo.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateGroupInfo.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateGroupInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Reducers for searchStudent action
    [searchStudent.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [searchStudent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.searchStudentList = payload;
    },
    [searchStudent.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Reducers for getStudentInvites action
    [getStudentInvites.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getStudentInvites.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.invitations = payload;
    },
    [getStudentInvites.rejected]: (state, { payload }) => {
      state.loading = false;
      state.invitations = [];
      state.error = payload;
    },

    // Reducers for getSubjectLists action
    [getSubjectLists.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getSubjectLists.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.subjectLists = payload;
    },
    [getSubjectLists.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Reducers for getGroupInfo action
    [getGroupInfo.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getGroupInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.groupInfo = payload;
    },
    [getGroupInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getMeetingList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getMeetingList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.meetingList = payload;
    },
    [getMeetingList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Reducers for getRoomsByGroupId action
    [getRoomsByGroupId.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getRoomsByGroupId.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.rooms = payload;
    },
    [getRoomsByGroupId.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Reducers for scheduleMeeting action
    [scheduleMeeting.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [scheduleMeeting.fulfilled]: (state) => {
      state.loading = false;
    },
    [scheduleMeeting.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Reducers for addNewGroup action
    [addNewGroup.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addNewGroup.fulfilled]: (state) => {
      state.loading = false;
    },
    [addNewGroup.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export {
  addNewGroup,
  getRoomsByGroupId,
  getSubjectLists,
  createGroup,
  getGroupLists,
  getGroupInfo,
  updateGroupInfo,
  scheduleMeeting,
  getGroupMemberLists,
  searchStudent,
  inviteStudent,
  getStudentInvites,
  acceptInvitation,
  declineInvitation,
  searchGroups,
  requestJoinGroup,
  acceptJoinGroup,
  getRequestFormList,
  declineJoinGroup,
  meetingNow,
  getMeetingList,
  getClassLists,
}; // export asynchronous actions

export const { reset, clearSearchGroup } = studyGroupSlice.actions; // export synchronous actions

// export reducer
// reducer need to be registered with a state name at src/store/rootReducers.js
export default studyGroupSlice.reducer;
