export const CURRENCY = 'Rp ';

export const FORMATPRICE = x => {
  if (x > 0) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  } else {
    return x;
  }
};

export const FORMATLINK = x => {
  if (x != null) {
    if (x.includes('=')) {
      return x.split('=')[1];
    } else {
      return x.substring(17);
    }
  }
};

export const RETURNMONTH = x => {
  if (x.includes('0')) {
    let xnum = x.replace('0', '');
    let filter = MONTH.filter(y => y.id == parseInt(xnum));
    return filter[0].value;
  } else {
    let filter = MONTH.filter(y => y.id == parseInt(x));
    return filter[0].value;
  }
};

export const FORMATDATE = x => {
  let day = x.split(',');
  let date = day[1].split('-');

  return day[0] + ' ' + date[2] + ' ' + RETURNMONTH(date[1]) + ' ' + date[0];
};

export const MONTH = [
  {id: 1, value: 'Januari'},
  {id: 2, value: 'Februari'},
  {id: 3, value: 'Maret'},
  {id: 4, value: 'April'},
  {id: 5, value: 'Mei'},
  {id: 6, value: 'Juni'},
  {id: 7, value: 'Juli'},
  {id: 8, value: 'Agustus'},
  {id: 9, value: 'September'},
  {id: 10, value: 'Oktober'},
  {id: 11, value: 'November'},
  {id: 12, value: 'Desember'},
];

export const TYPE = [
  {id: 'private', value: 'private'},
  {id: 'group', value: 'group'},
];

export const blue = '#193c58';
export const yellow = '#e4c44c';
export const orange = '#de723f';
export const grey = '#e2e2e2';
export const greydark = '#808080';
export const green = '#459c8e';

export const MIDTRANS_SERVER_KEY_PROD = 'Mid-server-AAst53-ghqJd3_r_5pOPzY10';
export const MIDTRANS_CLIENT_KEY_PROD = 'Mid-client-SKoDMY3SawX02itt';
export const MIDTRANS_SERVER_KEY_DEV = 'SB-Mid-server-5qtJYegxLC6tOYMSdrldZOyZ';
export const MIDTRANS_CLIENT_KEY_DEV = 'SB-Mid-client-q5IIrrIOkNz9aiZ6';
