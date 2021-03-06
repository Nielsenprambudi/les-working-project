import {default as axios} from 'axios';
import publicUrl from './../publicUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async token => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    console.log('error set storage token', e);
  }
};

const storeReftoken = async ref => {
  try {
    await AsyncStorage.setItem('refreshtoken', ref);
  } catch (e) {
    console.log('error set storage refresh token', e);
  }
};

const checkrefreshToken = async () => {
  const getToken = await AsyncStorage.getItem('refreshtoken');
  return getToken;
};

const http = axios.create({
  baseURL: publicUrl.API_URL,
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    var reftoken = await AsyncStorage.getItem('refreshtoken');

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('check inside this');
      return http
        .post('v1/auth/refresh', {refreshToken: reftoken})
        .then(data => {
          console.log('check data refresh', data);
          storeToken(data?.data?.access.token);
          storeReftoken(data?.data?.refresh?.token);
          http.defaults.headers.common.Authorization =
            'Bearer ' + data?.data?.access?.token;
          originalRequest.headers.Authorization =
            'Bearer ' + data?.data?.access?.token;
          return http(originalRequest);
        });
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === 'v1/auth/login'
    ) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

// const http = (token = null) =>
//   axios.create({
//     baseURL: publicUrl.API_URL,
//     headers: {
//       Authorization: token ? `Bearer ${token}` : undefined,
//     },
//   });

export default http;
