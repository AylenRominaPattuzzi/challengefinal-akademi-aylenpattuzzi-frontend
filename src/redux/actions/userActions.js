import axiosInstance from "../../api/axiosInstance";
import {
  ADD_USER,
  FETCH_USERS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../types/userTypes";


// Recover password action
export const forgotPassword = (email) => async dispatch => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  try {
    await axiosInstance.post('auth/user/forgot-password', { email });
    dispatch({ type: FORGOT_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error.response?.data?.message || 'Error al enviar email de recuperación'
    });
  }
};

export const resetPassword = (token, password) => async dispatch => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    await axiosInstance.post(`auth/user/reset-password/${token}`, { password });
    dispatch({ type: RESET_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
      payload: error.response?.data?.message || 'Error al restablecer contraseña'
    });
  }
};

export const addUser = (formData) => async dispatch => {
  const response = await axiosInstance.post("/auth/user/register", formData);
  dispatch({ type: ADD_USER, payload: response.data });
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/auth/user/users");
    dispatch({
      type: FETCH_USERS,
      payload: response.data.data,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

  }
};