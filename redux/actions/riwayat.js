import http from '../../helpers/http';

export default {
  getRiwayat: (page, limit) => ({
    type: 'RIWAYAT_GET',
    payload: http.get(`v1/schedule/history?page=${page}&limit=${limit}`),
  }),
  getRiwayatDetail: id => ({
    type: 'RIWAYAT_GET_DETAIL',
    payload: http.get(`v1/schedule/history-detail/${id}`),
  }),
  getRiwayatCoin: (page, limit) => ({
    type: 'RIWAYAT_COIN_GET',
    payload: http.get(
      `v1/transaction-coin/history?page=${page}&limit=${limit}`,
    ),
  }),
  getRiwayatDetailCoin: id => ({
    type: 'RIWAYAT_COIN_GET_DETAIL',
    payload: http.get(`v1/transaction-coin/history-detail/${id}`),
  }),
  getRiwayatPesanan: (token, page, limit) => ({
    type: 'RIWAYAT_PESANAN',
    payload: http(token).get(
      `api/student/history/order?page=${page}&limit=${limit}`,
    ),
  }),
  addRating: (token, id, schedule, data) => ({
    type: 'ADD_RATING',
    payload: http(token).patch(`api/rating/${id}/${schedule}`, data),
  }),
  scheduleId: data => ({
    type: 'SCHEDULEID',
    payload: data,
  }),
  clearSchedule: () => ({
    type: 'CLEAR_SCHEDULE',
  }),
  clearAdd: () => ({
    type: 'CLEAR_ADD',
  }),
  clearLes: () => ({
    type: 'CLEAR_RIWAYAT_LES',
  }),
  clearLesDetail: () => ({
    type: 'CLEAR_RIWAYAT_DETAIL',
  }),
  clearCoin: () => ({
    type: 'CLEAR_RIWAYAT_COIN',
  }),
  clearCoinDetail: () => ({
    type: 'CLEAR_RIWAYAT_COIN_DETAIL',
  }),
  clearPesanan: () => ({
    type: 'CLEAR_RIWAYAT_PESANAN',
  }),
};

// payload: http.post(`api/home?filterCurriculum=${filterCurriculum}&filterGender=${filterMapel}&filterKelas=${filterKelas}&filterKelas=${filterGender}&filterMapel=${filterMapel}`, data),
