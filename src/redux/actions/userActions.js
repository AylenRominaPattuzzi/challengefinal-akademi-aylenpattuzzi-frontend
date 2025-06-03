import axiosInstance from "../../api/axiosInstance";
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
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../types/userTypes";


export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });

  try {
    await axiosInstance.post('auth/user/forgot-password', { email });
    dispatch({ type: FORGOT_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error.response?.data?.message || 'Error al enviar email de recuperación',
    });
  }
};


export const resetPassword = (token, password) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });

  try {
    await axiosInstance.post(`auth/user/reset-password/${token}`, { password });
    dispatch({ type: RESET_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
      payload: error.response?.data?.message || 'Error al restablecer contraseña',
    });
  }
};


export const addUser = (formData) => async (dispatch) => {
  dispatch({ type: ADD_USER_REQUEST });

  try {
    const response = await axiosInstance.post("/auth/user/register", formData);
    dispatch({ type: ADD_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: ADD_USER_FAILURE,
      payload: error.response?.data?.message || 'Error al registrar usuario',
    });
  }
};

export const fetchUsers = ({ page = 1, role = '' } = {}) => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });

  try {
    const params = {};
    if (page) params.page = page;
    if (role) params.role = role;

    const response = await axiosInstance.get("/auth/user/users", { params });

    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: {
        users: response.data.data,
        total: response.data.total,
        page: response.data.page,
        limit: response.data.limit,
        totalPages: response.data.totalPages,
      },
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error.response?.data?.message || 'Error al obtener usuarios',
    });
  }
};


export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });

  try {
    await axiosInstance.delete(`/auth/user/users/${id}`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: id });
    dispatch(fetchUsers());
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: error.response?.data?.message || 'Error al eliminar el usuario',
    });
  }
};

export const editUser = (id, updatedData) => async (dispatch) => {
  dispatch({ type: EDIT_USER_REQUEST });

  try {
    const response = await axiosInstance.put(`/auth/user/users/${id}`, updatedData);
    dispatch({ type: EDIT_USER_SUCCESS, payload: response.data });
    dispatch(fetchUsers());
  } catch (error) {
    dispatch({
      type: EDIT_USER_FAILURE,
      payload: error.response?.data?.message || "Error al actualizar el usuario",
    });
  }
};