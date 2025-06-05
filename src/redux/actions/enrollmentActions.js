import axiosInstance from '../../api/axiosInstance';
import {
  FETCH_MY_ENROLLMENTS_REQUEST,
  FETCH_MY_ENROLLMENTS_SUCCESS,
  FETCH_MY_ENROLLMENTS_FAILURE,
  ENROLL_IN_COURSE_REQUEST,
  ENROLL_IN_COURSE_SUCCESS,
  ENROLL_IN_COURSE_FAILURE,
  CANCEL_ENROLLMENT_REQUEST,
  CANCEL_ENROLLMENT_SUCCESS,
  CANCEL_ENROLLMENT_FAILURE,
  FETCH_ENROLLMENTS_BY_COURSE_REQUEST,
  FETCH_ENROLLMENTS_BY_COURSE_SUCCESS,
  FETCH_ENROLLMENTS_BY_COURSE_FAILURE,
} from '../types/enrollmentsTypes';

// Listar mis inscripciones
export const getMyEnrollments = (studentId) => async (dispatch) => {
  dispatch({ type: FETCH_MY_ENROLLMENTS_REQUEST });
  try {
    const response = await axiosInstance.get(`/enrollments/${studentId}`);
    dispatch({ type: FETCH_MY_ENROLLMENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_MY_ENROLLMENTS_FAILURE,
      payload: error.response?.data?.message || 'Error al obtener tus inscripciones',
    });
  }
};

// Inscribirse a un curso
export const enrollInCourse = (enrollmentData) => async (dispatch) => {
  dispatch({ type: ENROLL_IN_COURSE_REQUEST });
  try {
    const response = await axiosInstance.post('/enrollments', enrollmentData);
    dispatch({ type: ENROLL_IN_COURSE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: ENROLL_IN_COURSE_FAILURE,
      payload: error.response?.data?.message || 'Error al inscribirse al curso',
    });
    throw error;
  }
};

// Cancelar inscripción
export const cancelEnrollment = (id) => async (dispatch) => {
  dispatch({ type: CANCEL_ENROLLMENT_REQUEST });
  try {
    await axiosInstance.delete(`/enrollments/${id}`);
    dispatch({ type: CANCEL_ENROLLMENT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: CANCEL_ENROLLMENT_FAILURE,
      payload: error.response?.data?.message || 'Error al cancelar la inscripción',
    });
  }
};

// Obtener inscripciones por curso (profesor)
export const getEnrollmentsByCourse = (courseId) => async (dispatch) => {
  dispatch({ type: FETCH_ENROLLMENTS_BY_COURSE_REQUEST });
  try {
    const response = await axiosInstance.get(`/enrollments/${courseId}`);
    dispatch({ type: FETCH_ENROLLMENTS_BY_COURSE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_ENROLLMENTS_BY_COURSE_FAILURE,
      payload: error.response?.data?.message || 'Error al obtener inscripciones del curso',
    });
  }
};
