import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from '../types/userTypes';

const initialState = {
  user: null,
  users: [],
  totalPages: 1,
  currentPage: 1,
  operations: {
    addUser: { loading: false, error: null, success: false },
    fetchUsers: { loading: false, error: null, success: false },
    deleteUser: { loading: false, error: null, success: false },
    forgotPassword: { loading: false, error: null, success: false },
    resetPassword: { loading: false, error: null, success: false },
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {

    case ADD_USER_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          addUser: { loading: true, error: null, success: false },
        },
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        operations: {
          ...state.operations,
          addUser: { loading: false, error: null, success: true },
        },
      };

    case ADD_USER_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          addUser: { loading: false, error: action.payload, success: false },
        },
      };

    case FETCH_USERS_REQUEST:
      return {
        ...state,
        fetchUsers: { loading: true, error: null, success: false },
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        total: action.payload.total,
        page: action.payload.page,
        limit: action.payload.limit,
        totalPages: action.payload.totalPages,
        error: null,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        fetchUsers: { loading: false, error: action.payload, success: false },
      };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          deleteUser: { loading: true, error: null, success: false },
        },
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
        operations: {
          ...state.operations,
          deleteUser: { loading: false, error: null, success: true },
        },
      };

    case DELETE_USER_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          deleteUser: { loading: false, error: action.payload, success: false },
        },
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPassword: { loading: true, error: null, success: false },
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassword: { loading: false, error: null, success: true },
      };

    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPassword: { loading: false, error: action.payload, success: false },
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPassword: { loading: true, error: null, success: false },
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassword: { loading: false, error: null, success: true },
      };

    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPassword: { loading: false, error: action.payload, success: false },
      };

    default:
      return state;
  }
}