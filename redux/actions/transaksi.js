import http from '../../helpers/http';

export default {
  getCoin: () => ({
    type: 'GET_COIN',
    payload: http.get('v1/coin'),
  }),
  getCoinDetail: id => ({
    type: 'GET_COIN_DETAIL',
    payload: http.get(`v1/coin?id=${id}`),
  }),
  topupCoin: data => ({
    type: 'TOP_UP_COIN',
    payload: http.post('v1/topup-coin', data),
  }),
  getTransaksi: (token, page, limit) => ({
    type: 'GET_TRANSAKSI',
    payload: http(token).get(
      `api/student/history/transaction?page=${page}&limit=${limit}`,
    ),
  }),
  getDetailTransaksi: (token, id) => ({
    type: 'DETAIL_GET_TRANSAKSI',
    payload: http(token).get(`api/student/history/transaction/${id}`),
  }),
  clearTransaksi: () => ({
    type: 'CLEAR_GET_TRANSAKSI',
  }),
  clearGetCoin: () => ({
    type: 'CLEAR_GET_COIN',
  }),
  clearTopup: () => ({
    type: 'CLEAR_TOP_UP',
  }),
};
