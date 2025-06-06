import {
    CREATE_COURSE_REQUEST,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_FAILURE,
    FETCH_COURSES_REQUEST,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_FAILURE,
    FETCH_COURSES_BY_PROFESSOR_REQUEST,
    FETCH_COURSES_BY_PROFESSOR_SUCCESS,
    FETCH_COURSES_BY_PROFESSOR_FAILURE,
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

const initialState = {
    course: null,
    courses: [],
    operations: {
        createCourse: { loading: false, error: null, success: false },
        fetchCourses: { loading: false, error: null, success: false },
        fetchCoursesByProfessor: { loading: false, error: null, success: false },
        fetchCoursesByStudent: { loading: false, error: null, success: false }, 
        fetchCourseById: { loading: false, error: null, success: false },
        updateCourse: { loading: false, error: null, success: false },
        deleteCourse: { loading: false, error: null, success: false },
    },
};

export default function courseReducer(state = initialState, action) {
    switch (action.type) {
        // CREATE
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

        case FETCH_COURSES_REQUEST:
            return {
                ...state,
                operations: {
                    ...state.operations,
                    fetchCourses: { loading: true, error: null, success: false },
                },
            };
        case FETCH_COURSES_SUCCESS:
            return {
                ...state,
                courses: action.payload.courses,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.page,
                operations: {
                    ...state.operations,
                    fetchCourses: { loading: false, error: null, success: true },
                },
            };
        case FETCH_COURSES_FAILURE:
            return {
                ...state,
                operations: {
                    ...state.operations,
                    fetchCourses: { loading: false, error: action.payload, success: false },
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
                courses: action.payload.courses,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.page,
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
        case FETCH_COURSES_BY_STUDENT_REQUEST:
            return {
                ...state,
                operations: {
                    ...state.operations,
                    fetchCourses: { loading: true, error: null, success: false },
                },
            };
        case FETCH_COURSES_BY_STUDENT_SUCCESS:
            return {
                ...state,
                courses: action.payload.courses,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.page,
                operations: {
                    ...state.operations,
                    fetchCourses: { loading: false, error: null, success: true },
                },
            };
        case FETCH_COURSES_BY_STUDENT_FAILURE:
            return {
                ...state,
                operations: {
                    ...state.operations,
                    fetchCourses: { loading: false, error: action.payload, success: false },
                },
            };

        case FETCH_COURSE_BY_ID_REQUEST:
            return {
                ...state,
                operations: {
                    ...state.operations,
                    fetchCourseById: { loading: true, error: null, success: false },
                },
            };
        case FETCH_COURSE_BY_ID_SUCCESS:
            return {
                ...state,
                course: action.payload,
                operations: {
                    ...state.operations,
                    fetchCourseById: { loading: false, error: null, success: true },
                },
            };
        case FETCH_COURSE_BY_ID_FAILURE:
            return {
                ...state,
                operations: {
                    ...state.operations,
                    fetchCourseById: { loading: false, error: action.payload, success: false },
                },
            };


        case UPDATE_COURSE_REQUEST:
            return {
                ...state,
                operations: {
                    ...state.operations,
                    updateCourse: { loading: true, error: null, success: false },
                },
            };
        case UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                courses: state.courses.map(course =>
                    course._id === action.payload._id ? action.payload : course
                ),
                operations: {
                    ...state.operations,
                    updateCourse: { loading: false, error: null, success: true },
                },
            };
        case UPDATE_COURSE_FAILURE:
            return {
                ...state,
                operations: {
                    ...state.operations,
                    updateCourse: { loading: false, error: action.payload, success: false },
                },
            };


        case DELETE_COURSE_REQUEST:
            return {
                ...state,
                operations: {
                    ...state.operations,
                    deleteCourse: { loading: true, error: null, success: false },
                },
            };
        case DELETE_COURSE_SUCCESS:
            return {
                ...state,
                courses: state.courses.filter(course => course._id !== action.payload),
                operations: {
                    ...state.operations,
                    deleteCourse: { loading: false, error: null, success: true },
                },
            };
        case DELETE_COURSE_FAILURE:
            return {
                ...state,
                operations: {
                    ...state.operations,
                    deleteCourse: { loading: false, error: action.payload, success: false },
                },
            };

        default:
            return state;
    }
}
