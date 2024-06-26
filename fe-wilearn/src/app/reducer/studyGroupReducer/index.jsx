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
  getGrouptMeetingList,
  getClassLists,
  addDiscussion,
  getDiscussionByGroupId,
  getDiscussionById,
  getAnswerByDiscussionId,
  addAnswer,
  getGroupNotJoin,
  getDocumentListByGroup,
  uploadFile,
  checkFile,
  massScheduleMeeting,
  updateMeeting,
  searchGroupsCode,
  getGroupStats,
  getMoreGroupStats,
  uploadDiscussionFile,
  createReport,
  kickMember,
  leaveGroup,
  updateDiscussion,
  updateAnswer,
  uploadMeetingCanvas,
} from "./studyGroupActions";

const initialState = {
  loading: false,
  loadingGroup: false,
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
  searchedGroups: [],
  searchedCodeGroups: [],
  requestFormList: [],
  discussionForm: null,
  discussionList: [],
  discussionDetail: null,
  answerList: [],
  groupNotJoin: [],
  listFile: [],
  groupStats: null,
  moreGroupStats: null,
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
      state.searchedGroups = [];
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
      state.searchedGroups = payload;
    });
    // [searchGroups.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(searchGroups.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(searchGroupsCode.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchGroupsCode.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.searchedCodeGroups = payload;
    });
    builder.addCase(searchGroupsCode.rejected, (state, { payload }) => {
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
      state.loadingGroup = true;
      state.error = null;
    });
    // [getGroupInfo.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.groupInfo = payload;
    // },
    builder.addCase(getGroupInfo.fulfilled, (state, { payload }) => {
      state.loadingGroup = false;
      state.groupInfo = payload;
    });
    // [getGroupInfo.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(getGroupInfo.rejected, (state, { payload }) => {
      state.loadingGroup = false;
      state.error = payload;
    });

    // [getMeetingList.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(getGrouptMeetingList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // [getMeetingList.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.meetingList = payload;
    // },
    builder.addCase(getGrouptMeetingList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.meetingList = payload;
      // state.groupInfo.pastMeetings = payload.past
      // state.groupInfo.scheduleMeetings = payload.schedule
      // state.groupInfo.liveMeetings = payload.live
    });
    // [getMeetingList.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(getGrouptMeetingList.rejected, (state, { payload }) => {
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
    builder.addCase(massScheduleMeeting.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(massScheduleMeeting.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(massScheduleMeeting.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
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
    
    //Save canvas to group
    builder.addCase(uploadMeetingCanvas.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadMeetingCanvas.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(uploadMeetingCanvas.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });


    builder.addCase(updateMeeting.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateMeeting.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateMeeting.rejected, (state, { payload }) => {
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

    builder.addCase(getGroupNotJoin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getGroupNotJoin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.groupNotJoin = payload;
    });

    builder.addCase(getGroupNotJoin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
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

    //GET DISCUSSION BY GROUP ID
    builder.addCase(getDiscussionByGroupId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDiscussionByGroupId.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.discussionList = payload;
    });
    builder.addCase(getDiscussionByGroupId.rejected, (state, { payload }) => {
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
      state.discussionDetail = payload;
    });
    builder.addCase(getDiscussionById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //GET ANSWER BY DISCUSSION ID
    builder.addCase(getAnswerByDiscussionId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAnswerByDiscussionId.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.answerList = payload;
    });
    builder.addCase(getAnswerByDiscussionId.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //POST ANSWER
    builder.addCase(addAnswer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addAnswer.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addAnswer.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //  GET LIST OF FILE
    builder.addCase(getDocumentListByGroup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDocumentListByGroup.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listFile = payload;
    });
    builder.addCase(getDocumentListByGroup.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // UPLOAD Discusion body FILE
    builder.addCase(uploadDiscussionFile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadDiscussionFile.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(uploadDiscussionFile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // update discussion
    builder.addCase(updateDiscussion.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateDiscussion.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateDiscussion.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // update answer
    builder.addCase(updateAnswer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateAnswer.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateAnswer.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });


    // UPLOAD FILE
    builder.addCase(uploadFile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadFile.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(uploadFile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // APPROVE OR DENY FILE
    builder.addCase(checkFile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkFile.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(checkFile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //GET GROUP STATS
    builder.addCase(getGroupStats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getGroupStats.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.groupStats = payload;
    });
    builder.addCase(getGroupStats.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //GET MORE GROUP STATS
    builder.addCase(getMoreGroupStats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMoreGroupStats.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.moreGroupStats = payload;
    });
    builder.addCase(getMoreGroupStats.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // CREATE REPORT
    builder.addCase(createReport.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createReport.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createReport.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //Kick member
    builder.addCase(kickMember.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(kickMember.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(kickMember.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // leave group
    builder.addCase(leaveGroup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(leaveGroup.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(leaveGroup.rejected, (state, { payload }) => {
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
  getGrouptMeetingList as getMeetingList,
  getClassLists,
  addDiscussion,
  getDiscussionById,
  addAnswer,
  getAnswerByDiscussionId,
  getGroupNotJoin,
  getDocumentListByGroup,
  uploadFile,
  checkFile,
  getGroupStats,
  getMoreGroupStats,
  createReport,
  leaveGroup,
}; // export asynchronous actions

export const { reset, clearSearchGroup } = studyGroupSlice.actions; // export synchronous actions

// export reducer
// reducer need to be registered with a state name at src/store/rootReducers.js
export default studyGroupSlice.reducer;
