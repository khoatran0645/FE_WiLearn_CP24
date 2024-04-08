import { createSlice } from "@reduxjs/toolkit";
import {
  // addNewGroup,
  createGroup,
  getGroupInfo,
  getGroupLists,
  searchStudent,
  getGroupMemberLists,
  // getRoomsByGroupId,
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
  addDiscussion,
  getDiscussionById,
} from "./studyGroupActions";

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
  discussionForm: null,
  discussionDetailInfo: null,
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
  extraReducers: (builder) => {
    // Define reducers for asynchronous actions

    // Reducers for createGroup action
    // [createGroup.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(createGroup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [createGroup.fulfilled]: (state) => {
    //   state.loading = false;
    // },
    builder.addCase(createGroup.fulfilled, (state) => {
      state.loading = false;
    });
    // [createGroup.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(createGroup.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Reducers for getRequestFormList action
    // [getRequestFormList.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(getRequestFormList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [getRequestFormList.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.requestFormList = payload;
    // },
    builder.addCase(getRequestFormList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.requestFormList = payload;
    });
    // [getRequestFormList.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(getRequestFormList.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Reducers for searchGroups action
    // [searchGroups.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(searchGroups.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [searchGroups.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.searchGroupss = payload;
    // },
    builder.addCase(searchGroups.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.searchGroupss = payload;
    });
    // [searchGroups.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(searchGroups.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Reducers for getGroupLists action
    // [getGroupLists.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(getGroupLists.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [getGroupLists.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.leadGroups = payload;
    // },
    builder.addCase(getGroupLists.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.leadGroups = payload;
    });
    // [getGroupLists.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(getGroupLists.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Reducers for getGroupMemberLists action
    // [getGroupMemberLists.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(getGroupMemberLists.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [getGroupMemberLists.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.memberGroups = payload;
    // },
    builder.addCase(getGroupMemberLists.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.memberGroups = payload;
    });
    // [getGroupMemberLists.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(getGroupMemberLists.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //Classlist
    // [getClassLists.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(getClassLists.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [getClassLists.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.listClass = payload;
    // },
    builder.addCase(getClassLists.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listClass = payload;
    });
    // [getClassLists.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(getClassLists.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Reducers for updateGroupInfo action
    // [updateGroupInfo.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(updateGroupInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [updateGroupInfo.fulfilled]: (state) => {
    //   state.loading = false;
    // },
    builder.addCase(updateGroupInfo.fulfilled, (state) => {
      state.loading = false;
    });
    // [updateGroupInfo.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(updateGroupInfo.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Reducers for searchStudent action
    // [searchStudent.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(searchStudent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [searchStudent.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.searchStudentList = payload;
    // },
    builder.addCase(searchStudent.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.searchStudentList = payload;
    });
    // [searchStudent.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(searchStudent.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // Reducers for getStudentInvites action
    // [getStudentInvites.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(getStudentInvites.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [getStudentInvites.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.invitations = payload;
    // },
    builder.addCase(getStudentInvites.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.invitations = payload;
    });
    // [getStudentInvites.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.invitations = [];
    //   state.error = payload;
    // },
    builder.addCase(getStudentInvites.rejected, (state, { payload }) => {
      state.loading = false;
      state.invitations = [];
      state.error = payload;
    });

    // Reducers for getSubjectLists action
    // [getSubjectLists.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(getSubjectLists.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [getSubjectLists.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.subjectLists = payload;
    // },
    builder.addCase(getSubjectLists.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.subjectLists = payload;
    });
    // [getSubjectLists.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(getSubjectLists.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Reducers for getGroupInfo action
    // [getGroupInfo.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(getGroupInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [getGroupInfo.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.groupInfo = payload;
    // },
    builder.addCase(getGroupInfo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.groupInfo = payload;
    });
    // [getGroupInfo.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(getGroupInfo.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // [getMeetingList.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(getMeetingList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [getMeetingList.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.meetingList = payload;
    // },
    builder.addCase(getMeetingList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.meetingList = payload;
    });
    // [getMeetingList.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(getMeetingList.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // // Reducers for getRoomsByGroupId action
    // // [getRoomsByGroupId.pending]: (state) => {
    // //   state.loading = true;
    // //   state.error = null;
    // // },
    // builder.addCase(getRoomsByGroupId.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // // [getRoomsByGroupId.fulfilled]: (state, { payload }) => {
    // //   state.loading = false;
    // //   state.rooms = payload;
    // // },
    // builder.addCase(getRoomsByGroupId.fulfilled,(state, { payload }) => {
    //   state.loading = false;
    //   state.rooms = payload;
    // })
    // // [getRoomsByGroupId.rejected]: (state, { payload }) => {
    // //   state.loading = false;
    // //   state.error = payload;
    // // },
    // builder.addCase(getRoomsByGroupId.rejected, (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // })

    // Reducers for scheduleMeeting action
    // [scheduleMeeting.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(scheduleMeeting.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [scheduleMeeting.fulfilled]: (state) => {
    //   state.loading = false;
    // },
    builder.addCase(scheduleMeeting.fulfilled, (state) => {
      state.loading = false;
    });
    // [scheduleMeeting.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(scheduleMeeting.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Reducers for instantMeeting action
    // [meetingNow.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(meetingNow.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [meetingNow.fulfilled]: (state) => {
    //   state.loading = false;
    // },
    builder.addCase(meetingNow.fulfilled, (state) => {
      state.loading = false;
    });
    // [meetingNow.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(meetingNow.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // // Reducers for addNewGroup action
    // // [addNewGroup.pending]: (state) => {
    // //   state.loading = true;
    // //   state.error = null;
    // // },
    // builder.addCase(addNewGroup.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // // [addNewGroup.fulfilled]: (state) => {
    // //   state.loading = false;
    // // },
    // builder.addCase(addNewGroup.fulfilled, (state) => {
    //   state.loading = false;
    // })
    // // [addNewGroup.rejected]: (state, { payload }) => {
    // //   state.loading = false;
    // //   state.error = payload;
    // // },
    // builder.addCase(addNewGroup.rejected,(state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // })

    //ADD DISCUSSION
    builder.addCase(addDiscussion.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addDiscussion.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addDiscussion.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //GET DISCUSSION BY ID
    builder.addCase(getDiscussionById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDiscussionById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.discussionDetailInfo = payload;
    });
    builder.addCase(getDiscussionById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export {
  // addNewGroup,
  // getRoomsByGroupId,
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
  addDiscussion,
  getDiscussionById,
}; // export asynchronous actions

export const { reset, clearSearchGroup } = studyGroupSlice.actions; // export synchronous actions

// export reducer
// reducer need to be registered with a state name at src/store/rootReducers.js
export default studyGroupSlice.reducer;
