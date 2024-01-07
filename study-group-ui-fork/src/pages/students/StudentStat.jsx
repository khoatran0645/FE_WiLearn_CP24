import { Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Col, Select, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ParentStatCard from "src/modules/parents/pages/stats/StatCard";
import NewStudentStat from "src/modules/students/pages/newStats";
import {
  StudentCard,
  StudentStatHeader,
} from "src/modules/students/pages/stats";
import PARENT_STAT_API from "src/services/api/parents/StatApi";
import STUDENT_API from "src/services/api/students/StudentAPI";

const StudentStat = () => {
  const userProfile = useSelector((state) => state?.auth?.userInfo);
  const [stats, setStats] = useState([]);
  const [studentSelect, setStudentSelect] = useState([]);
  const [studentIsChoose, setStudentIsChoose] = useState(-1);

  const { isLoading, mutate } = useMutation(STUDENT_API.GET_STUDENT_MONTHS, {
    onSuccess: (response) => {
      setStats(response);
      console.log(response);
    },
    onError: () => {
      console.error("The client can't get stat info of the students");
    },
  });
  const onChangeStudentSelect = (value) => {
    setStudentIsChoose(value);
  };
  const { refetch } = useQuery(
    ["student-by-parents"],
    PARENT_STAT_API.GET_STUDENT_BY_PARENTS,
    {
      onSuccess: (values) => {
        const convertStudentSelect = values.map((student) => {
          return {
            label: student.studentUserName + " - " + student.studentFullName,
            value: student.id,
          };
        });

        setStudentSelect(convertStudentSelect);
      },
    }
  );
  useEffect(() => {
    if (studentIsChoose) {
      mutate(studentIsChoose);
    }
  }, [studentIsChoose]);
  // useEffect(() => {
  //   if (userProfile) {
  //     mutate(userProfile.id);
  //   }
  // }, []);
  useEffect(() => {
    if (userProfile) {
      mutate(userProfile.id);
    }
  }, []);
  //Features

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StudentStatHeader />
      </Grid>
      {userProfile?.role === "Parent" ? (
        <>
          {" "}
          {isLoading === false ? (
            <Grid item xs={12}>
              <Col span={24} style={{ marginBottom: 20 }}>
                <Typography style={{ fontWeight: "600" }}>
                  Chọn học sinh
                </Typography>
                <Select
                  // onChange={handleChange}
                  style={{ width: "20%" }}
                  options={studentSelect}
                  onChange={onChangeStudentSelect}
                />
              </Col>
              <NewStudentStat
                statInfo={stats}
                studentIsChoose={studentIsChoose}
              />
              <ParentStatCard studentIsChoose={studentIsChoose} />
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              gap={2}
              minHeight={"80vh"}
            >
              <Spin size="large" />
              <Typography.Text style={{ fontWeight: "normal" }}>
                Đang tải dữ liệu thống kê ...{" "}
              </Typography.Text>
            </Grid>
          )}
        </>
      ) : (
        <>
          {isLoading === false ? (
            <Grid item xs={12}>
              <NewStudentStat statInfo={stats} />
              <StudentCard />
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              gap={2}
              minHeight={"80vh"}
            >
              <Spin size="large" />
              <Typography.Text style={{ fontWeight: "normal" }}>
                Đang tải dữ liệu thống kê ...{" "}
              </Typography.Text>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default StudentStat;
