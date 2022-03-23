import http from '../../helpers/http';

export default {
  getStudent: () => ({
    type: 'STUDENT',
    payload: http.get('v1/student/profile'),
  }),
  getStudentDetail: () => ({
    type: 'STUDENT_DETAIL',
    payload: http.get('v1/profile'),
  }),
  getSchools: (name, address) => ({
    type: 'SCHOOLS',
    payload: http.get(
      name !== ''
        ? `v1/school?schoolName=${name}`
        : address !== ''
        ? `v1/school?schoolAddress=${address}`
        : name !== '' && address !== ''
        ? `v1/school?schoolName=${name}&schoolAddress=${address}`
        : 'v1/school',
    ),
  }),
  updateStudent: data => ({
    type: 'STUDENT_UPDATE',
    payload: http.patch('v1/student/profile', data),
  }),
  addStudentDetail: data => ({
    type: 'STUDENT_ADD_DETAIL',
    payload: http.post('v1/profile', data),
  }),
  updateStudentDetail: data => ({
    type: 'STUDENT_UPDATE_DETAIL',
    payload: http.patch('v1/profile', data),
  }),
  uploadStudent: data => ({
    type: 'STUDENT_UPLOAD',
    payload: http.patch('v1/student/profile/file-profile', data),
  }),
  clear: () => ({
    type: 'CLEAR',
  }),
  clearUpdate: () => ({
    type: 'CLEAR_UPDATE',
  }),
  clearEditImage: () => ({
    type: 'CLEAR_EDIT_IMAGE',
  }),
  clearEdit: () => ({
    type: 'CLEAR_EDIT',
  }),
  clearAddDetail: () => ({
    type: 'CLEAR_ADD_DETAIL',
  }),
};

// payload: http.post(`api/home?filterCurriculum=${filterCurriculum}&filterGender=${filterMapel}&filterKelas=${filterKelas}&filterKelas=${filterGender}&filterMapel=${filterMapel}`, data),
