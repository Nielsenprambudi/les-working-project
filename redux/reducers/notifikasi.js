const initialState = {
    token: '',
    alertMsg: '',
    isLoadingNotifikasi: false,
    isErrorNotifikasi: false,
    isNotifikasi: false,
    isLoadingDeleteNotif: false,
    isErrorDeleteNotif: false,
    isDeleteNotif: false,
    dataNotif:[],
    dataCount:[],
    isLoadingCount:false,
    isErrorCount:false,
    isCount:false,
    count:false,
    pagination:[],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'NOTIFIKASI_GET_PENDING': {
        return {
          ...state,
          isLoadingNotifikasi: true,
        };
      }
      case 'NOTIFIKASI_GET_REJECTED': {
        return {
          ...state,
          isLoadingNotifikasi: false,
          isErrorNotifikasi: true,
          isNotifikasi:false,
        };
      }
      case 'NOTIFIKASI_GET_FULFILLED': {
        console.log(state)
        state.dataNotif.push(...action.payload.data.data)
        return {
          ...state,
          isLoadingNotifikasi: false,
          isErrorNotifikasi: false,
          isNotifikasi: true,
          dataNotif:state.dataNotif,
          pagination: action.payload.data,
        };
      }
      case 'GET_COUNT_PENDING': {
        return {
          ...state,
          isLoadingCount: true,
        };
      }
      case 'GET_COUNT_REJECTED': {
        return {
          ...state,
          isLoadingCount: false,
          isErrorCount: true,
          isCount:false,
        };
      }
      case 'GET_COUNT_FULFILLED': {
        return {
          ...state,
          isLoadingCount:false,
          isErrorCount:false,
          isCount:true,
          dataCount: action.payload.data.data,
        };
      }
      case 'DELETE_NOTIFIKASI_PENDING': {
        return {
          ...state,
          isLoadingDeleteNotif: true,
        };
      }
      case 'DELETE_NOTIFIKASI_REJECTED': {
        return {
          ...state,
          isLoadingDeleteNotif: false,
          isErrorDeleteNotif: true,
          isDeleteNotif: false,
          // alertMsg: action.payload.data.data.message,
        };
      }
      case 'DELETE_NOTIFIKASI_FULFILLED': {
        return {
          ...state,
          isLoadingDeleteNotif: false,
          isErrorDeleteNotif: false,
          isDeleteNotif: true,
          //   dataDeleteNotif: action.payload.data.data,
        };
      }
      case 'COUNT':{
        return {
          ...state,
          count:action.payload
        }
      }
      case 'CLEAR_NOTIFIKASI': {
        return {
          ...state,
          isLoadingNotifikasi: false,
          isErrorNotifikasi: false,
          isNotifikasi:false,
          isLoadingDeleteNotif: false,
          isErrorDeleteNotif: false,
          isDeleteNotif: false,
          dataNotif:[],
        };
      }
      default: {
        return state;
      }
    }
  };
  