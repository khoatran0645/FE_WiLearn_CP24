import { Button, Card, Col, Row, Space, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import STUDENT_API from "src/services/api/students/StudentAPI";
import { useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import HistoryChat from "./Modal/HistoryChat";
import HistoryVote from "./Modal/HistoryVote";

export const DATETIME_FORMAT = "YYYY-MM";
export const FULL_DATETIME_FORMAT = "DD-MM-YYYY HH:mm";

const StudentCard = () => {
  const [dateTime, setDateTime] = useState(() => {
    const now = dayjs();
    const convertDateTime = dayjs(now).format(DATETIME_FORMAT);
    return convertDateTime;
  });

  const historyChatRef = useRef();
  const historyVoteRef = useRef();
  const userProfile = useSelector((state) => state.auth.userInfo);
  const [statInformation, setStatsInformation] = useState({});
  const [historyChatDetail, setHistoryChatDetail] = useState({});
  const [dateCalendar, setDateCalendar] = useState();

  const { isLoading, mutate } = useMutation(STUDENT_API.GET_STUDENT_STATS, {
    onSuccess: (values) => {
      setStatsInformation(values);
    },
  });

  useEffect(() => {
    if (dateTime) {
      mutate({
        studentId: userProfile?.id,
        month: dateTime,
      });
    }
  }, [dateTime]);

  const onChangeDateTime = (value) => {
    const result = dayjs(value).format(DATETIME_FORMAT);
    setDateTime(result);
    setDateCalendar(value);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  const onOpenHistoryChat = (item) => {
    setHistoryChatDetail(item);
    historyChatRef.current.openModal();
  };

  const onOpenHistoryVote = (item) => {
    setHistoryChatDetail(item);
    historyVoteRef.current.openModal();
  };
  const splitISO = (isoDate) => {
    if (!isoDate) {
      return "null";
    }
    const isoParts = isoDate.split("T");
    const dateParts = isoParts[0].split("-");
    // console.log('dateParts', dateParts);
    const timeParts = isoParts[1].split(":");
    // console.log('timeParts', timeParts)
    console.log(
      `${dateParts[2]}/${dateParts[1]} ${timeParts[0]}:${timeParts[1]}`
    );
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
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "1rem",
      }}
    >
      <HistoryChat ref={historyChatRef} itemDetail={historyChatDetail} />
      <HistoryVote ref={historyVoteRef} itemDetail={historyChatDetail} />

      <Card style={{ width: "50%" }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <DatePicker
              views={["month", "year"]}
              value={dateCalendar}
              onChange={onChangeDateTime}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={24}>
            <Space>
              <Typography.Text style={{ fontWeight: "600" }}>
                Tổng số buổi học:{" "}
              </Typography.Text>
              <Typography.Text>
                {statInformation.totalMeetingsCount}
              </Typography.Text>
            </Space>
          </Col>

          <Col span={24}>
            <Space>
              <Typography.Text style={{ fontWeight: "600" }}>
                Số buổi học tham gia:{" "}
              </Typography.Text>
              <Typography.Text>
                {statInformation.atendedMeetingsCount}
              </Typography.Text>
            </Space>
          </Col>

          <Col span={24}>
            <Space>
              <Typography.Text style={{ fontWeight: "600" }}>
                Sổ buổi học vắng:{" "}
              </Typography.Text>
              <Typography.Text>
                {statInformation.missedMeetingsCount}
              </Typography.Text>
            </Space>
          </Col>

          <Col span={24}>
            <Space>
              <Typography.Text style={{ fontWeight: "600" }}>
                Tổng thời gian học:{" "}
              </Typography.Text>
              <Typography.Text>
                {statInformation.totalMeetingTme}
              </Typography.Text>
            </Space>
          </Col>

          <Col span={24}>
            <Space>
              <Typography.Text style={{ fontWeight: "600" }}>
                Trung bình điểm dò bài:{" "}
              </Typography.Text>
              <Typography.Text>
                {statInformation.averageVoteResult}
              </Typography.Text>
            </Space>
          </Col>

          <Col span={24}>
            <Typography.Title level={5}>
              Các buổi học đã tham gia :{" "}
            </Typography.Title>

            <Row gutter={[24, 24]} wrap>
              {statInformation?.atendedMeetings?.length > 0 ? (
                statInformation?.atendedMeetings?.map((item, index) => {
                  const {
                    name,
                    content,
                    scheduleStart,
                    scheduleEnd,
                    start,
                    end,
                    countMember,
                  } = item;

                  return (
                    <Col span={18} key={index}>
                      <Card size="small">
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          width={"100%"}
                          gap={"1rem"}
                        >
                          <Space size="small" direction="vertical">
                            <Typography.Text style={{ fontWeight: "bold" }}>
                              {name}
                            </Typography.Text>
                            <Space size="small">
                              <Typography.Text style={{ fontWeight: "600" }}>
                                Nội dung
                              </Typography.Text>
                              <Typography.Text>{content}</Typography.Text>
                            </Space>

                            {scheduleStart && (
                              <Space size="small">
                                <Typography.Text style={{ fontWeight: "600" }}>
                                  Dự kiến:
                                </Typography.Text>
                                {/* {scheduleStart && (
                                  <Typography.Text>
                                    {dayjs(scheduleStart).format(FULL_DATETIME_FORMAT)}
                                  </Typography.Text>
                                )} */}
                                <Typography component={"span"}>
                                  {/* {" "}{splitISO(scheduleStart)} */}
                                  {` ${splitISO(
                                    scheduleStart
                                  )} - ${splitISOTimeOnly(scheduleEnd)}`}
                                </Typography>
                                {/* 
                                {scheduleEnd && (
                                  <Typography component={"span"}>
                                    {" - "}
                                    {splitISOTimeOnly(scheduleEnd)}
                                  </Typography>
                                )}
                                 */}
                              </Space>
                            )}
                            {start && (
                              <Space size="small">
                                <Typography.Text style={{ fontWeight: "600" }}>
                                  Diễn ra:
                                </Typography.Text>
                                <Typography component={"span"}>
                                  {` ${splitISO(start)} - ${splitISOTimeOnly(
                                    end
                                  )}`}
                                </Typography>
                              </Space>
                            )}

                            <Typography.Text>
                              {countMember} người tham gia
                            </Typography.Text>
                          </Space>

                          <Space size="small" direction="vertical">
                            <Button
                              type="primary"
                              onClick={() => onOpenHistoryChat(item)}
                              style={{ width: "100%" }}
                            >
                              Lịch sử chat
                            </Button>
                            <Button
                              onClick={() => onOpenHistoryVote(item)}
                              style={{ width: "100%" }}
                            >
                              Lịch sử dò bài
                            </Button>
                          </Space>
                        </Box>
                      </Card>
                    </Col>
                  );
                })
              ) : (
                <Col>
                  <Typography.Text>Hiện tại chưa có dữ liệu</Typography.Text>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Card>
    </Box>
  );
};

export default StudentCard;
