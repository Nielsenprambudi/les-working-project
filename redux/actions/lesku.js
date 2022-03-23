import http from '../../helpers/http';

export default {
  getLesku: (token, data,page,limit) => ({
    type: 'LESKU_GET',
    payload: http(token).post(`api/lesku?page=${page}&limit=${limit}`, data),
  }),
  getMateri: (token,id) => ({
    type:'GET_MATERI',
    payload:http(token).get(`api/requestmateri/${id}`)
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
  clearReq: () => ({
    type: 'CLEAR_REQ',
  }),
};
