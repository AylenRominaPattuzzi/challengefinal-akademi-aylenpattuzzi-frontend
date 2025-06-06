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
  FETCH_STUDENTS_WITH_COURSES_REQUEST,
  FETCH_STUDENTS_WITH_COURSES_SUCCESS,
  FETCH_STUDENTS_WITH_COURSES_FAILURE,
  FETCH_GRADES_BY_COURSE_REQUEST,
  FETCH_GRADES_BY_COURSE_SUCCESS,
  FETCH_GRADES_BY_COURSE_FAILURE,
} from '../types/gradeTypes';

const initialState = {
  grades: [],
  gradesByCourse: {
    grades: [],
    extraStudents: [],
  },
  operations: {
    createGrade: { loading: false, error: null, success: false },
    updateGrade: { loading: false, error: null, success: false },
    fetchGradesByStudent: { loading: false, error: null, success: false },
    fetchStudentsWithCourses: { loading: false, error: null, success: false },
    fetchGradesByCourse: { loading: false, error: null, success: false },
  },
};

export default function gradeReducer(state = initialState, action) {
  switch (action.type) {

    case CREATE_GRADE_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          createGrade: { loading: true, error: null, success: false },
        },
      };
    case CREATE_GRADE_SUCCESS:
      return {
        ...state,
        grades: [...state.grades, action.payload],
        operations: {
          ...state.operations,
          createGrade: { loading: false, error: null, success: true },
        },
      };
    case CREATE_GRADE_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          createGrade: { loading: false, error: action.payload, success: false },
        },
      };


    case UPDATE_GRADE_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          updateGrade: { loading: true, error: null, success: false },
        },
      };
    case UPDATE_GRADE_SUCCESS:
      return {
        ...state,
        grades: state.grades.map((grade) =>
          grade._id === action.payload._id ? action.payload : grade
        ),
        operations: {
          ...state.operations,
          updateGrade: { loading: false, error: null, success: true },
        },
      };
    case UPDATE_GRADE_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          updateGrade: { loading: false, error: action.payload, success: false },
        },
      };


    case FETCH_GRADES_BY_STUDENT_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          fetchGradesByStudent: { loading: true, error: null, success: false },
        },
      };
    case FETCH_GRADES_BY_STUDENT_SUCCESS:
      return {
        ...state,
        grades: action.payload.grades,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.page,
        operations: {
          ...state.operations,
          fetchGradesByStudent: { loading: false, error: null, success: true },
        },
      };
    case FETCH_GRADES_BY_STUDENT_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          fetchGradesByStudent: { loading: false, error: action.payload, success: false },
        },
      };
    case FETCH_STUDENTS_WITH_COURSES_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          fetchStudentsWithCourses: { loading: true, error: null, success: false },
        },
      };
    case FETCH_STUDENTS_WITH_COURSES_SUCCESS:
      return {
        ...state,
        grades: action.payload.grades,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.page,
        studentsWithCourses: action.payload,
        operations: {
          ...state.operations,
          fetchStudentsWithCourses: { loading: false, error: null, success: true },
        },
      };
    case FETCH_STUDENTS_WITH_COURSES_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          fetchStudentsWithCourses: { loading: false, error: action.payload, success: false },
        },
      };

    case FETCH_GRADES_BY_COURSE_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          fetchGradesByCourse: { loading: true, error: null, success: false },
        },
      };

    case FETCH_GRADES_BY_COURSE_SUCCESS:
      return {
        ...state,
        gradesByCourse: {
          grades: action.payload.grades,
          extraStudents: action.payload.extra,
        },
        operations: {
          ...state.operations,
          fetchGradesByCourse: { loading: false, error: null, success: true },
        },
      };

    case FETCH_GRADES_BY_COURSE_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          fetchGradesByCourse: { loading: false, error: action.payload, success: false },
        },
      };


    default:
      return state;
  }
}
