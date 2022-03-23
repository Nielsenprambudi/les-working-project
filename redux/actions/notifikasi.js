import http from '../../helpers/http';

export default {
  getNotifikasi: (token,page,limit) => ({
    type: 'NOTIFIKASI_GET',
    payload: http(token).get(`api/my/notification?page=${page}&limit=${limit}`),
  }),
  deleeteNotifikasi: token => ({
    type: 'DELETE_NOTIFIKASI',
    payload: http(token).delete('api/my/notification'),
  }),
  getCountNotif : (token) => ({
    type: 'GET_COUNT',
    payload: http(token).get('/api/notif/count')
  }),
  count: (data) => ({
    type:'COUNT',
    payload:data,
  }),
  clear: () => ({
    type: 'CLEAR_NOTIFIKASI',
  }),
};
