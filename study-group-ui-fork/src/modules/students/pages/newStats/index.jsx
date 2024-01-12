import { Col, DatePicker, Row, Select } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  AttendImage,
  LessonImage,
  MissAttendImage,
  VoteImage,
} from "src/assets/images";
import CardStatistic from "src/pages/students/CardStatistic";
import { Column, Pie, Line } from "@ant-design/plots";
import dayjs from "dayjs";

const NewStudentStat = ({ statInfo, studentIsChoose }) => {
  const [columnsChart, setColumnsChart] = useState({});
  const [lineChart, setLineChart] = useState({});
  const [pieChart, setPieChart] = useState({});
  const [cardStat, setCardStat] = useState({
    totalMeetingsCount: 0,
    atendedMeetingsCount: 0,
    missedMeetingsCount: 0,
    averageVoteResult: 0,
  });

  useEffect(() => {
    if (statInfo) {
      onAccumulatorStats();
    }
  }, [statInfo, studentIsChoose]);

  const onAccumulatorStats = async () => {
    const initValue = {
      totalMeetingsCount: 0,
      atendedMeetingsCount: 0,
      missedMeetingsCount: 0,
      averageVoteResult: 0,
    };

    const totalMeetings = statInfo.reduce((accumulator, currentValue) => {
      const totalMeetingsCount =
        accumulator.totalMeetingsCount + currentValue.totalMeetingsCount;
      const atendedMeetingsCount =
        accumulator.atendedMeetingsCount + currentValue.atendedMeetingsCount;
      const missedMeetingsCount =
        accumulator.missedMeetingsCount + currentValue.missedMeetingsCount;
      const averageVoteResult =
        accumulator.averageVoteResult + currentValue.averageVoteResult;

      return {
        totalMeetingsCount,
        atendedMeetingsCount,
        missedMeetingsCount,
        averageVoteResult,
      };
    }, initValue);

    await onHandleLineChart();
    await onHandleColumnsChart();
    await onHandlePieChart(totalMeetings);
    await setCardStat(totalMeetings);
  };

  const onHandleLineChart = () => {
    if (statInfo) {
      const dataStat = [];

      for (let i = 0; i < statInfo.length; i++) {
        const value = statInfo[i];
        const monthYear = dayjs(value.month).format("MM-YYYY");

        const totalMeeting = value.totalMeetingsCount;
        const attend = value.atendedMeetingsCount;
        const missAttend = value.missedMeetingsCount;
        const averageMeeting = value.averageVoteResult;
        const totalMeetingTime = value.totalMeetingTme;

        // Tách giờ, phút và giây từ chuỗi
        const [hours, minutes, seconds] = totalMeetingTime
          .split(":")
          .map(Number);

        // Tính toán số giờ bằng cách thêm giờ và một phần của phút và giây
        const totalHours = hours + minutes / 60 + seconds / 3600;
        const finalHours = parseFloat(totalHours.toFixed(2));
        // Tách giờ, phút và giây từ chuỗi

        // Tách giờ và phút từ chuỗi

        const totalMeetingData = {
          name: "Thời gian học từng tháng (giờ)",
          time: monthYear,
          amount: finalHours,
        };

        // const attendMeetingData = {
        //   name: "Số buổi học đã tham gia",
        //   time: monthYear,
        //   amount: attend,
        // };

        // const missAttendData = {
        //   name: "Số buổi học đã vắng",
        //   time: monthYear,
        //   amount: missAttend,
        // };

        // const averageData = {
        //   name: "Số trung bình bình chọn",
        //   time: monthYear,
        //   amount: averageMeeting,
        // };

        dataStat.push(
          totalMeetingData
          // attendMeetingData,
          // missAttendData,
          // averageData
        );
      }

      const config = {
        data: dataStat.reverse(),
        xField: "time",
        yField: "amount",
        seriesField: "name",
        smooth: true,
        animation: {
          appear: {
            animation: "path-in",
            duration: 5000,
          },
        },
      };

      setLineChart(config);
    }
  };

  const onHandleColumnsChart = () => {
    if (statInfo) {
      const dataStat = [];

      for (let i = 0; i < statInfo.length; i++) {
        const value = statInfo[i];
        const monthYear = dayjs(value.month).format("MM-YYYY");

        // const totalMeeting = value.totalMeetingsCount;
        const attend = value.atendedMeetingsCount;
        const missAttend = value.missedMeetingsCount;
        // const averageMeeting = value.averageVoteResult;

        // const totalMeetingData = {
        //   type: "Tổng số buổi học",
        //   time: monthYear,
        //   value: totalMeeting,
        // };

        const attendMeetingData = {
          type: "Số buổi học đã tham gia",
          time: monthYear,
          value: attend,
        };

        const missAttendData = {
          type: "Số buổi học đã vắng",
          time: monthYear,
          value: missAttend,
        };

        // const averageData = {
        //   type: "Số trung bình bình chọn",
        //   time: monthYear,
        //   value: averageMeeting,
        // };

        dataStat.push(
          // totalMeetingData,
          attendMeetingData,
          missAttendData
          // averageData
        );
      }

      const config = {
        data: dataStat.reverse(),
        xField: "time",
        yField: "value",
        seriesField: "type",
        isStack: true,
      };

      setColumnsChart(config);
    }
  };

  const onHandlePieChart = (values) => {
    const {
      atendedMeetingsCount,
      averageVoteResult,
      missedMeetingsCount,
      totalMeetingsCount,
    } = values;

    const data = [
      {
        type: "Tổng số buổi học",
        value: totalMeetingsCount,
      },
      {
        type: "Tổng số buổi học tham gia",
        value: atendedMeetingsCount,
      },
      {
        type: "Tổng số buổi học vắng mặt",
        value: missedMeetingsCount,
      },
      {
        type: "Trung bình số điểm dò bài",
        value: averageVoteResult,
      },
    ];

    const config = {
      appendPadding: 10,
      data,
      angleField: "value",
      colorField: "type",
      radius: 0.9,
      label: {
        type: "inner",
        offset: "-30%",
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: "center",
        },
      },
      interactions: [
        {
          type: "element-active",
        },
      ],
    };

    setPieChart(config);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Row gutter={[40, 40]} style={{ marginBottom: "1rem" }}>
      {/* <Col span={24}>
        <Select
          onChange={handleChange}
          style={{ width: "20%" }}
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
      </Col> */}
      <Col span={6}>
        <CardStatistic
          label="Tổng số buổi học"
          icon={LessonImage}
          subTitle={"buổi học"}
          totalValues={cardStat.totalMeetingsCount}
        />
      </Col>

      <Col span={6}>
        <CardStatistic
          label="Tổng số buổi học tham gia"
          icon={AttendImage}
          subTitle={"buổi học"}
          totalValues={cardStat.atendedMeetingsCount}
        />
      </Col>
      <Col span={6}>
        <CardStatistic
          label="Tổng số buổi học vắng mặt"
          subTitle={"buổi học"}
          icon={MissAttendImage}
          totalValues={cardStat.missedMeetingsCount}
        />
      </Col>
      <Col span={6}>
        <CardStatistic
          label="Tổng trung bình số bình chọn"
          icon={VoteImage}
          subTitle={"lượt chọn"}
          totalValues={cardStat.averageVoteResult}
        />
      </Col>
      {Object.keys(lineChart).length > 0 && (
        <Col span={24}>
          <Line {...lineChart} />
        </Col>
      )}
      {Object.keys(columnsChart).length > 0 && (
        <Col span={16}>
          <Column {...columnsChart} />
        </Col>
      )}
    </Row>
  );
};

export default NewStudentStat;
