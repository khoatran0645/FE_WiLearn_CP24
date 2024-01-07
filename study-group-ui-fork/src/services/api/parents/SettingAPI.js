import client from 'src/common/client';
import {
  API_ACCEPT_PARENT,
  API_ACCEPT_STUDENT,
  API_ALL_MEETINGS,
  API_MEETING_REPEAT,
  API_PARENT_SETTINGS,
  API_PARENT_WAITING,
  API_REMOVE_PARENT,
  API_SCHEDULE_MEETING,
  API_SEARCH_STUDENT_BY_PARENTS
} from 'src/common/constants';

const SETTING_API = {
  PARENT_LIST: () => client.get(API_PARENT_SETTINGS),
  REMOVE_PARENT: (parentID) => client.delete(`${API_REMOVE_PARENT}/${parentID}`),
  PARENT_WAITING_LIST: () => client.get(API_PARENT_WAITING),
  ACCEPT_PARENT: (parentID) => client.put(`${API_ACCEPT_PARENT}/${parentID}/Accept`),
  DECLINE_PARENT: (parentID) => client.put(`${API_ACCEPT_PARENT}/${parentID}/Decline`),

  ACCEPT_STUDENT: (studentId) => client.post(`${API_ACCEPT_STUDENT}/${studentId}`),
  SEARCH_STUDENT: (studentName) =>
    client.get(`${API_SEARCH_STUDENT_BY_PARENTS}?search=${studentName}`),

  MEETING_STUDENT: (params) => client.post(API_SCHEDULE_MEETING, params),
  MEETING_STUDENT_REPEAT: (params) => client.post(API_MEETING_REPEAT, params),

  GET_ALL_MEETINGS: () => client.get(API_ALL_MEETINGS)
};

export default SETTING_API;
