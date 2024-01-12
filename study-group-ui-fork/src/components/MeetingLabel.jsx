import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";
import { MEETING_TYPE } from "src/common/constants";
import { Button, Space, Tag } from "antd";
import HistoryChat from "src/modules/students/pages/stats/Modal/HistoryChat";
import HistoryVote from "src/modules/students/pages/stats/Modal/HistoryVote";
import UpdateRoom from "src/modules/students/pages/groups/Modal/UpdateRoom";
import emailjs from "@emailjs/browser";
import { Abc } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import SETTING_API from "src/services/api/parents/SettingAPI";
import { toast } from "react-toastify";
import STUDENT_API from "src/services/api/students/StudentAPI";
const renderActions = (
  { status, meetingId, canStart, groupInfo },
  onJoinNow,
  onUpdate,
  isLead,
  onCancelMeeting,
  onRefreshGroup,
  onRemoveMeeting
) => {
  // const { mutate: mutateRemoveMeeting } = useMutation(
  //   STUDENT_API.REMOVE_MEETING,
  //   {
  //     onSuccess: () => {
  //       toast.success("Hủy lịch hẹn thành công");
  //     },
  //     onError: () => {},
  //   }
  // );
  // const onRemoveMeeting = (meetingId) => {
  //   mutateRemoveMeeting(meetingId);
  // };
  switch (status) {
    case MEETING_TYPE.LIVE: {
      return (
        <>
          <Button
            color="primary"
            variant="contained"
            key={"0"}
            onClick={() => onJoinNow(meetingId)}
          >
            Tham gia
          </Button>
        </>
      );
    }
    case MEETING_TYPE.SCHEDULE: {
      return (
        <>
          {isLead && (
            <Button
              color="secondary"
              variant="contained"
              key={"0"}
              onClick={() => onUpdate(meetingId)}
              onRefreshGroup={onRefreshGroup}
            >
              Cập nhật
            </Button>
          )}
          {canStart && (
            <Button
              color="primary"
              variant="contained"
              key={"1"}
              onClick={() => onJoinNow(meetingId)}
            >
              Bắt đầu
            </Button>
          )}
          {/* <Button
            color="primary"
            variant="contained"
            key={"0"}
            onClick={() => onCancelMeeting(groupInfo.members, meetingId)}
            onRefreshGroup={onRefreshGroup}
          >
            Hủy buổi
          </Button> */}
        </>
      );
    }
  }
};

const MeetingLabel = (props) => {
  const {
    name,
    content,
    scheduleStart,
    scheduleEnd,
    start,
    end,
    countMember,
    status,
    meetingId,
    onJoinNow,
    onUpdate,
    canStart,
    isLead,
    onRefreshGroup,
    chats,
    reviews,
    onCloseFather,
    onOpenHistoryChat,
    onOpenHistoryVote,
    groupInfo,
    onCancelMeeting,
    onRemoveMeeting,
  } = props;

  const updateRoomRef = useRef();

  const onOpenUpdateModal = () => {
    updateRoomRef.current.openModal();
  };

  if (status === "PAST") {
    console.log("\n\n PAST prop ", props);
  }
  const splitISO = (isoDate) => {
    if (!isoDate) {
      return "null";
    }
    const isoParts = isoDate.split("T");
    const dateParts = isoParts[0].split("-");
    // console.log('dateParts', dateParts);
    const timeParts = isoParts[1].split(":");
    // console.log('timeParts', timeParts)
    return `${dateParts[2]}/${dateParts[1]} ${timeParts[0]}:${timeParts[1]}`;
  };
  const splitISOTimeOnly = (isoDate) => {
    if (!isoDate) {
      return "null";
    }
    const isoParts = isoDate.split("T");
    // console.log('dateParts', dateParts);
    const timeParts = isoParts[1].split(":");
    // console.log('timeParts', timeParts)
    return `${timeParts[0]}:${timeParts[1]}`;
  };
  // console.log(`schedule meeting ${name}: \niso: ${scheduleStart}, \nmoment: ${moment(scheduleStart).format('DD/MM HH:mm')}\nsplit: ${splitISO(scheduleStart)}`);
  // const scheduleStartDate = new Date(scheduleStart);
  // const scheduleEndDate
  // const startDate
  // const endDate
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          minWidth: "300px",
          minHeight: "150px",
          p: "12px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(211,211,211, 0.5)",
          border:
            status === "LIVE"
              ? "4px solid green"
              : status === "SCHEDULE" && canStart
              ? "4px solid orange"
              : "4px solid red",
          gap: "1rem",
        }}
      >
        <UpdateRoom
          ref={updateRoomRef}
          item={props}
          onRefreshGroup={onRefreshGroup}
          onCancelMeeting={onCancelMeeting}
          meetingId={meetingId}
          groupInfo={groupInfo}
        />
        <Typography variant="body1" sx={{ fontWeight: "600" }}>
          {name}
        </Typography>
        <Typography>Nội dung: {content}</Typography>
        <Typography>
          Dự kiến:
          {scheduleStart && (
            <Typography component={"span"}>
              {/* {moment(scheduleStart).format('DD/MM HH:mm')} */}
              {/* {`${new Date(scheduleStart).getDate()}/${new Date(scheduleStart).getMonth()+1} ${new Date(scheduleStart).getHours()}:${new Date(scheduleStart).getMinutes()}`} */}{" "}
              {splitISO(scheduleStart)}
            </Typography>
          )}
          {/* {' - '} */}
          {scheduleEnd && (
            <Typography component={"span"}>
              {/* {' - '}{moment(scheduleEnd).format('DD/MM HH:mm')} */}
              {" - "}
              {splitISOTimeOnly(scheduleEnd)}
            </Typography>
          )}
        </Typography>
        <Typography>
          Diễn ra:
          {start && (
            <Typography component={"span"}>
              {/* {moment(start).format('DD/MM HH:mm')} */} {splitISO(start)}
            </Typography>
          )}
          {end && (
            <Typography component={"span"}>
              {/* {' - '}{moment(end).format('DD/MM HH:mm')} */}
              {" - "}
              {splitISOTimeOnly(end)}
            </Typography>
          )}
        </Typography>
        {!!countMember && <Typography>{countMember} người tham gia</Typography>}
        <Space size="small">
          <Typography>Trạng thái: </Typography>
          <Tag
            color={
              status === "LIVE"
                ? "green"
                : status === "SCHEDULE" && canStart
                ? "orange"
                : "red"
            }
          >
            {status === "LIVE"
              ? "Có thể tham gia ngay"
              : status === "PAST"
              ? "Đã diễn ra"
              : status === "SCHEDULE" && canStart
              ? "Có thể bắt đầu" //  'Chưa tới thời gian bắt đầu'
              : "Chưa thể bắt đầu"}
          </Tag>
        </Space>
        {status === "PAST" ? (
          <Space size="small" direction="vertical">
            <Button
              type="primary"
              onClick={() => onOpenHistoryChat({ chats: chats })}
              style={{ width: "100%" }}
            >
              Lịch sử chat
            </Button>
            <Button
              onClick={() => onOpenHistoryVote({ reviews: reviews })}
              style={{ width: "100%" }}
            >
              Lịch sử dò bài
            </Button>
          </Space>
        ) : null}

        {/* <Space size="small">
          <Button type="primary" onClick={() => onOpenHistoryChat()}>
            Lịch sử chat
          </Button>
          <Button onClick={() => onOpenHistoryVote()}>Lịch sử dò bài</Button>
        </Space> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            mt: "auto",
          }}
        >
          {renderActions(
            { status, meetingId, canStart, groupInfo },
            onJoinNow,
            onOpenUpdateModal,
            isLead,
            onCancelMeeting,
            onRefreshGroup,
            onRemoveMeeting
          )}
        </Box>
      </Paper>
    </>
  );
};

MeetingLabel.propTypes = {
  name: PropTypes.string,
  scheduleStart: PropTypes.string,
  scheduleEnd: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  countMember: PropTypes.number,
  status: PropTypes.string,
  meetingId: PropTypes.number,
  onJoinNow: PropTypes.func,
  onUpdate: PropTypes.func,
  onOpenUpdateModal: PropTypes.func,
  onCancelMeeting: PropTypes.func,
  onRefreshGroup: PropTypes.func,
  onRemoveMeeting: PropTypes.func,
};

MeetingLabel.defaultProps = {
  name: "",
  scheduleStart: "",
  scheduleEnd: "",
  start: "",
  end: "",
  countMember: 0,
  status: "",
  meetingId: null,
};

export default MeetingLabel;
