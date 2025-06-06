import axiosInstance from '../../api/axiosInstance';
import {
  ENROLL_IN_COURSE_REQUEST,
  ENROLL_IN_COURSE_SUCCESS,
  ENROLL_IN_COURSE_FAILURE,
  CANCEL_ENROLLMENT_REQUEST,
  CANCEL_ENROLLMENT_SUCCESS,
  CANCEL_ENROLLMENT_FAILURE,
} from '../types/enrollmentsTypes';


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
