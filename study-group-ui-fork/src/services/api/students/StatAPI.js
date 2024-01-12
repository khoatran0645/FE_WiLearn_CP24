import client from "src/common/client";
import { NEW_STAT_API } from "src/common/constants";

const STAT_API = {
  GET_STAT: (studentId) => client.get(`${NEW_STAT_API}/${studentId}`),
};

export default STAT_API;
