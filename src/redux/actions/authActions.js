import axiosInstance from "../../api/axiosInstance";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
} from "../types/authTypes";


export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const response = await axiosInstance.post('auth/login', credentials);
        const { token, role } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        dispatch({ type: LOGIN_SUCCESS, payload: { token, role } });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || "Login failed" });
    }
};


export const logoutUser = () => async (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    dispatch({ type: LOGOUT });
};
