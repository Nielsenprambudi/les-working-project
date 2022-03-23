import http from '../../helpers/http';

export default {
  getCurriculum: () => ({
    type: 'CURRICULUM',
    payload: http.get('v1/curriculum'),
  }),
  getGradeSubject: data => ({
    type: 'GRADESUBJECT',
    payload: http.post('v1/filter/les', data),
  }),

  clear: () => ({
    type: 'CLEAR_FILTER',
  }),
  clearGradeSubject: () => ({
    type: 'CLEAR_GRADESUBJECT',
  }),
};

// payload: http.post(`api/home?filterCurriculum=${filterCurriculum}&filterGender=${filterMapel}&filterKelas=${filterKelas}&filterKelas=${filterGender}&filterMapel=${filterMapel}`, data),
