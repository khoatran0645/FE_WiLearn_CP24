import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  TimePicker,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { toast } from "react-toastify";
import { TIME_FORMAT } from "src/pages/studyGroup/Modal/ScheduleMeeting";
import LESSON_API from "src/services/api/students/LessonAPI";
import { fieldValue } from "src/utils/helper";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY/MM/DD";

const UpdateRoom = (
  { item, onRefreshGroup, groupInfo, onCancelMeeting, meetingId },
  ref
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const { isLoading, mutate } = useMutation(LESSON_API.UPDATE_ROOM, {
    onSuccess: () => {
      toast.success("Cập nhật lớp học thành công");
      form.resetFields();
      setIsOpen(false);
      onRefreshGroup();
    },
    onError: (errors) => {
      toast.error(errors.response.data[0]);
    },
  });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpen(true),
    };
  });

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days before today and today
    return (
      (current &&
        current <= new Date(new Date().getTime() - 24 * 60 * 60 * 1000)) ||
      current.year() > 2100
    );
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
    return `${dateParts[2]}/${dateParts[1]} ${timeParts[0]}:${timeParts[1]}`;
  };
  const splitISOTime = (isoDate) => {
    if (!isoDate) {
      return "null";
    }
    const isoParts = isoDate.split("T");
    // const dateParts = isoParts[0].split('-');
    // console.log('dateParts', dateParts);
    // const timeParts = isoParts[1].split(':');
    // console.log('timeParts', timeParts)
    return isoParts[1];
  };
  useEffect(() => {
    if (Object.keys(item).length > 0) {
      // const startTime = dayjs(item.scheduleStart).format(TIME_FORMAT);
      console.log("updateroom", item.scheduleStart);
      const startTime = splitISO(item.scheduleStart);
      // const endTime = dayjs(item.scheduleEnd).format(TIME_FORMAT);
      const endTime = splitISO(item.scheduleEnd);

      form.setFieldsValue({
        name: item.name,
        content: item.content,
        // scheduleStartTime: dayjs(startTime, TIME_FORMAT),
        // scheduleEndTime: dayjs(endTime, TIME_FORMAT),
        scheduleStartTime: splitISOTime(startTime),
        scheduleEndTime: splitISOTime(endTime),
        date: dayjs(item.scheduleStart, dateFormat),
      });
    }
  }, [item]);

  const onCloseModal = () => setIsOpen(false);

  const onFinish = (values) => {
    const scheduleStartTime = dayjs(values.scheduleStartTime).format(
      TIME_FORMAT
    );
    const scheduleEndTime = dayjs(values.scheduleEndTime).format(TIME_FORMAT);

    mutate({
      id: item.id,
      name: values.name,
      content: values.content,
      date: values.date,
      scheduleStartTime,
      scheduleEndTime,
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onCloseModal}
      centered
      footer={null}
      title={
        <Typography.Title level={4}>
          Cập nhật thông tin lớp học
        </Typography.Title>
      }
    >
      <Form
        onFinish={onFinish}
        requiredMark={false}
        layout="vertical"
        size="middle"
        form={form}
      >
        <Row gutter={[14, 14]}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Tên lớp học"
              rules={[fieldValue.required]}
            >
              <Input placeholder="Nhập tên lớp học" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="content"
              label="Nội dung buổi học"
              rules={[fieldValue.required]}
            >
              <Input placeholder="Nhập nội dung học" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="date"
              label="Ngày học"
              rules={[fieldValue.required]}
            >
              <DatePicker
                placeholder="Chọn ngày học"
                style={{ width: "100%" }}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="scheduleStartTime"
              label="Thời gian bắt đầu"
              rules={[fieldValue.required]}
            >
              <TimePicker
                style={{ width: "100%" }}
                placeholder="Chọn thời gian bắt đầu"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="scheduleEndTime"
              label="Thời gian kết thúc"
              rules={[fieldValue.required]}
            >
              <TimePicker
                style={{ width: "100%" }}
                placeholder="Chọn thời gian kết thúc"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"end"}
              width={"100%"}
              gap={"1rem"}
            >
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Cập nhật lớp học
              </Button>

              <Button
                onClick={() => onCancelMeeting(groupInfo.members, meetingId)}
                onRefreshGroup={onRefreshGroup}
              >
                Hủy buổi
              </Button>
            </Box>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(UpdateRoom);
