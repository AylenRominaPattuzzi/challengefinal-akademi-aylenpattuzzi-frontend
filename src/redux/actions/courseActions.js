import axiosInstance from '../../api/axiosInstance';
import {
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAILURE,
  FETCH_COURSES_BY_PROFESSOR_REQUEST,
  FETCH_COURSES_BY_PROFESSOR_SUCCESS,
  FETCH_COURSES_BY_PROFESSOR_FAILURE,
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  FETCH_COURSE_BY_ID_REQUEST,
  FETCH_COURSE_BY_ID_SUCCESS,
  FETCH_COURSE_BY_ID_FAILURE,
  FETCH_COURSES_BY_STUDENT_REQUEST,
  FETCH_COURSES_BY_STUDENT_SUCCESS,
  FETCH_COURSES_BY_STUDENT_FAILURE,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAILURE,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
} from '../types/courseType';

export const createCourse = (courseData) => async (dispatch) => {
  dispatch({ type: CREATE_COURSE_REQUEST });
  try {
    const response = await axiosInstance.post('/courses', courseData);
    dispatch({ type: CREATE_COURSE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_COURSE_FAILURE, payload: error.response?.data?.message || 'Error al crear el curso' });
    throw error;
  }
};


export const getCoursesByProfessor = ({ page = 1, search = '', category = '' } = {}) => async (dispatch) => {
  dispatch({ type: FETCH_COURSES_BY_PROFESSOR_REQUEST });
  try {
    const params = {};
    if (page) params.page = page;
    if (category) params.category = category;
    if (search) params.search = search;

    const response = await axiosInstance.get('/courses/professor', {params});
    const payload = {
      courses: response.data.data,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
      totalPages: response.data.totalPages,
    }
    dispatch({ type: FETCH_COURSES_BY_PROFESSOR_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: FETCH_COURSES_BY_PROFESSOR_FAILURE, payload: error.response?.data?.message || 'Error al obtener cursos del profesor' });
  }
};

export const getCoursesByStudent = ({ page = 1, search = '', category = '' } = {}) => async (dispatch) => {

  dispatch({ type: FETCH_COURSES_BY_STUDENT_REQUEST });
  try {
    const params = {};
    if (page) params.page = page;
    if (category) params.category = category;
    if (search) params.search = search;

    const response = await axiosInstance.get('/enrollments/my-courses', {params});
    const payload = {
      courses: response.data.data,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
      totalPages: response.data.totalPages,
    }
    dispatch({ type: FETCH_COURSES_BY_STUDENT_SUCCESS, payload });
  } catch (error) {
    dispatch({
      type: FETCH_COURSES_BY_STUDENT_FAILURE,
      payload: error.response?.data?.message || 'Error al obtener cursos del estudiante',
    });
  }
};


export const getCourses = ({ page = 1, search = '', category = '' } = {}) => async (dispatch) => {
  dispatch({ type: FETCH_COURSES_REQUEST });
  try {
    const params = {};
    console.log(page);

    if (page) params.page = page;
    if (category) params.category = category;
    if (search) params.search = search;

    const response = await axiosInstance.get('/courses', { params });
    console.log('getCourses response:', response.data);
    const payload = {
      courses: response.data.data,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
      totalPages: response.data.totalPages,
    }
    dispatch({ type: FETCH_COURSES_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: FETCH_COURSES_FAILURE, payload: error.response?.data?.message || 'Error al obtener cursos' });
  }
};


export const getCourseById = (id) => async (dispatch) => {
  console.log('getCourseById: iniciando con id =', id);
  dispatch({ type: FETCH_COURSE_BY_ID_REQUEST });
  try {
    const response = await axiosInstance.get(`/courses/${id}`);
    console.log('getCourseById: respuesta recibida:', response.data);
    dispatch({ type: FETCH_COURSE_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('getCourseById: error al obtener el curso:', error);
    dispatch({
      type: FETCH_COURSE_BY_ID_FAILURE,
      payload: error.response?.data?.message || 'Error al obtener el curso'
    });
  }
};



export const updateCourse = (id, courseData) => async (dispatch) => {
  dispatch({ type: UPDATE_COURSE_REQUEST });
  try {
    const response = await axiosInstance.put(`/courses/${id}`, courseData);
    dispatch({ type: UPDATE_COURSE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_COURSE_FAILURE, payload: error.response?.data?.message || 'Error al actualizar el curso' });
  }
};


export const deleteCourse = (id) => async (dispatch) => {
  dispatch({ type: DELETE_COURSE_REQUEST });
  try {
    await axiosInstance.delete(`/courses/${id}`);
    dispatch({ type: DELETE_COURSE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_COURSE_FAILURE, payload: error.response?.data?.message || 'Error al eliminar el curso' });
  }
};
