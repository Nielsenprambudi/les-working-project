import http from '../../helpers/http';

export default {
  getSliders: () => ({
    type: 'SLIDER',
    payload: http.get('v1/slider?size=100&page=1'),
  }),
  setWalkthrough: walk => ({
    type: 'WALKTHROUGH',
    payload: walk,
  }),
  getDetailTutor: (token, id) => ({
    type: 'DETAIL_TUTOR',
    payload: http(token).post(`api/teacher/profile/${id}`),
  }),
  getJadwalGuru: (token, data) => ({
    type: 'JADWAL_TUTOR',
    payload: http(token).post('/api/getschedule', data),
  }),
  patchFcm: (token, data) => ({
    type: 'FCM_TOKEN',
    payload: http(token).patch('/api/profile/fcm-token', data),
  }),
  deleteFcm: (token, data) => ({
    type: 'FCM_TOKEN_DELETE',
    payload: http(token).delete(`api/fcm/${data}`),
  }),
  fcmToken: data => ({
    type: 'FCM_TOKEN_DATA',
    payload: data,
  }),
  visible: data => ({
    type: 'VISIBLE_BERANDA',
    payload: data,
  }),
  clearVisible: () => ({
    type: 'CLEAR_VISIBLE',
  }),
  clearBeranda: () => ({
    type: 'CLEAR_BERANDA',
  }),
  clear: () => ({
    type: 'CLEAR',
  }),
};
