import {
    FETCH_STATS_REQUEST,
    FETCH_STATS_SUCCESS,
    FETCH_STATS_FAILURE
  } from '../types/statsTypes';
  
  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  const statsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_STATS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_STATS_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case FETCH_STATS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default statsReducer;
  