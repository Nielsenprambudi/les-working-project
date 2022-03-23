const initialState = {
  alertMsg: '',
  alertMsgError: '',
  alertMsgSuccess: '',
  isLoadingSchool: false,
  isErrorSchool: false,
  isSchool: false,
  dataSchool: [],
  isLoading: false,
  isError: false,
  isEdit: false,
  isStudent: false,
  isLoadingDetail: false,
  isErrorDetail: false,
  isEditDetail: false,
  isLoadingEditDetail: false,
  isErrorEditDetail: false,
  isAddDetail: false,
  isLoadingAddDetail: false,
  isErrorAddDetail: false,
  isStudentDetail: false,
  isLoadingImageDetail: false,
  isErrorImageDetail: false,
  isEditImageDetail: false,
  isErrorEditImageDetail: false,
  isLoadingEditImageDetail: false,
  isStudentImageDetail: false,
  data: null,
  dataDetail: null,
  profilePict: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SCHOOL_PENDING': {
      return {
        ...state,
        isLoadingSchool: true,
      };
    }
    case 'SCHOOL_REJECTED': {
      return {
        ...state,
        isLoadingSchool: false,
        isErrorSchool: true,
        isSchool: false,
        alertMsgError: action.payload.response.data.message,
      };
    }
    case 'SCHOOL_FULFILLED': {
      return {
        ...state,
        isLoadingSchool: false,
        isErrorSchool: false,
        isSchool: true,
        dataSchool: action.payload.data.data,
      };
    }
    case 'STUDENT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'STUDENT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isStudent: false,
        isVerified: false,
      };
    }
    case 'STUDENT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isVerified: true,
        isStudent: true,
        data: action.payload.data.data,
      };
    }
    case 'STUDENT_DETAIL_PENDING': {
      return {
        ...state,
        isLoadingDetail: true,
      };
    }
    case 'STUDENT_DETAIL_REJECTED': {
      return {
        ...state,
        isLoadingDetail: false,
        isErrorDetail: true,
        isStudentDetail: false,
      };
    }
    case 'STUDENT_DETAIL_FULFILLED': {
      return {
        ...state,
        isLoadingDetail: false,
        isErrorDetail: false,
        isStudentDetail: true,
        dataDetail: action.payload.data.data,
      };
    }
    case 'STUDENT_ADD_DETAIL_PENDING': {
      return {
        ...state,
        isLoadingAddDetail: true,
      };
    }
    case 'STUDENT_ADD_DETAIL_REJECTED': {
      return {
        ...state,
        isLoadingAddDetail: false,
        isErrorAddDetail: true,
        isAddDetail: false,
        alertMsgError: action.payload.response.data.message,
      };
    }
    case 'STUDENT_ADD_DETAIL_FULFILLED': {
      return {
        ...state,
        isLoadingAddDetail: false,
        isErrorAddDetail: false,
        isAddDetail: true,
        alertMsgSuccess: 'Berhasil menambahkan data profil',
        dataDetail: action.payload.data.data,
      };
    }
    case 'STUDENT_UPDATE_DETAIL_PENDING': {
      return {
        ...state,
        isLoadingEditDetail: true,
      };
    }
    case 'STUDENT_UPDATE_DETAIL_REJECTED': {
      return {
        ...state,
        isLoadingEditDetail: false,
        isErrorEditDetail: true,
        isEditDetail: false,
        alertMsgError: action.payload.response.data.message,
      };
    }
    case 'STUDENT_UPDATE_DETAIL_FULFILLED': {
      return {
        ...state,
        isLoadingEditDetail: false,
        isErrorEditDetail: false,
        isEditDetail: true,
        alertMsgSuccess: 'Berhasil mengubah data detil',
        dataDetail: action.payload.data.data,
      };
    }
    case 'STUDENT_UPDATE_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'STUDENT_UPDATE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isEdit: false,
        alertMsgError: action.payload.response.data.message,
      };
    }
    case 'STUDENT_UPDATE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isEdit: true,
        alertMsg: action.payload.data.message,
      };
    }
    case 'STUDENT_UPLOAD_PENDING': {
      return {
        ...state,
        isLoadingEditImageDetail: true,
      };
    }
    case 'STUDENT_UPLOAD_REJECTED': {
      return {
        ...state,
        isLoadingEditImageDetail: false,
        isErrorEditImageDetail: true,
        isEditImageDetail: false,
        alertMsgError:
          action.payload.response.data.message || action.payload.data.data,
      };
    }
    case 'STUDENT_UPLOAD_FULFILLED': {
      return {
        ...state,
        isLoadingEditImageDetail: false,
        isErrorEditImageDetail: false,
        isEditImageDetail: true,
        alertMsgSuccess: 'Foto Profil berhasil di unggah!',
      };
    }
    case 'CLEAR': {
      return {
        ...state,
        isLoading: false,
        isErrorVerify: false,
        isVerified: false,
        data: [],
      };
    }
    case 'CLEAR_UPDATE': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isEdit: false,
        alertMsgError: '',
        alertMsgSuccess: '',
      };
    }
    case 'CLEAR_EDIT_IMAGE': {
      return {
        ...state,
        isLoadingEditImageDetail: false,
        isErrorEditImageDetail: false,
        isEditImageDetail: false,
        alertMsgError: '',
        alertMsgSuccess: '',
      };
    }
    case 'CLEAR_EDIT': {
      return {
        ...state,
        isEditDetail: false,
        isErrorEditDetail: false,
        isLoadingEditDetail: false,
        alertMsgError: '',
        alertMsgSuccess: '',
      };
    }
    case 'CLEAR_ADD_DETAIL': {
      return {
        ...state,
        isAddDetail: false,
        isErrorAddDetail: false,
        isLoadingAddDetail: false,
        alertMsgError: '',
        alertMsgSuccess: '',
      };
    }
    default: {
      return state;
    }
  }
};
