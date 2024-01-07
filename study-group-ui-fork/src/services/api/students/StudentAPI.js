import {
  API_DELETE_MEETING,
  API_FORGOT_PASSWORD,
  API_LIST_STUDENT_PARENT,
  API_STUDENTS_STATS,
  DELETE_MEMBER,
} from "src/common/constants";
import client from "src/common/client";

const STUDENT_API = {
  GET_STUDENT_STATS: (params) =>
    client.get(`${API_STUDENTS_STATS}/${params.studentId}/${params.month}`),

  FORGOT_PASSWORD: (email) =>
    client.get(`${API_FORGOT_PASSWORD}?email=${email}`),

  REMOVE_STUDENT: (params) =>
    client.delete(
      `${DELETE_MEMBER}/${params.groupId}/Account/${params.banAccId}`
    ),
  GET_STUDENT_MONTHS: (studentId) =>
    client.get(`${API_STUDENTS_STATS}/${studentId}`),
  REMOVE_MEETING: (params) => {
    client.delete(`${API_DELETE_MEETING}/${params}`);
  },
  GET_LIST_CHILDREN: () => {
    client.get(`${API_LIST_STUDENT_PARENT}`);
  },
};

export default STUDENT_API;
