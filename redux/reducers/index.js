import {combineReducers} from 'redux';
import auth from './auth';
import beranda from './beranda'
import filter from './filter'
import student from './student'
import cart from "./cart";
import riwayat from './riwayat'
import payment from './payment'
import lesku from './lesku'
import notifikasi from './notifikasi'
import publicBeranda from './public'
import transaksi from './transaksi'
import report from './report'

export default combineReducers({
  auth,
  beranda,
  filter,
  student,
  cart,
  lesku,
  riwayat,
  payment,
  notifikasi,
  publicBeranda,
  transaksi,
  report,
});
