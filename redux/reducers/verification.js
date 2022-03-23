const initialState = {
  token: '',
  alertMsg: '',
  isLogin: false,
  isLoading: false,
  isErrorVerify: false,
  isVerified: false,
  secret:'',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'VERIFICATION_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'VERIFICATION_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isErrorVerify: true,
        isVerified: false,
      };
    }
    case 'VERIFICATION_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isErrorVerify: false,
        isVerified: true,
        token: action.payload.data.data.token,
        secret:action.payload.data.data.secret,
      };
    }
    case 'REFRESH_PENDING': {
      return {
        ...state,
        isLoadingRefresh: true,
      };
    }
    case 'REFRESH_REJECTED': {
      return {
        ...state,
        isLoadingRefresh: false,
        isErrorRefresh: true,
        isRefresh:false,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'REFRESH_FULFILLED': {
      return {
        ...state,
        isLoadingRefresh: false,
        isErrorRefresh: false,
        isRefresh:true,
        alertMsg: action.payload.response.data.message,
        token: action.payload.data.data.token,
        secret:action.payload.data.data.secret,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLogin: false,
        token: '',
        alertMsg: '',
        isVerified: false,
      };
    }
    case 'CLEAR_VERIFICATION': {
      return {
        ...state,
        isLoading: false,
        isErrorVerify: false,
        isVerified: false,
        token:'',
        secret:'',
      };
    }
    default: {
      return state;
    }
  }
};
