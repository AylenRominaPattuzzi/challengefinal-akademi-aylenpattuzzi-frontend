import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types/authTypes';

const initialState = {
  loading: false,
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        role: action.payload.role,
        error: null
      };

    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return { ...state, loading: false, token: null, role: null, error: null };

    default:
      return state;
  }
}
