/* eslint-disable no-unused-vars */
import { Box, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptJoinGroup,
  declineJoinGroup,
  getGroupInfo,
  getGroupLists,
  getGroupMemberLists,
  getRequestFormList,
  getRoomsByGroupId,
  getSubjectLists,
} from "../reducer";
import {
  convertFullName,
  convertToMeetingDtos,
  stringAvatar,
  stringToColor,
} from "src/common/utils";
import Button from "src/components/Button";
import CustomSection from "src/components/CustomSection";
import UpsertMeetingDialog from "../components/UpsertMeetingDialog";
import AvatarComponent from "src/components/AvatarComponent";
import UpsertGroupDialog from "../components/UpsertGroupDialog";
import { MEETING_TYPE, privateRoutes } from "src/common/constants";
import MeetingLabel from "src/components/MeetingLabel";
import PastMeetingDialog from "../components/PastMeetingDialog";
import moment from "moment";
import AddMemberDialog from "../components/addMemberDialog";
import JoinFormDialog from "../components/JoinFormDialog";
import { RoomContext } from "src/context/roomContext";
import { getGroupInfoAsMember, meetingNow } from "../reducer/actions";
import StudentDocuments from "src/pages/students/Documents";
import ScheduleMeeting from "../Modal/ScheduleMeeting";
import MemberDetail from "./Modal/MemberDetail";
import MeetingInstant from "./Modal/MeetingInstant";
import { CloseOutlined, CloseCircleOutlined } from "@mui/icons-material";
import { Tooltip } from "antd";
import { useMutation } from "@tanstack/react-query";
import STUDENT_API from "src/services/api/students/StudentAPI";
import { toast } from "react-toastify";
import HistoryChat from "src/modules/students/pages/stats/Modal/HistoryChat";
import HistoryVote from "src/modules/students/pages/stats/Modal/HistoryVote";
import { BE_URL } from "src/common/constants";
import { HubConnectionBuilder } from "@microsoft/signalr";
import emailjs from "@emailjs/browser";
import axios from "axios";

const renderMemberActions = (onOpenAddMemberModal, onOpenJoinFormModal) => {
  return [
    <Button
      color="primary"
      variant="contained"
      key={"0"}
      onClick={onOpenAddMemberModal}
    >
      Mời
    </Button>,
    <Button
      color="secondary"
      variant="contained"
      key={"1"}
      onClick={onOpenJoinFormModal}
    >
      Đơn xin tham gia
    </Button>,
  ];
};

const rendeMeetingActions = (onScheduleMeeting, onMeetingNow, isLead) => {
  const actions = [
    <Button
      color="primary"
      variant="contained"
      key={"1"}
      onClick={onMeetingNow}
    >
      Họp ngay
    </Button>,
  ];
  if (isLead) {
    actions.unshift(
      <Button
        color="secondary"
        variant="contained"
        key={"0"}
        onClick={onScheduleMeeting}
      >
        Lên kế hoạch
      </Button>
    );
  }
  return actions;
};

const rendeDocumentActions = (onSharingFile) => {
  return [
    <Button
      color="primary"
      variant="contained"
      key={"0"}
      onClick={onSharingFile}
    >
      Chia sẻ tài liệu
    </Button>,
  ];
};

const convertToGroupDto = (object) => {
  const { id, name, subjects } = object;
  const subjectIds = subjects.map((sbj) => sbj.id);

  return {
    id,
    name,
    classId: 6,
    subjectIds,
  };
};

const convertToMeetingDto = (obj) => {
  if (obj) {
    return {
      groupId: parseInt(obj.groupId),
      name: obj.name,
      schedulerStart: moment(obj.schedulerStart).format(),
      schedulerEnd: moment(obj.schedulerEnd).format(),
    };
  }
  return obj;
};

const GroupDetail = () => {
  const { roomId } = useParams();
  const { groupId } = useParams();
  const [openAddMember, setOpenAddmember] = useState(false);
  const scheduleRef = useRef();
  const memberRef = useRef();
  const meetingInstantRef = useRef();
  const { mutate } = useMutation(STUDENT_API.REMOVE_STUDENT, {
    onSuccess: () => {
      toast.success("Xóa thành viên thành công");
      memberRef.current.closeModal();
      onRefreshGroup();
      console.log(123);
    },
    onError: (errors) => {
      toast.error(errors.response.data);
    },
  });
  const { mutate: mutateRemoveMeeting } = useMutation(
    STUDENT_API.REMOVE_MEETING,
    {
      onSuccess: () => {
        toast.success("Hủy lịch hẹn thành công");
        onRefreshGroup();
      },
      onError: () => {
        toast.error("Hủy lịch hẹn thất bại");
      },
    }
  );

  const [openJoinForm, setOpenJoinForm] = useState(false);
  const [openScheduleMeeting, setOpenScheduleMeeting] = useState(false);
  const [openUpsertGroup, setOpenUpsertGroup] = useState(false);
  const [openPastMeeting, setOpenPastMeeting] = useState(false);
  const dispatch = useDispatch();
  const { loading, rooms, groupInfo, leadGroups, requestFormList } =
    useSelector((state) => state.studyGroup);
  const { subjectLists } = useSelector((state) => state.studyGroup);
  const [edittingGroup, setEdittingGroup] = useState(null);
  const [edittingMeeting, setEdittingMeeting] = useState(null);
  const [meetingLists, setMeetingLists] = useState([]);
  const navigate = useNavigate();
  const [isLead, setIsLead] = useState(false);
  const { ws, me } = useContext(RoomContext);

  //Detail
  const [memberDetail, setMemberDetail] = useState({});
  const [studentEmail, setStudentEmail] = useState();
  useEffect(() => {
    const internalLead = leadGroups.some((gr) => {
      return gr.id === parseInt(groupId);
    });
    setIsLead(internalLead);
  }, [leadGroups]);

  useEffect(() => {
    dispatch(getRoomsByGroupId(groupId));
    dispatch(getSubjectLists());
    const response = dispatch(getGroupInfo(groupId));
    dispatch(getGroupInfoAsMember(groupId));
    dispatch(getGroupLists());
    dispatch(getGroupMemberLists());
    dispatch(getRequestFormList(groupId));

    response.then((r) => {
      console.log("response", r);
      console.log("response", r.type);
      if (r.type !== getGroupInfo.fulfilled.type) {
        navigate(privateRoutes.studyGroup);
      }
    });
    //new group hub
    const accessTokenFactory = localStorage.getItem("token");
    const groupHub = new HubConnectionBuilder()
      .withUrl(BE_URL + "/hubs/grouphub?groupId=" + groupId, {
        accessTokenFactory: () => accessTokenFactory,
      })
      .build();
    groupHub.start().catch((err) => console.log(err));

    groupHub.on("OnReloadMeeting", (message) => {
      // dispatch(getRoomsByGroupId(groupId));
      onRefreshGroup();
      message && toast.info(message);
    });
    return () => {
      groupHub.stop().catch((error) => {});
    };
  }, []);

  useEffect(() => {
    if (groupInfo) {
      const internalMeetingLists = convertToMeetingDtos(groupInfo);
      setMeetingLists(internalMeetingLists);
      console.log(internalMeetingLists);
    }
  }, [groupInfo]);

  const onOpenAddMemberModal = () => {
    setOpenAddmember(true);
  };

  const onCloseAddMemberModal = () => {
    setOpenAddmember(false);
  };

  const onOpenJoinFormModal = () => {
    setOpenJoinForm(true);
  };

  const onCloseJoinFormModal = () => {
    setOpenJoinForm(false);
  };

  const onCloseScheduleMeeting = () => {
    setOpenScheduleMeeting(false);
  };

  const onCloseUpsertGroup = () => {
    setOpenUpsertGroup(false);
  };

  const onUpdateGroupInfo = () => {
    setOpenUpsertGroup(true);
    setEdittingGroup(groupInfo);
  };

  const onClosePastMeeting = () => {
    setOpenPastMeeting(false);
  };

  const onOpenPastMeeting = () => {
    setOpenPastMeeting(true);
  };

  const onJoinNow = (meetingId) => {
    navigate(
      privateRoutes.meeting
        .replace(":groupId", groupId)
        .replace(":meetingId", meetingId),
      {
        state: {
          isLead: isLead,
        },
      }
    );
  };
  const sendEmailsToStudents = (students, meetingId) => {
    mutateRemoveMeeting(meetingId);
    const templateParams = {
      to_name: "all guys",
      from_name: "Your Name",
      message: "email body.",
    };

    const emailPromises = students.map((student) => {
      const params = {
        ...templateParams,
        to_email: student.email,
        from_name: "Group host",
        message: `Meeting has been cancelled`,
      };

      return emailjs.send(
        "service_gonfgzw",
        "template_gd4kikh",
        params,
        "w6_ekxHHt9jte27s-"
      );
    });

    Promise.all(emailPromises)
      .then((results) => {
        results.forEach((result, index) => {
          console.log(`Email sent to everyone`);
        });
      })

      .catch((error) => {
        console.log("Error sending emails:", error);
      });
  };
  const onUpdateSchedule = (meetingId) => {
    const internalMeetingInfo = groupInfo.scheduleMeetings.find(
      (m) => m.id === meetingId
    );
    setEdittingMeeting(internalMeetingInfo);
    setOpenScheduleMeeting(true);
  };

  const onAcceptInvitation = async (requestId) => {
    const response = await dispatch(acceptJoinGroup(requestId));
    if (response) {
      dispatch(getRequestFormList(groupId));
      onCloseJoinFormModal();
    }
  };

  const onOpenScheduleStudent = () => {
    scheduleRef.current.openModal();
  };

  const onDeclineInvitation = async (requestId) => {
    const response = await dispatch(declineJoinGroup(requestId));
    if (response) {
      dispatch(getRequestFormList(groupId));
      onCloseJoinFormModal();
    }
  };

  const onViewDetailMember = (information) => {
    setMemberDetail(information);
    memberRef.current.openModal();
  };

  const onOpenMeetingInstant = () => {
    meetingInstantRef.current.openModal();
  };

  const onRemoveStudent = () => {
    mutate({ groupId: groupId, banAccId: memberDetail.id });
  };

  const onRefreshGroup = () => {
    dispatch(getRoomsByGroupId(groupId));
    dispatch(getSubjectLists());
    dispatch(getGroupInfo(groupId));
    dispatch(getGroupInfoAsMember(groupId));
    dispatch(getGroupLists());
    dispatch(getGroupMemberLists());
    dispatch(getRequestFormList(groupId));
  };
  const [historyChatDetail, setHistoryChatDetail] = useState({});
  const historyChatRef = useRef();
  const historyVoteRef = useRef();

  const onOpenHistoryChat = (item) => {
    setHistoryChatDetail(item);
    historyChatRef.current.openModal();
    onClosePastMeeting();
  };

  const onOpenHistoryVote = (item) => {
    setHistoryChatDetail(item);
    historyVoteRef.current.openModal();
    onClosePastMeeting();
  };

  return (
    <Grid container spacing={2} rowGap={3}>
      <ScheduleMeeting ref={scheduleRef} onRefresh={onRefreshGroup} />
      <MemberDetail
        ref={memberRef}
        information={memberDetail}
        onDeleteMember={onRemoveStudent}
      />
      <MeetingInstant ref={meetingInstantRef} onJoinRoom={onJoinNow} />

      <Box
        sx={{
          padding: "12px 16px",
          borderRadius: "12px",
          width: "100%",
          backgroundColor: "rgba(211,211,211, 0.5)",
        }}
      >
        <Grid container>
          <Grid sx={{ display: "flex", alignItems: "center" }} item xs={1}>
            <Typography>
              <strong>Mã số nhóm:</strong> {groupInfo?.id}
            </Typography>
          </Grid>
          <Grid
            sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            item
            xs={3}
          >
            <Typography>
              <strong>Tên:</strong> {groupInfo?.name}
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center" }} item xs={3}>
            <Typography>
              <strong>Môn:</strong>{" "}
              {groupInfo?.subjects?.map((sbj) => sbj.name)?.join(", ")}
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center" }} item xs={2}>
            <Typography>
              <strong>Lớp:</strong> {groupInfo?.classId}
            </Typography>
          </Grid>
          {/* eslint-disable */}
          {isLead && (
            <Grid item xs={3}>
              <Button
                color="primary"
                variant="contained"
                onClick={onUpdateGroupInfo}
              >
                Cập nhật
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
      <Grid item xs={12}>
        <CustomSection
          title="Thành viên nhóm"
          listItem={groupInfo?.members?.map((m) => {
            return (
              <Box key={m.id} position={"relative"}>
                <AvatarComponent
                  // {...stringAvatar(m.fullName)}
                  sx={{
                    bgcolor: stringToColor(m.fullName),
                  }}
                  onClick={() => onViewDetailMember(m)}
                >
                  {/* {m.username}
                  <br /> */}
                  {convertFullName(m.fullName)}
                </AvatarComponent>

                {/* <CloseCircleOutlined style={{ position: 'absolute', top: 0, right: -16 , cursr}} /> */}

                {/* <CloseCircleOutlined /> */}

                {/* {isLead && (
                  <Tooltip title="Xóa thành viên này">
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: -20,
                        cursor: "pointer",
                      }}
                      onClick={() => onRemoveStudent(m.id)}
                    >
                      <CloseOutlined />
                    </Box>
                  </Tooltip>
                )} */}
              </Box>
            );
          })}
          loading={loading}
          actions={
            isLead
              ? renderMemberActions(onOpenAddMemberModal, onOpenJoinFormModal)
              : []
          }
        />
      </Grid>

      <Grid item xs={12}>
        <CustomSection
          title="Buổi học"
          listItem={meetingLists
            ?.filter((m) => m?.status !== MEETING_TYPE.PAST)
            ?.map((m) => (
              <MeetingLabel
                onJoinNow={onJoinNow}
                onUpdate={onUpdateSchedule}
                meetingId={m?.id}
                isLead={isLead}
                key={m?.id}
                onRefreshGroup={onRefreshGroup}
                {...m}
                onCancelMeeting={sendEmailsToStudents}
                groupInfo={groupInfo}
              />
            ))}
          loading={loading}
          actions={rendeMeetingActions(
            onOpenScheduleStudent,
            onOpenMeetingInstant,
            isLead
          )}
        />
        {isLead && (
          <Button
            variant="contained"
            color="secondary"
            onClick={onOpenPastMeeting}
            fullWidth
          >
            Lịch sử họp
          </Button>
        )}
      </Grid>

      {/* <Grid item xs={12}>
        <CustomSection
          title="Tài liệu"
          listItem={rooms?.map((m) => (
            <AvatarComponent key={m.id}>{convertFullName(m.name)}</AvatarComponent>
          ))}
          loading={loading}
          actions={rendeDocumentActions()}
        />
      </Grid> */}
      <StudentDocuments isLead={isLead} />
      <AddMemberDialog
        groupId={groupId}
        open={openAddMember}
        onClose={onCloseAddMemberModal}
      />
      <JoinFormDialog
        onAcceptInvitation={onAcceptInvitation}
        onDeclineInvitation={onDeclineInvitation}
        invitations={requestFormList}
        open={openJoinForm}
        onClose={onCloseJoinFormModal}
      />
      <UpsertMeetingDialog
        meetingInfo={convertToMeetingDto(edittingMeeting)}
        groupId={groupId}
        open={openScheduleMeeting}
        onClose={onCloseScheduleMeeting}
      />
      <UpsertGroupDialog
        groupInfo={edittingGroup && convertToGroupDto(edittingGroup)}
        subjectLists={subjectLists}
        open={openUpsertGroup}
        onClose={onCloseUpsertGroup}
      />
      <PastMeetingDialog
        open={openPastMeeting}
        onClose={onClosePastMeeting}
        data={meetingLists?.filter((m) => m.status === MEETING_TYPE.PAST)}
        onOpenHistoryChat={onOpenHistoryChat}
        onOpenHistoryVote={onOpenHistoryVote}
      />
      <HistoryChat ref={historyChatRef} itemDetail={historyChatDetail} />
      <HistoryVote ref={historyVoteRef} itemDetail={historyChatDetail} />
    </Grid>
  );
};

export default GroupDetail;
