import http from '../../helpers/http';

export default {
  getPublic: (
    filterCurriculum,
    filterKelas,
    filterSubject,
    page,
    limit,
    type,
    search,
  ) => ({
    type: 'PUBLIC_GET',
    payload: http.get(
      filterCurriculum && filterKelas && filterSubject
        ? `v1/public?qcurriculum=${filterCurriculum}&qgrade=${filterKelas}&qsubject=${filterSubject}&page=${page}&limit=${limit}`
        : type
        ? `v1/public?page=${page}&limit=${limit}&type=${type}`
        : search
        ? `v1/public?page=${page}&limit=${limit}&qsearch=${search}`
        : filterCurriculum && filterKelas && filterSubject && type
        ? `v1/public?qcurriculum=${filterCurriculum}&qgrade=${filterKelas}&qsubject=${filterSubject}&page=${page}&limit=${limit}&type=${type}`
        : filterCurriculum && filterKelas && filterSubject && search
        ? `v1/public?qcurriculum=${filterCurriculum}&qgrade=${filterKelas}&qsubject=${filterSubject}&page=${page}&limit=${limit}&qsearch=${search}`
        : filterCurriculum && filterKelas && filterSubject && search && type
        ? `v1/public?qcurriculum=${filterCurriculum}&qgrade=${filterKelas}&qsubject=${filterSubject}&page=${page}&limit=${limit}&qsearch=${search}&type=${type}`
        : `v1/public?page=${page}&limit=${limit}`,
    ),
  }),
  getDetailTutor: data => ({
    type: 'DETAIL_TUTOR_PUBLIC',
    payload: data,
  }),
  setDetailLes: data => ({
    type: 'DETAIL_LES_PUBLIC',
    payload: data,
  }),
  getJadwalPublic: (month, page, limit, id) => ({
    type: 'JADWAL_PUBLIC',
    payload: http.get(
      month == null || month == 0
        ? `v1/public/availability-hours/${id}?page=${page}&limit=${limit}`
        : `v1/public/availability-hours/${id}?page=${page}&limit=${limit}&month=${month}`,
    ),
  }),
  favouriteTutor: teacherId => ({
    type: 'FAVOURITE_TUTOR',
    payload: http.post('v1/favorite-teacher', {teacherId: teacherId}),
  }),
  getFavouriteTutor: (page, limit) => ({
    type: 'GET_FAVOURITE_TUTOR',
    payload: http.get(`v1/favorite-teacher/own?page=${page}&limit=${limit}`),
  }),
  getWishlist: (page, limit) => ({
    type: 'WISHLIST',
    payload: http.get(`v1/wishlist?page=${page}&limit=${limit}`),
  }),
  deleteWishlist: id => ({
    type: 'WISHLIST_DELETE',
    payload: http.delete(`v1/wishlist/${id}`),
  }),
  visible: data => ({
    type: 'VISIBLE_PUBLIC',
    payload: data,
  }),
  clearVisible: () => ({
    type: 'CLEAR_VISIBLE',
  }),
  clearMapel: () => ({
    type: 'CLEAR_MAPEL',
  }),
  clear: () => ({
    type: 'CLEAR_PUBLIC',
  }),
  clearJadwalPublic: () => ({
    type: 'CLEAR_JADWAL_PUBLIC',
  }),
  clearFavourite: () => ({
    type: 'CLEAR_FAVOURITE',
  }),
  clearGetFavourite: () => ({
    type: 'CLEAR_GET_FAVOURITE',
  }),
  clearWishlist: () => ({
    type: 'CLEAR_WISHLIST',
  }),
  clearWishlistDelete: () => ({
    type: 'CLEAR_WISHLIST_DELETE',
  }),
};
