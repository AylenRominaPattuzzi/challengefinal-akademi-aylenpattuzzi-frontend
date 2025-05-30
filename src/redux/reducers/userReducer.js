import {
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
    forgotPasswordLoading: false,
    forgotPasswordError: null,
    forgotPasswordSuccess: false,
  
    resetPasswordLoading: false,
    resetPasswordError: null,
    resetPasswordSuccess: false,
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      // RECOVER PASSWORD
      case FORGOT_PASSWORD_REQUEST:
        return { ...state, forgotPasswordLoading: true, forgotPasswordError: null, forgotPasswordSuccess: false };
  
      case FORGOT_PASSWORD_SUCCESS:
        return { ...state, forgotPasswordLoading: false, forgotPasswordSuccess: true };
  
      case FORGOT_PASSWORD_FAILURE:
        return { ...state, forgotPasswordLoading: false, forgotPasswordError: action.payload };
  
      // RESET PASSWORD
      case RESET_PASSWORD_REQUEST:
        return { ...state, resetPasswordLoading: true, resetPasswordError: null, resetPasswordSuccess: false };
  
      case RESET_PASSWORD_SUCCESS:
        return { ...state, resetPasswordLoading: false, resetPasswordSuccess: true };
  
      case RESET_PASSWORD_FAILURE:
        return { ...state, resetPasswordLoading: false, resetPasswordError: action.payload };
  
      default:
        return state;
    }
  }