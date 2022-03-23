const initialState = {
  alertMsg: '',
  alertMsgError: '',
  alertMsgSuccess: '',
  isLoadingGetCoin: false,
  isErrorGetCoin: false,
  isGetCoin: false,
  isLoadingGetCoinDetail: false,
  isErrorGetCoinDetail: false,
  isGetCoinDetail: false,
  dataCoin: [],
  dataCoinDetail: [],
  isLoadingTopupCoin: false,
  isErrorTopupCoin: false,
  isTopupCoin: false,
  dataTopup: null,
  isLoadingGetTransaksi: false,
  isErrorGetTransaksi: false,
  isGetTransaksi: false,
  pagination: [],
  dataGetTransaksi: [],
  isLoadingDetailGetTransaksi: false,
  isErrorDetailGetTransaksi: false,
  isDetailGetTransaksi: false,
  dataDetailGetTransaksi: [],
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COIN_PENDING': {
      return {
        ...state,
        isLoadingGetCoin: true,
      };
    }
    case 'GET_COIN_REJECTED': {
      return {
        ...state,
        isLoadingGetCoin: false,
        isErrorGetCoin: true,
        isGetCoin: false,
        alertMsgError: action.payload.response.data.message,
      };
    }
    case 'GET_COIN_FULFILLED': {
      return {
        ...state,
        isLoadingGetCoin: false,
        isErrorGetCoin: false,
        isGetCoin: true,
        dataCoin: action.payload.data.data,
      };
    }
    case 'GET_COIN_DETAIL_PENDING': {
      return {
        ...state,
        isLoadingGetCoinDetail: true,
      };
    }
    case 'GET_COIN_DETAIL_REJECTED': {
      return {
        ...state,
        isLoadingGetCoinDetail: false,
        isErrorGetCoinDetail: true,
        isGetCoinDetail: false,
        alertMsgError: action.payload.response.data.message,
      };
    }
    case 'GET_COIN_DETAIL_FULFILLED': {
      return {
        ...state,
        isLoadingGetCoinDetail: false,
        isErrorGetCoinDetail: false,
        isGetCoinDetail: true,
        dataCoinDetail: action.payload.data.data,
      };
    }
    case 'TOP_UP_COIN_PENDING': {
      return {
        ...state,
        isLoadingTopupCoin: true,
      };
    }
    case 'TOP_UP_COIN_REJECTED': {
      return {
        ...state,
        isLoadingTopupCoin: false,
        isErrorTopupCoin: true,
        isTopupCoin: false,
        alertMsgError: action.payload.response.data.message,
      };
    }
    case 'TOP_UP_COIN_FULFILLED': {
      return {
        ...state,
        isLoadingTopupCoin: false,
        isErrorTopupCoin: false,
        isTopupCoin: true,
        dataTopup: action.payload.data.data,
      };
    }
    case 'GET_TRANSAKSI_PENDING': {
      return {
        ...state,
        isLoadingGetTransaksi: true,
      };
    }
    case 'GET_TRANSAKSI_REJECTED': {
      return {
        ...state,
        isLoadingGetTransaksi: false,
        isErrorGetTransaksi: true,
        isGetTransaksi: false,
      };
    }
    case 'GET_TRANSAKSI_FULFILLED': {
      return {
        ...state,
        isLoadingGetTransaksi: false,
        isErrorGetTransaksi: false,
        isGetTransaksi: true,
        pagination: action.payload.data,
        dataGetTransaksi: action.payload.data.data,
      };
    }
    case 'DETAIL_GET_TRANSAKSI_PENDING': {
      return {
        ...state,
        isLoadingDetailGetTransaksi: true,
      };
    }
    case 'DETAIL_GET_TRANSAKSI_REJECTED': {
      return {
        ...state,
        isLoadingDetailGetTransaksi: false,
        isErrorDetailGetTransaksi: true,
        isDetailGetTransaksi: false,
      };
    }
    case 'DETAIL_GET_TRANSAKSI_FULFILLED': {
      return {
        ...state,
        isLoadingDetailGetTransaksi: false,
        isErrorDetailGetTransaksi: false,
        isDetailGetTransaksi: true,
        dataDetailGetTransaksi: action.payload.data.data,
      };
    }
    case 'CLEAR_GET_TRANSAKSI': {
      return {
        ...state,
        dataGetTransaksi: [],
        dataDetailGetTransaksi: [],
        paginattion: [],
        isLoadingGetTransaksi: false,
        isErrorGetTransaksi: false,
        isGetTransaksi: false,
        isLoadingDetailGetTransaksi: false,
        isErrorDetailGetTransaksi: false,
        isDetailGetTransaksi: false,
      };
    }
    case 'CLEAR_GET_COIN': {
      return {
        ...state,
        isLoadingGetCoin: false,
        isErrorGetCoin: false,
        isGetCoin: false,
        isLoadingGetCoinDetail: false,
        isErrorGetCoinDetail: false,
        isGetCoinDetail: false,
        dataCoinDetail: [],
        dataCoin: [],
      };
    }
    case 'CLEAR_TOP_UP': {
      return {
        ...state,
        isLoadingTopupCoin: false,
        isErrorTopupCoin: false,
        isTopupCoin: false,
        alertMsgError: '',
        alertMsgSuccess: '',
      };
    }
    default: {
      return state;
    }
  }
};
