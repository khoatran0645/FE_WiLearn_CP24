import client from 'src/common/client';
import { API_MEETING_NOW, API_SCHEDULE_MEETING } from 'src/common/constants';

const LESSON_API = {
  START_MEETING_INSTANT: (params) => client.post(API_MEETING_NOW, params),
  UPDATE_ROOM: (params) => client.put(`${API_SCHEDULE_MEETING}/${params.id}`, params)
};

export default LESSON_API;
