const initialState = {
  alertMsg: '',
  isLoadingCurriculum: false,
  isErrorCurriculum: false,
  isCurriculum: false,
  curriculums: [],
  isLoadingGradesubject: false,
  isErrorGradesubject: false,
  isGradesubject: false,
  grades: [],
  subjects: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CURRICULUM_PENDING': {
      return {
        ...state,
        isLoadingCurriculum: true,
      };
    }
    case 'CURRICULUM_REJECTED': {
      return {
        ...state,
        isLoadingCurriculum: false,
        isErrorCurriculum: true,
        isCurriculum: false,
      };
    }
    case 'CURRICULUM_FULFILLED': {
      return {
        ...state,
        isLoadingCurriculum: false,
        isErrorCurriculum: false,
        isCurriculum: true,
        curriculums: action?.payload?.data?.data,
      };
    }
    case 'GRADESUBJECT_PENDING': {
      return {
        ...state,
        isLoadingGradesubject: true,
      };
    }
    case 'GRADESUBJECT_REJECTED': {
      return {
        ...state,
        isLoadingGradesubject: false,
        isErrorGradesubject: true,
        isGradesubject: false,
      };
    }
    case 'GRADESUBJECT_FULFILLED': {
      return {
        ...state,
        isLoadingGradesubject: false,
        isErrorGradesubject: false,
        isGradesubject: true,
        grades: action?.payload?.data?.data?.gradeGroups,
        subjects: action?.payload?.data?.data?.subjects,
      };
    }
    case 'CLEAR_FILTER': {
      return {
        ...state,
        alertMsg: '',
        isLoadingCurriculum: false,
        isErrorCurriculum: false,
        isCurriculum: false,
        curriculums: [],
        isLoadingGradesubject: false,
        isErrorGradesubject: false,
        isGradesubject: false,
        grades: [],
        subjects: [],
      };
    }
    case 'CLEAR_GRADESUBJECT': {
      return {
        ...state,
        isLoadingGradesubject: false,
        isErrorGradesubject: false,
        isGradesubject: false,
        grades: [],
        subjects: [],
      };
    }
    default: {
      return state;
    }
  }
};
