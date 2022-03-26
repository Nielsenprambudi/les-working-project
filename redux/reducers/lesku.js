const initialState = {
  alertMsg: '',
  alertMsgError: '',
  alertMsgSuccess: '',
  isLoadingSchedule: false,
  isErrorSchedule: false,
  isSchedule: false,
  isAddMateri: false,
  isLoadingAddMateri: false,
  isErrorAddMateri: false,
  dataMateri: [],
  dataSchedule: [],
  dataReq: [],
  isLoadingGetMateri: false,
  isErrorGetMateri: false,
  isGetMateri: false,
  totalDataSchedule: 0,
  limitSchedule: 10,
  currentPageSchedule: 1,
  nextPageSchedule: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SCHEDULE_PENDING': {
      return {
        ...state,
        isLoadingSchedule: true,
      };
    }
    case 'GET_SCHEDULE_REJECTED': {
      return {
        ...state,
        isLoadingSchedule: false,
        isErrorSchedule: true,
        isSchedule: false,
        alertMsgError: action.payload.response.data.data,
      };
    }
    case 'GET_SCHEDULE_FULFILLED': {
      state.dataSchedule.push(...action.payload.data.data);
      return {
        ...state,
        isLoadingSchedule: false,
        isErrorSchedule: false,
        isSchedule: true,
        dataSchedule: state.dataSchedule,
        totalDataSchedule: action.payload.data.totalData,
        nextPageSchedule: action.payload.data.nextPage,
        currentPageSchedule: action.payload.data.currentPage,
        limitSchedule: action.payload.data.limitPage,
      };
    }
    case 'GET_MATERI_PENDING': {
      return {
        ...state,
        isLoadingGetMateri: true,
      };
    }
    case 'GET_MATERI_REJECTED': {
      return {
        ...state,
        isLoadingGetMateri: false,
        isErrorGetMateri: true,
        isGetMateri: false,
      };
    }
    case 'GET_MATERI_FULFILLED': {
      return {
        ...state,
        isLoadingAddMateri: false,
        isErrorAddMateri: false,
        isAddMateri: false,
        isLoadingGetMateri: false,
        isErrorGetMateri: false,
        isGetMateri: true,
        dataReq: action.payload.data.data,
      };
    }
    case 'ADD_MATERI_PENDING': {
      return {
        ...state,
        isLoadingAddMateri: true,
      };
    }
    case 'ADD_MATERI_REJECTED': {
      return {
        ...state,
        isLoadingAddMateri: false,
        isErrorAddMateri: true,
        isAddMateri: false,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'ADD_MATERI_FULFILLED': {
      return {
        ...state,
        isLoadingAddMateri: false,
        isErrorAddMateri: false,
        isAddMateri: true,
        dataMateri: action.payload.data.data,
      };
    }
    case 'CLEAR_ADD': {
      return {
        ...state,
        isLoadingAddMateri: false,
        isErrorAddMateri: false,
        isAddMateri: false,
        dataMateri: [],
        // data:[],
      };
    }
    case 'CLEAR_SCHEDULE': {
      return {
        ...state,
        isLoadingSchedule: false,
        isErrorSchedule: false,
        isSchedule: false,
        dataSchedule: [],
        alertMsgError: '',
        alertMsgSuccess: '',
      };
    }
    case 'CLEAR_REQ': {
      return {
        ...state,
        dataReq: [],
        isLoadingGetMateri: false,
        isErrorGetMateri: false,
        isGetMateri: false,
      };
    }
    default: {
      return state;
    }
  }
};
