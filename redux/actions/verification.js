import http from '../../helpers/http';
import qs from 'qs';

export default {
  refreshToken: data => ({
    type: 'REFRESH',
    payload: http.post('api/refreshtoken', data),
  }),
  verification: data => ({
    type: 'VERIFICATION',
    payload: http.post('/api/verification', qs.stringify(data)),
  }),
  logout: () => ({
    type: 'LOGOUT',
  }),
  clear: () => ({
    type: 'CLEAR_VERIFICATION',
  }),
};
