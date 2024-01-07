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
  Select,
  Switch,
  Typography,
  TimePicker,
} from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SETTING_API from "src/services/api/parents/SettingAPI";
import { fieldValue } from "src/utils/helper";

import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advanced from 'dayjs/plugin/advancedFormat';
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)
export const TIME_FORMAT = "HH:mm:ss";

const DATES_IN_WEEK = [
  {
    label: "Thứ hai",
    value: 2,
  },
  {
    label: "Thứ ba",
    value: 3,
  },
  {
    label: "Thứ tư",
    value: 4,
  },
  {
    label: "Thứ năm",
    value: 5,
  },
  {
    label: "Thứ sáu",
    value: 6,
  },
  {
    label: "Thứ bảy",
    value: 7,
  },
  {
    label: "Chủ nhật",
    value: 1,
  },
];

const ScheduleMeeting = ({ onRefresh }, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const params = useParams();
  const [form] = Form.useForm();

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days before today and today
    return (
      (current &&
        current <= new Date(new Date().getTime() - 24 * 60 * 60 * 1000)) ||
      current.year() > 2100
    );
  };

  const { mutate: mutateMeetingStudent } = useMutation(
    SETTING_API.MEETING_STUDENT,
    {
      onSuccess: () => {
        toast.success("Lập kế hoạch thành công");
        form.resetFields();
        setIsOpenModal(false);
        onRefresh();
      },
      onError: (error) => {
        const message = error.response.data[0];
        toast.error(message);
      },
    }
  );
  const { mutate: mutateMeetingStudentRepeat } = useMutation(
    SETTING_API.MEETING_STUDENT_REPEAT,
    {
      onSuccess: () => {
        toast.success("Lập kế hoạch lặp lại thành công");
        form.resetFields();
        setIsOpenModal(false);
        onRefresh();
      },
      onError: (error) => {
        const message = error.response.data[0];

        toast.error(message);
      },
    }
  );

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);

  const onSwitch = (value) => {
    setRepeat(value);
  };

  const onFinish = (values) => {
    const groupId = params.groupId;
    // const startTimeConvert = dayjs(values.scheduleStartTime).format(TIME_FORMAT);
    // const startTimeConvert = dayjs.tz(values.scheduleStartTime,'Asia/Ho_Chi_Minh').format(TIME_FORMAT);
    // const startTimeConvert = dayjs.tz(values.scheduleStartTime,'MST').format(TIME_FORMAT);
    const startTimeConvert = dayjs.tz(values.scheduleStartTime).format(TIME_FORMAT);
    const endTimeConvert = dayjs(values.scheduleEndTime).format(TIME_FORMAT);
    const dateLearn = dayjs(values.date).format();
    const rangeDateStart = dayjs(values.scheduleRangeStart).format();
    const rangeDateEnd = dayjs(values.scheduleRangeEnd).format();

    if (repeat) {
      mutateMeetingStudentRepeat({
        groupId,
        name: values.name,
        content: values.content,
        scheduleStartTime: startTimeConvert,
        scheduleEndTime: endTimeConvert,
        scheduleRangeStart: rangeDateStart,
        scheduleRangeEnd: rangeDateEnd,
        dayOfWeeks: values.dayOfWeeks,
      });
    } else {
      mutateMeetingStudent({
        groupId,
        name: values.name,
        content: values.content,
        date: dateLearn,
        scheduleStartTime: startTimeConvert,
        scheduleEndTime: endTimeConvert,
      });
    }
  };

  return (
    <Modal
      centered
      open={isOpenModal}
      onCancel={onCloseModal}
      footer={null}
      title={<Typography.Title level={5}>Lập kế hoạch</Typography.Title>}
    >
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Tên buổi học"
              rules={[fieldValue.required]}
            >
              <Input placeholder="Nhập tên buổi học" />
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
          {!repeat && (
            <Col span={24}>
              <Form.Item
                name="date"
                label="Ngày học"
                rules={[fieldValue.required]}
              >
                <DatePicker
                  disabledDate={disabledDate}
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày học"
                  disabled={repeat}
                />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
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
          <Col span={12}>
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
            <Switch
              checkedChildren={"Lặp lại lịch học"}
              unCheckedChildren={"Không lặp lại lịch học"}
              onChange={onSwitch}
            />
          </Col>

          {repeat && (
            <Col span={24}>
              <Row gutter={[10, 10]}>
                <Col span={24}>
                  <Form.Item
                    name="dayOfWeeks"
                    label="Các thứ trong tuần"
                    rules={[fieldValue.required]}
                  >
                    <Select
                      mode="multiple"
                      filterSearch
                      placeholder="Chọn các ngày để lặp lại trong tuần"
                      options={DATES_IN_WEEK}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="scheduleRangeStart"
                    label="Ngày bắt đầu"
                    rules={[fieldValue.required]}
                  >
                    <DatePicker
                      disabledDate={disabledDate}
                      style={{ width: "100%" }}
                      placeholder="Chọn ngày bắt đầu"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="scheduleRangeEnd"
                    label="Ngày kết thúc"
                    rules={[fieldValue.required]}
                  >
                    <DatePicker
                      disabledDate={disabledDate}
                      style={{ width: "100%" }}
                      placeholder="Chọn ngày kết thúc"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          )}
          <Col span={24}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"end"}
              width={"100%"}
              gap={1}
            >
              <Button type="primary" htmlType="submit" loading={false}>
                Lên kế hoạch
              </Button>
              <Button onClick={onCloseModal}>Đóng cửa sổ</Button>
            </Box>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(ScheduleMeeting);
