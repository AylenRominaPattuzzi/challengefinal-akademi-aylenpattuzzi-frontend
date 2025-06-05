import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import courseReducer from "./courseReducer";
import gradeReducer from "./gradeReducer";
import enrollmentReducer from "./enrollmentReducer";
import statsReducer from "./statsReducer";


export default combineReducers({
  auth: authReducer,
  user: userReducer,
  course: courseReducer,
  grade: gradeReducer,
  enrollment: enrollmentReducer,
  stats: statsReducer,
});
