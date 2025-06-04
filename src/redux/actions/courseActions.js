import axiosInstance from '../../api/axiosInstance';
import {
    CREATE_COURSE_REQUEST,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_FAILURE,
    FETCH_COURSES_BY_PROFESSOR_REQUEST,
    FETCH_COURSES_BY_PROFESSOR_SUCCESS,
    FETCH_COURSES_BY_PROFESSOR_FAILURE,
} from '../types/courseType';


export const createCourse = (courseData) => async (dispatch) => {
    dispatch({ type: CREATE_COURSE_REQUEST });

    try {
        const response = await axiosInstance.post('/courses', courseData);

        dispatch({
            type: CREATE_COURSE_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_COURSE_FAILURE,
            payload: error.response?.data?.message || 'Error al crear el curso',
        });
        throw error;
    }
};

export const getCoursesByProfessor = () => async (dispatch) => {
    dispatch({ type: FETCH_COURSES_BY_PROFESSOR_REQUEST });
  
    try {
      const response = await axiosInstance.get(`/courses/professor/`);
  
      dispatch({
        type: FETCH_COURSES_BY_PROFESSOR_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_COURSES_BY_PROFESSOR_FAILURE,
        payload: error.response?.data?.message || 'Error al obtener cursos del profesor',
      });
    }
  };
  
