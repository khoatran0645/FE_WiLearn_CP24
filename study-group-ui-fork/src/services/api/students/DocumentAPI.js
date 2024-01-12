import client from 'src/common/client';
import {
  ACCEPT_DOCUMENT,
  API_GROUP_JOINED,
  CREATE_DOCUMENT,
  DELETE_DOCUMENT,
  GET_LIST_DOCUMENTS
} from 'src/common/constants';

const DOCUMENT_API = {
  GET_LIST: () => client.get(GET_LIST_DOCUMENTS),
  CREATE: (params) => client.post(`${CREATE_DOCUMENT}/${params.groupId}`, params.file),
  GET_GROUP_MEMBER: () => client.get(API_GROUP_JOINED),
  ACCEPT_FILE: (params) =>
    client.put(`${ACCEPT_DOCUMENT}?id=${params.id}&approved=${params.approved}`),
  DELETE_FILE: (id) => client.delete(`${DELETE_DOCUMENT}?id=${id}`)
};

export default DOCUMENT_API;
