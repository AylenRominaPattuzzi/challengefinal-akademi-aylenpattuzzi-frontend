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

const initialState = {
    myEnrollments: [],
    enrollmentsByCourse: [],
    loading: false,
    error: null,
};

const enrollmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MY_ENROLLMENTS_REQUEST:
        case ENROLL_IN_COURSE_REQUEST:
        case CANCEL_ENROLLMENT_REQUEST:
        case FETCH_ENROLLMENTS_BY_COURSE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_MY_ENROLLMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                myEnrollments: action.payload,
            };

        case FETCH_ENROLLMENTS_BY_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                enrollmentsByCourse: action.payload,
            };

        case ENROLL_IN_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                myEnrollments: [...state.myEnrollments, action.payload],
            };

        case CANCEL_ENROLLMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                myEnrollments: state.myEnrollments.filter((e) => e._id !== action.payload),
            };

        case FETCH_MY_ENROLLMENTS_FAILURE:
        case ENROLL_IN_COURSE_FAILURE:
        case CANCEL_ENROLLMENT_FAILURE:
        case FETCH_ENROLLMENTS_BY_COURSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default enrollmentReducer;
