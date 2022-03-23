const initialState = {
  alertMsg: '',
  alertMsgError: '',
  alertMsgSuccess: '',
  isLoadingCart: false,
  isLoadingCartAdd: false,
  isErrorCart: false,
  isErrorCartAdd: false,
  isCart: false,
  isCartAdd: false,
  isCartDelete: false,
  isLoadingCartDelete: false,
  isErrorCartDelete: false,
  data: [],
  subtotal: '',
  isLoadingCancel: false,
  isErrorCancel: false,
  isCancel: false,
  isLoadingCartConfirm: false,
  isErrorCartConfirm: false,
  isCartConfirm: false,
  isLoadingRequestMaterial: false,
  isErrorRequestMaterial: false,
  isRequestMaterial: false,
  isLoadingAddSchedule: false,
  isErrorAddSchedule: false,
  isAddSchedule: false,
  dataConfirm: [],
  cartConfirmList: [],
  dataSchedule: '',
  minimumPurchase: 0,
  totalData: 0,
  limit: 10,
  currentPage: 1,
  nextPage: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CART_GET_PENDING': {
      return {
        ...state,
        isLoadingCart: true,
      };
    }
    case 'CART_GET_REJECTED': {
      return {
        ...state,
        isLoadingCart: false,
        isErrorCart: true,
        isCart: false,
      };
    }
    case 'CART_GET_FULFILLED': {
      action.payload.data.data.forEach((item, i) => {
        item.check = false;
        item.cartItems.forEach((cart, y) => {
          cart.check = false;
        });
      });
      state.data.push(...action.payload.data.data);
      return {
        ...state,
        isLoadingCart: false,
        isErrorCart: false,
        isCart: true,
        data: state.data,
        limit: action.payload.data.limitPage,
        totalData: action.payload.data.totalData,
        currentPage: action.payload.data.currentPage,
        nextPage: action.payload.data.nextPage,
        subtotal: action.payload.data.total,
      };
    }
    case 'CART_CHECK': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'CART_SUM': {
      return {
        ...state,
        subtotal: action.payload,
      };
    }
    case 'REQUEST_MATERIAL_PENDING': {
      return {
        ...state,
        isLoadingRequestMaterial: true,
      };
    }
    case 'REQUEST_MATERIAL_REJECTED': {
      return {
        ...state,
        isLoadingRequestMaterial: false,
        isErrorRequestMaterial: true,
        isRequestMaterial: false,
        alertMsgError: action.payload.response.data.message,
      };
    }
    case 'REQUEST_MATERIAL_FULFILLED': {
      return {
        ...state,
        isLoadingRequestMaterial: false,
        isErrorRequestMaterial: false,
        isRequestMaterial: true,
        alertMsgSuccess: 'Berhasil Menambahkan Request Materi / Teman',
      };
    }
    case 'CART_GET_CONFIRM_PENDING': {
      return {
        ...state,
        isLoadingCartConfirm: true,
      };
    }
    case 'CART_GET_CONFIRM_REJECTED': {
      return {
        ...state,
        isLoadingCartConfirm: false,
        isErrorCartConfirm: true,
        isCartConfirm: false,
      };
    }
    case 'CART_GET_CONFIRM_FULFILLED': {
      return {
        ...state,
        isLoadingCartConfirm: false,
        isErrorCartConfirm: false,
        isCartConfirm: true,
        isCartDelete: false,
        isCartAdd: false,
        dataConfirm: action.payload.data.data,
      };
    }
    case 'CART_ADD_PENDING': {
      return {
        ...state,
        isLoadingCartAdd: true,
      };
    }
    case 'CART_ADD_REJECTED': {
      return {
        ...state,
        isLoadingCartAdd: false,
        isErrorCartAdd: true,
        isCartAdd: false,
        alertMsgError: action.payload.response.data.message,
      };
    }
    case 'CART_ADD_FULFILLED': {
      return {
        ...state,
        isLoadingCartAdd: false,
        isErrorCartAdd: false,
        isCartAdd: true,
        data: action.payload.data.data,
        alertMsgSuccess: action.payload.data.message,
      };
    }
    case 'ADD_SCHEDULE_PENDING': {
      return {
        ...state,
        isLoadingAddSchedule: true,
      };
    }
    case 'ADD_SCHEDULE_REJECTED': {
      return {
        ...state,
        isLoadingAddSchedule: false,
        isErrorAddSchedule: true,
        isAddSchedule: false,
        alertMsgError: action.payload.response.data.message,
      };
    }
    case 'ADD_SCHEDULE_FULFILLED': {
      return {
        ...state,
        isLoadingAddSchedule: false,
        isErrorAddSchedule: false,
        isAddSchedule: true,
        alertMsgSuccess: action.payload.data.message,
      };
    }
    case 'CART_DELETE_PENDING': {
      return {
        ...state,
        isLoadingCart: true,
      };
    }
    case 'CART_DELETE_REJECTED': {
      return {
        ...state,
        isLoadingCartDelete: false,
        isErrorCartDelete: true,
        isCartDelete: false,
        alertMsgError: action.payload.response.data.data,
      };
    }
    case 'CART_DELETE_FULFILLED': {
      return {
        ...state,
        isLoadingCartDelete: false,
        isErrorCartDelete: false,
        isCartDelete: true,
        alertMsgSuccess: 'Berhasil Menghapus Jadwal di Keranjang',
      };
    }
    case 'SCHEDULE_LENGTH': {
      return {
        ...state,
        dataSchedule: action.payload,
      };
    }
    case 'CLEAR_ADD': {
      return {
        ...state,
        isLoadingCart: false,
        isErrorCart: false,
        isErrorCartAdd: false,
        isCartAdd: false,
      };
    }
    case 'CLEAR_REQUEST': {
      return {
        ...state,
        isRequestMaterial: false,
        isLoadingRequestMaterial: false,
        isErrorRequestMaterial: false,
        alertMsgError: '',
        alertMsgSuccess: '',
      };
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        isCartDelete: false,
        isLoadingCart: false,
        isErrorCart: false,
        isErrorAddSchedule: false,
        isLoadingAddSchedule: false,
        isAddSchedule: false,
        isCartAdd: false,
        isCart: false,
        isCancel: false,
        isErrorCartDelete: false,
        isLoadingCartDelete: false,
        alertMsgError: '',
        alertMsgSuccess: '',
        data: [],
        dataConfirm: [],
        subtotal: 0,
        dataSchedule: '',
        minimumPurchase: 0,
      };
    }
    case 'CLEAR_DELETE': {
      return {
        ...state,
        isCartDelete: false,
        isErrorCartDelete: false,
        isLoadingCartDelete: false,
        isLoadingCart: false,
        alertMsgError: '',
      };
    }
    default: {
      return state;
    }
  }
};
