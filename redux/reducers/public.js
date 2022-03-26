const initialState = {
  alertMsg: '',
  alertMsgErr: '',
  alertMsgErrWish: '',
  alertMsgSuccessWish: '',
  isLoadingPublic: false,
  isErrorPublic: false,
  isPublic: false,
  isKelasSucces: false,
  isMapelSucces: false,
  isLoadingJadwalPublic: false,
  isErrorJadwalPublic: false,
  isJadwalPublic: true,
  isLoadingWish: false,
  isErrorWish: false,
  isWish: true,
  isLoadingWishDelete: false,
  isErrorWishDelete: false,
  isWishDelete: false,
  isLoadingFav: false,
  isErrorFav: false,
  isFav: true,
  isLoadingGetFav: false,
  isErrorGetFav: false,
  isGetFav: true,
  kelasPublic: [],
  mapelPublic: [],
  dataPublic: [],
  detailTutor: [],
  favTutor: [],
  detailLes: null,
  jadwalPublic: [],
  wishlist: [],
  pagination: [],
  visible: false,
  totalData: 0,
  limit: 10,
  currentPage: 1,
  nextPage: 0,
  totalDataHours: 0,
  limitHours: 10,
  currentPageHours: 1,
  nextPageHours: 0,
  totalDataWish: 0,
  limitWish: 10,
  currentPageWish: 1,
  nextPageWish: 0,
  totalDataGetFav: 0,
  limitGetFav: 10,
  currentPageGetFav: 1,
  nextPageGetFav: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PUBLIC_GET_PENDING': {
      return {
        ...state,
        isLoadingPublic: true,
      };
    }
    case 'PUBLIC_GET_REJECTED': {
      return {
        ...state,
        isLoadingPublic: false,
        isErrorPublic: true,
        isPublic: false,
      };
    }
    case 'PUBLIC_GET_FULFILLED': {
      state.dataPublic.push(...action.payload.data.data);
      return {
        ...state,
        isLoadingPublic: false,
        isErrorPublic: false,
        isPublic: true,
        dataPublic: state.dataPublic,
        pagination: action.payload.data,
        totalData: action.payload.data.totalData,
        limit: action.payload.data.limitPage,
        currentPage: action.payload.data.currentPage,
        nextPage: action.payload.data.nextPage,
      };
    }

    case 'JADWAL_PUBLIC_PENDING': {
      return {
        ...state,
        isLoadingJadwalPublic: true,
      };
    }
    case 'JADWAL_PUBLIC_REJECTED': {
      return {
        ...state,
        isLoadingJadwalPublic: false,
        isErrorJadwalPublic: true,
        isJadwalPublic: false,
      };
    }
    case 'JADWAL_PUBLIC_FULFILLED': {
      state.jadwalPublic.push(...action.payload.data.data);
      return {
        ...state,
        isLoadingJadwalPublic: false,
        isErrorJadwalPublic: false,
        isJadwalPublic: true,
        jadwalPublic: state.jadwalPublic,
        totalDataHours: action.payload.data.totalData,
        limitHours: action.payload.data.limitPage,
        currentPageHours: action.payload.data.currentPage,
        nextPageHours: action.payload.data.nextPage,
      };
    }
    case 'WISHLIST_PENDING': {
      return {
        ...state,
        isLoadingWish: true,
      };
    }
    case 'WISHLIST_REJECTED': {
      return {
        ...state,
        isLoadingWish: false,
        isErrorWish: true,
        isWish: false,
      };
    }
    case 'WISHLIST_FULFILLED': {
      state.wishlist.push(...action.payload.data.data);
      return {
        ...state,
        isLoadingWish: false,
        isErrorWish: false,
        isWish: true,
        wishlist: state.wishlist,
        totalDataWish: action.payload.data.totalData,
        limitWish: action.payload.data.limitPage,
        currentPageWish: action.payload.data.currentPage,
        nextPageWish: action.payload.data.nextPage,
      };
    }
    case 'WISHLIST_DELETE_PENDING': {
      return {
        ...state,
        isLoadingWishDelete: true,
      };
    }
    case 'WISHLIST_DELETE_REJECTED': {
      return {
        ...state,
        isLoadingWishDelete: false,
        isErrorWishDelete: true,
        isWishDelete: false,
        alertMsgErrWish: action.payload.data.message,
      };
    }
    case 'WISHLIST_DELETE_FULFILLED': {
      return {
        ...state,
        isLoadingWishDelete: false,
        isErrorWishDelete: false,
        isWishDelete: true,
        alertMsgSuccessWish: 'Berhasil menghapus wishlist...',
      };
    }
    case 'GET_FAVOURITE_TUTOR_PENDING': {
      return {
        ...state,
        isLoadingGetFav: true,
      };
    }
    case 'GET_FAVOURITE_TUTOR_REJECTED': {
      return {
        ...state,
        isLoadingGetFav: false,
        isErrorGetFav: true,
        isGetFav: false,
      };
    }
    case 'GET_FAVOURITE_TUTOR_FULFILLED': {
      state.favTutor.push(...action.payload.data.data);
      return {
        ...state,
        isLoadingGetFav: false,
        isErrorGetFav: false,
        isGetFav: true,
        favTutor: state.favTutor,
        totalDataGetFav: action.payload.data.totalData,
        limitGetFav: action.payload.data.limitPage,
        currentPageGetFav: action.payload.data.currentPage,
        nextPageGetFav: action.payload.data.nextPage,
      };
    }
    case 'FAVOURITE_TUTOR_PENDING': {
      return {
        ...state,
        isLoadingFav: true,
      };
    }
    case 'FAVOURITE_TUTOR_REJECTED': {
      return {
        ...state,
        isLoadingFav: false,
        isErrorFav: true,
        isFav: false,
        alertMsgErr: action?.payload?.response?.data?.message,
      };
    }
    case 'FAVOURITE_TUTOR_FULFILLED': {
      return {
        ...state,
        isLoadingFav: false,
        isErrorFav: false,
        isFav: true,
      };
    }
    case 'KELAS_PUBLIC_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'KELAS_PUBLIC_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isKelasSucces: false,
      };
    }
    case 'KELAS_PUBLIC_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isKelasSucces: true,
        kelasPublic: action.payload.data.data,
      };
    }
    case 'MAPEL_PUBLIC_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'MAPEL_PUBLIC_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isMapelSucces: false,
      };
    }
    case 'MAPEL_PUBLIC_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isMapelSucces: true,
        mapelPublic: action.payload.data.data,
      };
    }
    case 'DETAIL_TUTOR_PUBLIC': {
      return {
        ...state,
        detailTutor: action.payload,
      };
    }
    case 'DETAIL_LES_PUBLIC': {
      return {
        ...state,
        detailLes: action.payload,
      };
    }
    case 'VISIBLE_PUBLIC': {
      return {
        ...state,
        visible: action.payload,
      };
    }
    case 'CLEAR_VISIBLE': {
      return {
        ...state,
        visible: false,
      };
    }
    case 'CLEAR_PUBLIC': {
      return {
        ...state,
        isLoading: false,
        kelasPublic: [],
        detailTutor: [],
        dataPublic: [],
        pagination: [],
      };
    }
    case 'CLEAR_JADWAL_PUBLIC': {
      return {
        ...state,
        isLoadingJadwalPublic: false,
        isErrorJadwalPublic: false,
        isJadwalPublic: false,
        jadwalPublic: [],
        totalDataHours: 0,
        limitHours: 10,
        currentPageHours: 1,
        nextPageHours: 0,
      };
    }
    case 'CLEAR_MAPEL': {
      return {
        ...state,
        mapelPublic: [],
      };
    }
    case 'CLEAR_FAVOURITE': {
      return {
        ...state,
        isErrorFav: false,
        isLoadingFav: false,
        isFav: false,
        alertMsgErr: '',
      };
    }
    case 'CLEAR_GET_FAVOURITE': {
      return {
        ...state,
        isErrorGetFav: false,
        isLoadingGetFav: false,
        isGetFav: false,
        alertMsgErr: '',
        favTutor: [],
      };
    }
    case 'CLEAR_WISHLIST': {
      return {
        ...state,
        isErrorWish: false,
        isLoadingWish: false,
        isWish: false,
        isLoadingWishDelete: false,
        isErrorWishDelete: false,
        isWishDelete: false,
        alertMsgErrWish: '',
        alertMsgSuccessWish: '',
        wishlist: [],
        totalDataWish: 0,
        limitWish: 10,
        currentPageWish: 1,
        nextPageWish: 0,
      };
    }
    case 'CLEAR_WISHLIST_DELETE': {
      return {
        ...state,
        isErrorWishDelete: false,
        isLoadingWishDelete: false,
        isWishDelete: false,
        alertMsgErrWish: '',
        alertMsgSuccessWish: '',
      };
    }
    default: {
      return state;
    }
  }
};
