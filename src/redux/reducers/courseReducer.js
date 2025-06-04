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
    loading: false,
    error: null,
    professorCourses: [],  
    loadingProfessorCourses: false,
    errorProfessorCourses: null,
};

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_COURSE_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_COURSE_SUCCESS:
            return { ...state, loading: false, courses: [...state.courses, action.payload] };
        case CREATE_COURSE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_COURSES_BY_PROFESSOR_REQUEST:
            return { ...state, loadingProfessorCourses: true, errorProfessorCourses: null };
        case FETCH_COURSES_BY_PROFESSOR_SUCCESS:
            return { ...state, loadingProfessorCourses: false, professorCourses: action.payload };
        case FETCH_COURSES_BY_PROFESSOR_FAILURE:
            return { ...state, loadingProfessorCourses: false, errorProfessorCourses: action.payload };

        default:
            return state;
    }
};

export default courseReducer;