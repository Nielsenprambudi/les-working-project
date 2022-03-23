import http from '../../helpers/http';
// import qs from 'qs';

export default {
  login: data => ({
    type: 'LOGIN',
    payload: http.post('v1/auth/login', data),
  }),
  loginGoogle: data => ({
    type: 'LOGIN_GOOGLE',
    payload: http.post('v1/auth/google-student', data),
  }),
  register: data => ({
    type: 'REGISTER',
    payload: http.post('v1/auth/register', data),
  }),
  registerPhoneNumber: data => ({
    type: 'REGISTER_PHONE_NUMBER',
    payload: http.post('v1/auth/register-phone-number', data),
  }),
  lupaPass: data => ({
    type: 'LUPA_PASS',
    payload: http.post('v1/auth/forgot-password', data),
  }),
  gantiPass: (token, data) => ({
    type: 'GANTI_PASS',
    payload: http(token).patch('v1/student/changePassword', data),
  }),
  logout: () => ({
    type: 'LOGOUT',
  }),
  clear: () => ({
    type: 'CLEAR_LOGIN',
  }),
  clearRegister: () => ({
    type: 'CLEAR_REGISTER',
  }),
  clearGantiPass: () => ({
    type: 'CLEAR_GANTI_PASS',
  }),
};
