const initialState = {
    token: '',
    alertMsg: '',
    isLoadingLesku: false,
    isErrorLesku: false,
    isLesku: false,
    isAddMateri:false,
    isLoadingAddMateri:false,
    isErrorAddMateri:false,
    dataMateri:[],
    data:[],
    dataReq:[],
    isLoadingGetMateri: false,
    isErrorGetMateri: false,
    isGetMateri:false,
    pagination:[],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'LESKU_GET_PENDING': {
        return {
          ...state,
          isLoadingLesku: true,
        };
      }
      case 'LESKU_GET_REJECTED': {
        return {
          ...state,
          isLoadingLesku: false,
          isErrorLesku: true,
          isLesku:false,
        };
      }
      case 'LESKU_GET_FULFILLED': {
        console.log(state);
        state.data.push(...action.payload.data.data)
        return {
          ...state,
          isLoadingLesku: false,
          isErrorLesku: false,
          isLesku: true,
          data: state.data,
          dataReq: action.payload.data.data.study,
          pagination:action.payload.data,
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
          isGetMateri:false,
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
          dataReq: action.payload.data.data
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
          isAddMateri:false,
          alertMsg:action.payload.response.data.message
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
      case 'CLEAR_LESKU': {
        return {
          ...state,
          isLoadingLesku: false,
          isErrorLesku: false,
          isLesku:false,
          data:[]
        };
      }
      case 'CLEAR_REQ': {
        return {
          ...state,
          dataReq:[],
          isLoadingGetMateri: false,
          isErrorGetMateri: false,
          isGetMateri:false,
        };
      }
      default: {
        return state;
      }
    }
  };
  