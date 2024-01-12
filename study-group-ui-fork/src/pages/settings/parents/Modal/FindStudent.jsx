import { CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Col, Input, Modal, Row, Space, Typography } from "antd";
import { debounce } from "debounce";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { toast } from "react-toastify";
import NotFound from "src/common/NotFound";
import SETTING_API from "src/services/api/parents/SettingAPI";

const FindStudent = ({ refreshPage }, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isLoading, mutate: mutateAcceptStudent } = useMutation(
    SETTING_API.ACCEPT_STUDENT,
    {
      onSuccess: () => {
        toast.success("Nhận học sinh thành công");
        refreshPage();
        setIsOpenModal(false);
      },
      onError: (error) => {
        const message = error.response.data;
        toast.error(message);
      },
    }
  );
  const { isLoading: isLoadingSearch, mutate: mutateSearchStudent } =
    useMutation(SETTING_API.SEARCH_STUDENT, {
      onSuccess: (values) => {
        setStudentIsFound(values);
      },
    });

  const [studentIsFound, setStudentIsFound] = useState([]);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);
  const onDebounceSearch = (event) => {
    const keySearch = event.target.value;
    mutateSearchStudent(keySearch);
  };

  const onAcceptStudent = (studentId) => {
    mutateAcceptStudent(studentId);
  };

  if (isLoadingSearch) {
    return <CircularProgress />;
  }

  return (
    <Modal
      centered
      open={isOpenModal}
      onCancel={onCloseModal}
      footer={null}
      width={1100}
      title={<Typography.Title level={5}>Tìm kiếm học sinh</Typography.Title>}
    >
      <Row gutter={[24, 24]} wrap>
        <Col span={24}>
          <Input.Search
            placeholder="Nhập tên con muốn tìm"
            onChange={debounce(onDebounceSearch, 1000)}
          />
        </Col>

        {studentIsFound.length > 0 ? (
          studentIsFound.map((student, index) => {
            return (
              <Col span={12} key={index}>
                <Card key={index} size="small">
                  <Row gutter={[10, 10]}>
                    <Col span={12}>
                      <Space size="small">
                        <Typography.Text>Id: </Typography.Text>
                        <Typography.Text>{student.id}</Typography.Text>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space size="small">
                        <Typography.Text>Họ và tên: </Typography.Text>
                        <Typography.Text>{student.fullName}</Typography.Text>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space size="small">
                        <Typography.Text>Tên học sinh: </Typography.Text>
                        <Typography.Text>{student.username}</Typography.Text>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space size="small">
                        <Typography.Text>Email: </Typography.Text>
                        <Typography.Text>{student.email}</Typography.Text>
                      </Space>
                    </Col>

                    <Col span={24}>
                      <Button
                        type="primary"
                        style={{ width: "100%" }}
                        loading={isLoading}
                        onClick={() => onAcceptStudent(student.id)}
                      >
                        Nhận học sinh
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })
        ) : (
          <NotFound />
        )}
      </Row>
    </Modal>
  );
};

export default forwardRef(FindStudent);
