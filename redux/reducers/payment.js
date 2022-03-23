const initialState = {
  namePayment: '',
  alertMsg: '',
  isLoadingCheckout: false,
  isErrorCheckout: false,
  isCheckout: false,
  dataPayment: [],
  isLoadingGetPembayaran: false,
  isErrorGetPembayaran: false,
  isGetPembayaran: false,
  dataPembayaran: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHECKOUT_PENDING': {
      return {
        ...state,
        isLoadingCheckout: true,
      };
    }
    case 'CHECKOUT_REJECTED': {
      return {
        ...state,
        isLoadingCheckout: false,
        isErrorCheckout: true,
        isCheckout: false,
      };
    }
    case 'CHECKOUT_FULFILLED': {
      return {
        ...state,
        isLoadingCheckout: false,
        isErrorCheckout: false,
        isCheckout: true,
        dataPayment: action.payload.data.data,
      };
    }

    case 'GET_PEMBAYARAN_PENDING': {
      return {
        ...state,
        isLoadingGetPembayaran: true,
      };
    }
    case 'GET_PEMBAYARAN_REJECTED': {
      return {
        ...state,
        isLoadingGetPembayaran: false,
        isErrorGetPembayaran: true,
        isGetPembayaran: false,
      };
    }
    case 'GET_PEMBAYARAN_FULFILLED': {
      return {
        ...state,
        isLoadingGetPembayaran: false,
        isErrorGetPembayaran: false,
        isGetPembayaran: true,
        dataPembayaran: action.payload.data.data,
      };
    }
    case 'ADD_PAYMENT_NAME': {
      return {
        ...state,
        namePayment: action.payload
      }
    }
    case 'CLEAR_PAYMENT': {
      return {
        ...state,
        alertMsg: '',
        isLoadingCheckout: false,
        isErrorCheckout: false,
        isCheckout: false,
        dataPayment: [],
        isLoadingGetPembayaran: false,
        isErrorGetPembayaran: false,
        isGetPembayaran: false,
      };
    }
    default: {
      return state;
    }
  }
};
