import axiosInstance from '../../api/axiosInstance';
import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAILURE
} from '../types/statsTypes';

export const fetchGeneralStats = () => async (dispatch) => {
  dispatch({ type: FETCH_STATS_REQUEST });
  try {
    const response = await axiosInstance.get('/stats/general');
    dispatch({ type: FETCH_STATS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_STATS_FAILURE,
      payload: error.response?.data?.message || 'Error al obtener estadísticas',
    });
  }
};
