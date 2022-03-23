import http from '../../helpers/http';

export default {
  getRiwayat: (token, page, limit) => ({
    type: 'RIWAYAT_GET',
    payload: http(token).get(
      `api/student/history/les?page=${page}&limit=${limit}`,
    ),
  }),
  getRiwayatPesanan: (token, page, limit) => ({
    type: 'RIWAYAT_PESANAN',
    payload: http(token).get(
      `api/student/history/order?page=${page}&limit=${limit}`,
    ),
  }),
  addRating: (token, id, schedule, data) => ({
    type: 'ADD_RATING',
    payload: http(token).patch(`api/rating/${id}/${schedule}`, data),,
  }),
  scheduleId: data => ({
    type: 'SCHEDULEID',
    payload: data,
  }),
  clearSchedule: () => ({
    type: 'CLEAR_SCHEDULE',
  }),
  clearAdd: () => ({
    type: 'CLEAR_ADD',,
  }),
  clearLes: () => ({
    type: 'CLEAR_RIWAYAT_LES',
  }),
  clearPesanan: () => ({
    type: 'CLEAR_RIWAYAT_PESANAN',
  }),
};

// payload: http.post(`api/home?filterCurriculum=${filterCurriculum}&filterGender=${filterMapel}&filterKelas=${filterKelas}&filterKelas=${filterGender}&filterMapel=${filterMapel}`, data),
