import { Box } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Modal, Row, Space, Typography } from "antd";
import React, {
  useState,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { toast } from "react-toastify";
import NotFound from "src/common/NotFound";
import SETTING_API from "src/services/api/parents/SettingAPI";

const ParentWaitingList = ({ onRefreshPage }, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [parentList, setParentList] = useState([]);
  const { refetch } = useQuery(
    ["parent-waiting-list"],
    SETTING_API.PARENT_WAITING_LIST,
    {
      enabled: false,
      onSuccess: (values) => {
        setParentList(values);
      },
    }
  );
  const { mutate: mutateAcceptParent } = useMutation(
    SETTING_API.ACCEPT_PARENT,
    {
      onSuccess: () => {
        toast.success("Chấp nhận phụ huynh thành công");
        setIsOpenModal(false);
        refetch();
        onRefreshPage();
      },
    }
  );
  const { mutate: mutateDeclineParent } = useMutation(
    SETTING_API.DECLINE_PARENT,
    {
      onSuccess: () => {
        toast.success("Từ chối phụ huynh thành công");
        setIsOpenModal(false);
        refetch();
        onRefreshPage();
      },
    }
  );

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  useEffect(() => {
    refetch();
  }, []);

  const onCloseModal = () => setIsOpenModal(false);
  const onAcceptParent = (parentId) => {
    mutateAcceptParent(parentId);
  };
  const onDeclineParent = (parentId) => {
    mutateDeclineParent(parentId);
  };

  return (
    <Modal
      centered
      open={isOpenModal}
      onCancel={onCloseModal}
      footer={null}
      width={650}
      title={<Typography.Title level={5}>Danh sách phụ huynh</Typography.Title>}
    >
      {parentList.length > 0 ? (
        <Row gutter={[10, 10]}>
          {parentList.map((item, index) => {
            return (
              <Col key={index} span={24}>
                <Card size="small">
                  <Row gutter={[10, 10]}>
                    <Col span={18}>
                      <Space size="small" direction="vertical">
                        <Space size="small">
                          <Typography.Title level={5}>
                            Tên đầy đủ:{" "}
                          </Typography.Title>
                          <Typography.Title level={5}>
                            {item.parentFullName}
                          </Typography.Title>
                        </Space>

                        <Space size="small" wrap>
                          <Space size="small">
                            <Typography.Text>Email: </Typography.Text>
                            <Typography.Text>
                              {item.parentEmail}{" "}
                            </Typography.Text>
                          </Space>
                          <Typography.Text>{" - "}</Typography.Text>

                          <Space size="small">
                            <Typography.Text>Tên phụ huynh: </Typography.Text>
                            <Typography.Text>
                              {item.parentUserName}{" "}
                            </Typography.Text>
                          </Space>
                        </Space>
                      </Space>
                    </Col>
                    <Col span={6}>
                      <Box
                        display={"flex"}
                        alignItems={"end"}
                        justifyContent={"center"}
                        flexDirection={"column"}
                        gap={1}
                      >
                        <Button
                          style={{ width: "100%" }}
                          type="primary"
                          onClick={() => onAcceptParent(item.id)}
                        >
                          Chấp nhận
                        </Button>
                        <Button
                          onClick={() => onDeclineParent(item.id)}
                          style={{ width: "100%" }}
                        >
                          Từ chối
                        </Button>
                      </Box>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <NotFound />
      )}
    </Modal>
  );
};

export default forwardRef(ParentWaitingList);
