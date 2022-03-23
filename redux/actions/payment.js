import http from '../../helpers/http';
import qs from 'qs';

export default {
    checkout: (auth,data) => ({
        type: 'CHECKOUT',
        payload: http(auth).post('/api/checkout', data)
    }),
    getPembayaran: (token) => ({
        type:'GET_PEMBAYARAN',
        payload: http(token).get('api/student/payment/confirm')
    }),
    addPaymentName :(data) => ({
    type:'ADD_PAYMENT_NAME',
    payload: data
    }),
    clear: () => ({
        type: 'CLEAR_PAYMENT',
    }),
};
