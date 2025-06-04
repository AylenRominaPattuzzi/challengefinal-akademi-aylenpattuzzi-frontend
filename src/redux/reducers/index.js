import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import courseReducer from "./courseReducer";


export default combineReducers({
  auth: authReducer,
  user: userReducer,
  course: courseReducer,
});
