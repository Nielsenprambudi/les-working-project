import http from '../../helpers/http';

export default {
  getCart: (page, limit) => ({
    type: 'CART_GET',
    payload: http.get(`v1/cart?page=${page}&limit=${limit}`),
  }),
  cartCheck: data => ({
    type: 'CART_CHECK',
    payload: data,
  }),
  cartConfirmAdd: data => ({
    type: 'CART_CONFIRM_ADD',
    payload: data,
  }),
  cartSum: data => ({
    type: 'CART_SUM',
    payload: data.reduce((a, b) => a + b, 0),
  }),
  addCart: data => ({
    type: 'CART_ADD',
    payload: http.post('v1/cart', data),
  }),
  requestMaterial: (data, id) => ({
    type: 'REQUEST_MATERIAL',
    payload: http.patch(`v1/cart/request-materi/${id}`, data),
  }),
  deleteCart: data => ({
    type: 'CART_DELETE',
    payload: http.post('v1/reason', data),
  }),
  addSchedule: data => ({
    type: 'ADD_SCHEDULE',
    payload: http.post('v1/schedule', data),
  }),
  dataSchedule: data => ({
    type: 'SCHEDULE_LENGTH',
    payload: data,
  }),
  clear: () => ({
    type: 'CLEAR_CART',
  }),
  clearAdd: () => ({
    type: 'CLEAR_ADD',
  }),
  clearRequest: () => ({
    type: 'CLEAR_REQUEST',
  }),
  clearDelete: () => ({
    type: 'CLEAR_DELETE',
  }),
};

// payload: http.post(`api/home?filterCurriculum=${filterCurriculum}&filterGender=${filterMapel}&filterKelas=${filterKelas}&filterKelas=${filterGender}&filterMapel=${filterMapel}`, data),
// /api/cart/cancle/