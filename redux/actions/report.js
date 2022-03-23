import http from '../../helpers/http';
export default {
    getReportId: (token,id) => ({
      type: 'REPORT_GET',
      payload: http(token).get(`api/student/report/${id}`),
    }),
    clearReport: () => ({
      type: 'CLEAR_REPORT',
    }),
  };