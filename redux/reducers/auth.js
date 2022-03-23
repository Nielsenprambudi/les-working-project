import http from '../../helpers/http';
const initialState = {
  token: null,
  refreshToken: null,
  alertMsg: '',
  alertMsgErr: '',
  isLogin: false,
  isLoadingLogin: false,
  isErrorLogin: false,
  isLoginGoogle: false,
  isLoadingLoginGoogle: false,
  isErrorLoginGoogle: false,
  isLoadingRegister: false,
  isErrorRegister: false,
  isRegister: false,
  isLoadingRegisterNumber: false,
  isErrorRegisterNumber: false,
  isRegisterNumber: false,
  createSucces: false,
  isErrorLupaPass: false,
  isLupaPass: false,
  isLoadingLupaPass: false,
  isErrorRefresh: false,
  isVerified: false,
  isRefresh: false,
  data: null,
  isErrorGantiPass: false,
  isGantiPass: false,
  isLoadingGantiPass: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING': {
      return {
        ...state,
        isLoadingLogin: true,
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        isLoadingLogin: false,
        isErrorLogin: true,
        alertMsgErr: action.payload.response.data.message,
      };
    }
    case 'LOGIN_FULFILLED': {
      return {
        ...state,
        isErrorLogin: false,
        isLoadingLogin: false,
        isLogin: true,
        token: action?.payload?.data?.data?.access?.token,
        refreshToken: action?.payload?.data?.data?.refresh?.token,
        data: action?.payload?.data?.data?.user,
        alertMsg: 'Login Succesfully',
      };
    }
    case 'LOGIN_GOOGLE_PENDING': {
      return {
        ...state,
        isLoadingLoginGoogle: true,
      };
    }
    case 'LOGIN_GOOGLE_REJECTED': {
      return {
        ...state,
        isLoadingLoginGoogle: false,
        isErrorLoginGoogle: true,
        alertMsgErr: action.payload.response.data.message,
      };
    }
    case 'LOGIN_GOOGLE_FULFILLED': {
      return {
        ...state,
        isErrorLoginGoogle: false,
        isLoadingLoginGoogle: false,
        isLoginGoogle: true,
        token: action?.payload?.data?.data?.access?.token,
        refreshToken: action?.payload?.data?.data?.refresh?.token,
        data: action?.payload?.data?.data?.user,
        alertMsg: 'Login Succesfully',
      };
    }
    case 'REGISTER_PENDING': {
      return {
        ...state,
        isLoadingRegister: true,
      };
    }
    case 'REGISTER_REJECTED': {
      return {
        ...state,
        isLoadingRegister: false,
        isErrorRegister: true,
        isRegister: false,
        createSucces: false,
        alertMsgErr: action.payload.response.data.message,
      };
    }
    case 'REGISTER_FULFILLED': {
      return {
        ...state,
        isLoadingRegister: false,
        isErrorRegister: false,
        isRegister: true,
        alertMsg: action.payload.data.message,
        createSucces: true,
      };
    }
    case 'REGISTER_PHONE_NUMBER_PENDING': {
      return {
        ...state,
        isLoadingRegisterNumber: true,
      };
    }
    case 'REGISTER_PHONE_NUMBER_REJECTED': {
      return {
        ...state,
        isLoadingRegisterNumber: false,
        isErrorRegisterNumber: true,
        isRegisterNumber: false,
        createSucces: false,
        alertMsgErr: action.payload.response.data.message,
      };
    }
    case 'REGISTER_PHONE_NUMBER_FULFILLED': {
      return {
        ...state,
        isLoadingRegisterNumber: false,
        isErrorRegisterNumber: false,
        isRegisterNumber: true,
        alertMsg: action.payload.data.message,
        createSucces: true,
      };
    }

    case 'LUPA_PASS_PENDING': {
      return {
        ...state,
        isLoadingLupaPass: true,
      };
    }
    case 'LUPA_PASS_REJECTED': {
      return {
        ...state,
        isErrorLupaPass: true,
        isLupaPass: false,
        isLoadingLupaPass: false,
        alertMsgErr: action.payload.response.data.message,
      };
    }
    case 'LUPA_PASS_FULFILLED': {
      return {
        ...state,
        isErrorLupaPass: false,
        isLupaPass: true,
        isLoadingLupaPass: false,
      };
    }
    case 'GANTI_PASS_PENDING': {
      return {
        ...state,
        isLoadingGantiPass: true,
      };
    }
    case 'GANTI_PASS_REJECTED': {
      return {
        ...state,
        isLoadingGantiPass: false,
        isErrorGantiPass: true,
      };
    }
    case 'GANTI_PASS_FULFILLED': {
      return {
        ...state,
        isLoadingGantiPass: false,
        isErrorGantiPass: false,
        isGantiPass: true,
      };
    }
    case 'CLEAR_GANTI_PASS': {
      return {
        ...state,
        isLoadingGantiPass: false,
        isErrorGantiPass: false,
        isGantiPass: false,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isLoading: false,
        isErrorRegister: false,
        isErrorRefresh: false,
        isLogin: false,
        token: '',
        alertMsg: '',
        isVerified: false,
      };
    }
    case 'CLEAR_LOGIN': {
      return {
        ...state,
        isErrorLogin: false,
        isLoadingLogin: false,
        isLogin: false,
        isErrorLoginGoogle: false,
        isLoadingLoginGoogle: false,
        isLoginGoogle: false,
        alertMsg: '',
        isLoadingRegister: false,
        isErrorRegister: false,
        createSucces: false,
        isLupaPass: false,
        isErrorLupaPass: false,
      };
    }
    case 'CLEAR_REGISTER': {
      return {
        ...state,
        alertMsg: '',
        isLoadingRegister: false,
        isErrorRegister: false,
        createSucces: false,
        isLoadingRegisterNumber: false,
        isErrorRegisterNumber: false,
        isRegisterNumber: false,
      };
    }
    default: {
      return state;
    }
  }
};
