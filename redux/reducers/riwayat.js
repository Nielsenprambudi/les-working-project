const initialState = {
  token: '',
  alertMsg: '',
  isLoadingRiwayat: false,
  isErrorRiwayat: false,
  isRiwayat: false,
  isLoadingRiwayatDetail: false,
  isErrorRiwayatDetail: false,
  isRiwayatDetail: false,
  isLoadingRiwayatPesanan: false,
  isErrorRiwayatPesanan: false,
  isRiwayatPesanan: false,
  dataRiwayatDetail: null,
  dataRiwayat: [],
  dataPesanan: [],
  isAddRating: false,
  isLoadingAddRating: false,
  isErrorAddRating: false,
  dataRating: [],
  scheduleId: [],
  totalData: 0,
  limit: 10,
  currentPage: 1,
  nextPage: 0,
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
        isRiwayat: false,
      };
    }
    case 'RIWAYAT_GET_FULFILLED': {
      state.dataRiwayat.push(...action.payload.data.data);
      return {
        ...state,
        isLoadingRiwayat: false,
        isErrorRiwayat: false,
        isRiwayat: true,
        dataRiwayat: state.dataRiwayat,
        limit: action.payload.data.limitPage,
        totalData: action.payload.data.totalData,
        currentPage: action.payload.data.currentPage,
        nextPage: action.payload.data.nextPage,
      };
    }
    case 'RIWAYAT_GET_DETAIL': {
      return {
        ...state,
        isLoadingRiwayatDetail: true,
      };
    }
    case 'RIWAYAT_GET_DETAIL_REJECTED': {
      return {
        ...state,
        isLoadingRiwayatDetail: false,
        isErrorRiwayatDetail: true,
        isRiwayatDetail: false,
      };
    }
    case 'RIWAYAT_GET_DETAIL_FULFILLED': {
      return {
        ...state,
        isLoadingRiwayatDetail: false,
        isErrorRiwayatDetail: false,
        isRiwayatDetail: true,
        dataRiwayatDetail: action.payload.data.data,
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
        isLoadingAddRating: false,
        isErrorAddRating: true,
        isAddRating: false,
      };
    }
    case 'ADD_RATING_FULFILLED': {
      return {
        ...state,
        isLoadingAddRating: false,
        isErrorAddRating: false,
        isAddRating: true,
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
        isRiwayatPesanan: false,
      };
    }
    case 'RIWAYAT_PESANAN_FULFILLED': {
      // state.dataPesanan.push(...action.payload.data.data)
      return {
        ...state,
        isLoadingRiwayatPesanan: false,
        isErrorRiwayatPesanan: false,
        isRiwayatPesanan: true,
        dataPesanan: action.payload.data.data,
        paginationPesanan: action.payload.data,
      };
    }
    case 'SCHEDULEID': {
      return {
        ...state,
        scheduleId: action.payload,
      };
    }
    case 'CLEAR_SCHEDULE': {
      return {
        ...state,
        scheduleId: [],
      };
    }
    case 'CLEAR_RIWAYAT_LES': {
      return {
        ...state,
        isLoadingRiwayat: false,
        isErrorRiwayat: false,
        isRiwayat: false,
        dataRiwayat: [],
        totalData: 0,
        limit: 10,
        currentPage: 1,
        nextPage: 0,
      };
    }
    case 'CLEAR_RIWAYAT_DETAIL': {
      return {
        ...state,
        isLoadingRiwayatDetail: false,
        isErrorRiwayatDetail: false,
        isRiwayatDetail: false,
        dataRiwayatDetail: null,
      };
    }
    case 'CLEAR_RIWAYAT_PESANAN': {
      return {
        ...state,
        isLoadingRiwayatPesanan: false,
        isErrorRiwayatPesanan: false,
        isRiwayatPesanan: false,
        dataPesanan: [],
        paginationPesanan: [],
      };
    }
    case 'CLEAR_ADD ': {
      return {
        ...state,
        isAddRating: false,
        isLoadingAddRating: false,
        isErrorAddRating: false,
        dataRating: [],
      };
    }
    default: {
      return state;
    }
  }
};
