import { combineReducers } from "redux";

import semesters from "./semestersReducer";
import assignments from './assignmentsReducer';
import problems from './problemsReducer';

export default combineReducers({
  semesters,
  assignments,
  problems
})
