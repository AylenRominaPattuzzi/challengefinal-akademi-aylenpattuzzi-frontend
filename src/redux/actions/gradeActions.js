import axiosInstance from '../../api/axiosInstance';
import {
  CREATE_GRADE_REQUEST,
  CREATE_GRADE_SUCCESS,
  CREATE_GRADE_FAILURE,
  UPDATE_GRADE_REQUEST,
  UPDATE_GRADE_SUCCESS,
  UPDATE_GRADE_FAILURE,
  FETCH_GRADES_BY_STUDENT_REQUEST,
  FETCH_GRADES_BY_STUDENT_SUCCESS,
  FETCH_GRADES_BY_STUDENT_FAILURE,
  FETCH_GRADES_BY_COURSE_REQUEST,
  FETCH_GRADES_BY_COURSE_SUCCESS,
  FETCH_GRADES_BY_COURSE_FAILURE,
  FETCH_STUDENTS_WITH_COURSES_REQUEST,
  FETCH_STUDENTS_WITH_COURSES_SUCCESS,
  FETCH_STUDENTS_WITH_COURSES_FAILURE,
} from '../types/gradeTypes';


export const createGrade = (gradeData) => async (dispatch) => {
  dispatch({ type: CREATE_GRADE_REQUEST });
  try {
    const response = await axiosInstance.post('/grades', gradeData);
    dispatch({ type: CREATE_GRADE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: CREATE_GRADE_FAILURE,
      payload: error.response?.data?.message || 'Error al crear calificación',
    });
    throw error;
  }
};

export const updateGrade = (id, gradeData) => async (dispatch) => {
  dispatch({ type: UPDATE_GRADE_REQUEST });
  try {
    const response = await axiosInstance.put(`/grades/${id}`, gradeData);
    dispatch({ type: UPDATE_GRADE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: UPDATE_GRADE_FAILURE,
      payload: error.response?.data?.message || 'Error al actualizar calificación',
    });
    throw error;
  }
};

export const fetchGradesByStudent = ({ page = 1, search = '', value = '' } = {}) => async (dispatch) => {

  dispatch({ type: FETCH_GRADES_BY_STUDENT_REQUEST });
  try {
    const params = {};
    if (page) params.page = page;
    if (value) params.value = value;
    if (search) params.search = search;

    const response = await axiosInstance.get(`/grades/student`, { params });
    const payload = {
      grades: response.data.data,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
      totalPages: response.data.totalPages,
    }
    dispatch({ type: FETCH_GRADES_BY_STUDENT_SUCCESS, payload });
  } catch (error) {
    dispatch({
      type: FETCH_GRADES_BY_STUDENT_FAILURE,
      payload: error.response?.data?.message || 'Error al obtener calificaciones del estudiante',
    });
  }
};

export const fetchStudentsWithCoursesByProfessor = ({professorId, page = 1, search = '', value = '' } = {}) => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_WITH_COURSES_REQUEST });
  try {
    const params = {};
    if (page) params.page = page;
    if (value) params.value = value;
    if (search) params.search = search;
    const response = await axiosInstance.get(`/grades/professor/${professorId}`, { params });
    const payload = {
      grades: response.data.data,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
      totalPages: response.data.totalPages,
    }
    dispatch({ type: FETCH_STUDENTS_WITH_COURSES_SUCCESS, payload });
  } catch (error) {
    dispatch({
      type: FETCH_STUDENTS_WITH_COURSES_FAILURE,
      payload: error.response?.data?.message || 'Error al obtener los estudiantes con cursos',
    });
  }
};

export const fetchGradesByCourse = (courseId) => async (dispatch) => {
  dispatch({ type: FETCH_GRADES_BY_COURSE_REQUEST });
  try {
    const response = await axiosInstance.get(`/grades/course/${courseId}`);
    console.log('API Response fetchGradesByCourse:', response.data);
    dispatch({
      type: FETCH_GRADES_BY_COURSE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_GRADES_BY_COURSE_FAILURE,
      payload: error.response?.data?.message || 'Error al obtener calificaciones del curso',
    });
  }
};