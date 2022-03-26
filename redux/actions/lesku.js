import http from '../../helpers/http';

export default {
  getSchedule: (page, limit) => ({
    type: 'GET_SCHEDULE',
    payload: http.get(`v1/schedule/my?page=${page}&limit=${limit}`),
    // payload: http.post('v1/schedule/my'),
  }),
  getMateri: (token, id) => ({
    type: 'GET_MATERI',
    payload: http(token).get(`api/requestmateri/${id}`),
  }),
  addMateri: (token, data) => ({
    type: 'ADD_MATERI',
    payload: http(token).post('api/requestmateri', data),
  }),
  clearAdd: () => ({
    type: 'CLEAR_ADD',
  }),
  clear: () => ({
    type: 'CLEAR_LESKU',
  }),
  clearSchedule: () => ({
    type: 'CLEAR_SCHEDULE',
  }),
  clearReq: () => ({
    type: 'CLEAR_REQ',
  }),
};
