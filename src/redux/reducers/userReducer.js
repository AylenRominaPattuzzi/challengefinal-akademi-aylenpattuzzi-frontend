import {
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAILURE,
  FETCH_COURSES_BY_PROFESSOR_REQUEST,
  FETCH_COURSES_BY_PROFESSOR_SUCCESS,
  FETCH_COURSES_BY_PROFESSOR_FAILURE,
} from '../types/courseType';

const initialState = {
  courses: [],
  operations: {
    createCourse: { loading: false, error: null, success: false },
    fetchCoursesByProfessor: { loading: false, error: null, success: false },
  },
};

export default function courseReducer(state = initialState, action) {
  switch (action.type) {

    case CREATE_COURSE_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          createCourse: { loading: true, error: null, success: false },
        },
      };
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, action.payload],
        operations: {
          ...state.operations,
          createCourse: { loading: false, error: null, success: true },
        },
      };
    case CREATE_COURSE_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          createCourse: { loading: false, error: action.payload, success: false },
        },
      };


    case FETCH_COURSES_BY_PROFESSOR_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          fetchCoursesByProfessor: { loading: true, error: null, success: false },
        },
      };
    case FETCH_COURSES_BY_PROFESSOR_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        operations: {
          ...state.operations,
          fetchCoursesByProfessor: { loading: false, error: null, success: true },
        },
      };
    case FETCH_COURSES_BY_PROFESSOR_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          fetchCoursesByProfessor: { loading: false, error: action.payload, success: false },
        },
      };

    default:
      return state;
  }
}
