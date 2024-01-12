import client from "src/common/client";
import { API_PARENTS_STATS, API_PAST_MEETINGS } from "src/common/constants";

const PARENT_STAT_API = {
  GET_STUDENT_BY_PARENTS: () => client.get(API_PARENTS_STATS),
  GET_PAST_MEETINGS: (dayTime) => client.get(`${API_PAST_MEETINGS}/${dayTime}`),
};

export default PARENT_STAT_API;
