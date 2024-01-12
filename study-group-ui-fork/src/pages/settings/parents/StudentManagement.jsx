import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Input, Row, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import PARENT_STAT_API from "src/services/api/parents/StatApi";
import StudentItem from "./StudentItem";
import FindStudent from "./Modal/FindStudent";

const StudentManagement = () => {
  const [studentsList, setStudentsList] = useState([]);
  const findStudentRef = useRef();
  const { refetch, data } = useQuery(
    ["student-by-parents"],
    PARENT_STAT_API.GET_STUDENT_BY_PARENTS,
    {
      onSuccess: (values) => {
        setStudentsList(values);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  const onRefreshAllPage = () => {
    refetch();
  };

  const onFindStudent = () => {
    findStudentRef.current.openModal();
  };

  return (
    <Card>
      <FindStudent ref={findStudentRef} refreshPage={onRefreshAllPage} />

      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Typography.Title level={5}>Quản lý học sinh</Typography.Title>
            <Button type="primary" onClick={onFindStudent}>
              Tìm học sinh
            </Button>
          </Box>
        </Col>

        {/* <Col span={24}>
          <Input.Search
            placeholder="Nhập tên con muốn tìm"
            onChange={debounce(onDebounceSearch, 1000)}
          />
        </Col> */}

        <Col span={24}>
          <Row gutter={[10, 10]}>
            {studentsList.map((student, index) => {
              return (
                <StudentItem
                  key={index}
                  item={student}
                  refreshPage={onRefreshAllPage}
                />
              );
            })}
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default StudentManagement;
