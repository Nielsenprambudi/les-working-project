const initialState = {
    token: '',
    alertMsg: '',
    isLoadingRiwayat: false,
    isErrorRiwayat: false,
    isRiwayat:false,
    isLoadingRiwayatPesanan: false,
    isErrorRiwayatPesanan: false,
    isRiwayatPesanan:false,
    dataRiwayat:[],
    dataPesanan:[],
    isAddRating:false,
    isLoadingAddRating:false,
    isErrorAddRating:false,
    dataRating:[],
    scheduleId:[],
    pagination:[],
    paginationPesanan:[],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'RIWAYAT_GET_PENDING': {
        return {
          ...state,
          isLoadingRiwayat: true,
        };
      }
      case 'RIWAYAT_GET_REJECTED': {
        return {
          ...state,
          isLoadingRiwayat: false,
          isErrorRiwayat: true,
          isRiwayat:false,
        };
      }
      case 'RIWAYAT_GET_FULFILLED': {
        // state.dataRiwayat.push(...action.payload.data.data)
        return {
          ...state,
          isLoadingRiwayat: false,
          isErrorRiwayat: false,
          isRiwayat: true,
          dataRiwayat: action.payload.data.data,
          pagination: action.payload.data,
        };
      }
      case 'ADD_RATING_PENDING': {
        return {
          ...state,
          isLoadingAddRating: true,
        };
      }
      case 'ADD_RATING_REJECTED': {
        return {
          ...state,
          isLoadingAddRating:false,
          isErrorAddRating:true,
          isAddRating:false,
        };
      }
      case 'ADD_RATING_FULFILLED': {
        return {
          ...state,
          isLoadingAddRating:false,
          isErrorAddRating:false,
          isAddRating:true,
          dataRating: action.payload.data.data,
        };
      }
      case 'RIWAYAT_PESANAN_PENDING': {
        return {
          ...state,
          isLoadingRiwayatPesanan: true,
        };
      }
      case 'RIWAYATSCHEDULEID_PESANAN_REJECTED': {
        return {
          ...state,
          isLoadingRiwayatPesanan: false,
          isErrorRiwayatPesanan: true,
          isRiwayatPesanan:false,
        };
      }
      case 'RIWAYAT_PESANAN_FULFILLED': {
        console.log('cek',)
        // state.dataPesanan.push(...action.payload.data.data)
        return {
          ...state,
          isLoadingRiwayatPesanan: false,
          isErrorRiwayatPesanan: false,
          isRiwayatPesanan:true,
          dataPesanan: action.payload.data.data,
          paginationPesanan: action.payload.data
        };
      }
      case 'SCHEDULEID': {
        return {
          ...state,
          scheduleId:action.payload,
        }
      }
      case 'CLEAR_SCHEDULE':{
        return{
          ...state,
          scheduleId:[]
        }
      }
      case 'CLEAR_RIWAYAT_LES': {
        return {
          ...state,
          dataRiwayat:[],
        };
      }
      case 'CLEAR_RIWAYAT_PESANAN': {
        return {
          ...state,
          isLoadingRiwayatPesanan: false,
          isErrorRiwayatPesanan: false,
          isRiwayatPesanan:false,
          dataPesanan:[],
          paginationPesanan:[]
        };
      }
      case 'CLEAR_ADD ':{
        return {
          ...state,
          isAddRating:false,
          isLoadingAddRating:false,
          isErrorAddRating:false,
          dataRating:[],
        }
      }
      default: {
        return state;
      }
    }
  };
  