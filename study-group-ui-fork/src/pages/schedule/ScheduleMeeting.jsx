import React, { useEffect, useRef, useState } from "react";

import { Row, Col, Space, Calendar, Typography } from "antd";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import ScheduleDetail from "./Modal/ScheduleDetail";
import { useQuery } from "@tanstack/react-query";
import SETTING_API from "src/services/api/parents/SettingAPI";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectLists } from "../studyGroup/reducer";

const ScheduleMeeting = ({ schedulesItem }) => {
  const [scheduleItem, setScheduleItem] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [newSchedules, setNewSchedules] = useState([]);

  const { refetch } = useQuery(["all-meetings"], SETTING_API.GET_ALL_MEETINGS, {
    enabled: false,
    onSuccess: (values) => {
      const liveConvert = values.live.map((item) => {
        return {
          ...item,
          status: "LIVE",
        };
      });

      const scheduleConvert = values.schedule.map((item) => {
        return {
          ...item,
          status: "SCHEDULE",
        };
      });

      const pastConvert = values.past.map((item) => {
        return {
          ...item,
          status: "PAST",
        };
      });

      const result = [...pastConvert, ...liveConvert, ...scheduleConvert];
      const newResult = [...liveConvert, ...scheduleConvert];
      setSchedules(result);
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const detailRef = useRef();

  const getListData = (value) => {
    let listData = [];
    if (schedules) {
      for (let i = 0; i < schedules.length; i++) {
        const startTime = dayjs(schedules[i].scheduleStart);
        const endTime = dayjs(schedules[i].scheduleEnd);
        const dateMeet = startTime.date();
        const dateEndMeet = endTime.date();
        const monthMeet = startTime.month();
        const monthEndMeet = endTime.month();

        const status = schedules[i].status;

        if (
          dateMeet === value.date() &&
          monthMeet === value.month() &&
          dateEndMeet === value.date() &&
          monthEndMeet === value.month()
        ) {
          listData.push({
            hour: startTime.hour(),
            minutes: startTime.minute(),
            status,
            data: schedules[i],
          });
        }
      }
    }
    return listData || [];
  };
  
  const [chooseDate, setChooseDate] = useState([]);
  const openDetail = (item, date) => {
    setScheduleItem(item);
    setChooseDate(date);
    detailRef.current.openModal();
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);

    return (
      <Space
        direction="vertical"
        size="small"
        style={{ width: "100% " }}
        onClick={() => openDetail(newSchedules, `${value.date()}/${value.month()}`)}
      >
        {listData.map((item, index) => {
          return (
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={1}
              key={index}
              width={"100%"}
              padding={1}
              sx={{
                background:
                  item.status === "LIVE"
                    ? "#CBFFA9"
                    : item.status === "SCHEDULE"
                    ? "#FD8D14"
                    : "#F24C3D",
              }}
            >
              <Space size="small" style={{ width: "100%" }}>
                <i className="fi fi-rr-user-time"></i>
                <Typography.Text style={{ fontWeight: "600" }}>
                  {item.data.name}
                </Typography.Text>
              </Space>

              <Space size="small">
                <i className="fi fi-rr-calendar-clock mt-2"></i>
                <Typography.Text style={{ fontWeight: "600" }}>
                  {item.hour + ":" + item.minutes}
                </Typography.Text>
              </Space>
            </Box>
          );
        })}
      </Space>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };
  return (
    <Row gutter={[24, 24]}>
      <ScheduleDetail ref={detailRef} item={newSchedules} date={chooseDate}/>
      <Col span={24}>
        <Typography.Title level={4}>Lịch học</Typography.Title>
      </Col>

      <Col span={24}>
        <Calendar
          cellRender={cellRender}
          onSelect={(date, { source }) => {
            if (source === "date") {
              let newSche = schedules.filter(
                (sche) => new Date(sche.scheduleStart).getDate() == date.$D
              );
              setNewSchedules(newSche);
            }
          }}
        />
      </Col>
    </Row>
  );
};

export default ScheduleMeeting;
