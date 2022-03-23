const initialState = {
  token: '',
  alertMsg: '',
  isLoadingSlider: false,
  isSlider: false,
  isErrorSlider: false,
  dataSlider: [],
  isLoadingBeranda: false,
  isBeranda: false,
  isError: false,
  data: [],
  profilTeacher: [],
  isErrorTeacher: false,
  isDetailTeacher: false,
  isLoadingTeacher: false,
  isLoadingJadwal: false,
  isErrorJadwal: false,
  isJadwal: false,
  isExpired: false,
  jadwal: [],
  isErrorBeranda: false,
  isLoadingFCM: false,
  isErrorFCM: false,
  isFCM: false,
  isLoadingFCMdelete: false,
  isErrorFCMdelete: false,
  isFCMdelete: false,
  dataFcmToken: '',
  pagination: [],
  visible: false,
  firstWalk: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SLIDER_PENDING': {
      return {
        ...state,
        isLoadingSlider: true,
      };
    }
    case 'SLIDER_REJECTED': {
      return {
        ...state,
        isLoadingSlider: false,
        isErrorSlider: true,
        isSlider: false,
        alertMsg: action?.payload?.response?.data?.message,
      };
    }
    case 'SLIDER_FULFILLED': {
      return {
        ...state,
        isLoadingSlider: false,
        isErrorSlider: false,
        isSlider: true,
        dataSlider: action?.payload?.data?.data?.items,
      };
    }
    case 'WALKTHROUGH': {
      return {
        ...state,
        firstWalk: action?.payload,
      };
    }
    case 'BERANDA_PENDING': {
      return {
        ...state,
        isLoadingBeranda: true,
      };
    }
    case 'BERANDA_REJECTED': {
      return {
        ...state,
        isLoadingBeranda: false,
        isError: true,
        isErrorBeranda: true,
        isBeranda: false,
      };
    }
    case 'BERANDA_FULFILLED': {
      state.data.push(...action.payload.data.data);
      return {
        ...state,
        isLoadingBeranda: false,
        isErrorBeranda: false,
        isError: false,
        isBeranda: true,
        data: state.data,
        pagination: action.payload.data,
      };
    }
    case 'FCM_TOKEN_PENDING': {
      return {
        ...state,
        isLoadingFCM: true,
      };
    }
    case 'FCM_TOKEN_REJECTED': {
      return {
        ...state,
        isLoadingFCM: false,
        isErrorFCM: true,
      };
    }
    case 'FCM_TOKEN_FULFILLED': {
      return {
        ...state,
        isLoadingFCM: false,
        isErrorFCM: false,
        isFCM: true,
        // data: action.payload.data.data,
      };
    }
    case 'FCM_TOKEN_DELETE_PENDING': {
      return {
        ...state,
        isLoadingFCMdelete: true,
      };
    }
    case 'FCM_TOKEN_DELETE_REJECTED': {
      return {
        ...state,
        isLoadingFCMdelete: false,
        isErrorFCMdelete: true,
      };
    }
    case 'FCM_TOKEN_DELETE_FULFILLED': {
      return {
        ...state,
        isLoadingFCMdelete: false,
        isErrorFCMdelete: false,
        isFCMdelete: true,
        // data: action.payload.data.data,
      };
    }
    case 'DETAIL_TUTOR_PENDING': {
      return {
        ...state,
        isLoadingTeacher: true,
      };
    }
    case 'DETAIL_TUTOR_REJECTED': {
      return {
        ...state,
        isLoadingTeacher: false,
        isErrorTeacher: true,
        isDetailTeacher: false,
      };
    }
    case 'DETAIL_TUTOR_FULFILLED': {
      return {
        ...state,
        isLoadingTeacher: false,
        isErrorTeacher: false,
        isDetailTeacher: true,
        profilTeacher: action.payload.data.data,
      };
    }
    case 'JADWAL_TUTOR_PENDING': {
      return {
        ...state,
        isLoadingJadwal: true,
      };
    }
    case 'JADWAL_TUTOR_REJECTED': {
      return {
        ...state,
        isLoadingJadwal: false,
        isErrorJadwal: true,
        isJadwal: false,
      };
    }
    case 'JADWAL_TUTOR_FULFILLED': {
      return {
        ...state,
        isLoadingJadwal: false,
        isErrorJadwal: false,
        isJadwal: true,
        jadwal: action.payload.data.data,
      };
    }
    case 'FCM_TOKEN_DATA': {
      return {
        ...state,
        dataFcmToken: action.payload,
      };
    }
    case 'VISIBLE_BERANDA': {
      return {
        ...state,
        visible: action.payload,
      };
    }
    case 'CLEAR_BERANDA': {
      return {
        ...state,
        isLoadingBeranda: false,
        isError: false,
        isErrorBeranda: false,
        isBeranda: false,
        data: [],
      };
    }
    case 'CLEAR': {
      return {
        ...state,
        isLoading: false,
        isErrorVerify: false,
        isVerified: false,
        isErrorTeacher: false,
        isDetailTeacher: false,
        isLoadingTeacher: false,
        isLoadingFCMdelete: false,
        isErrorFCMdelete: false,
        isFCMdelete: false,
        isErrorSlider: false,
      };
    }
    default: {
      return state;
    }
  }
};
