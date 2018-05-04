import { combineReducers } from "redux";

import courses from './coursesReducer';
import semesters from "./semestersReducer";
import assignments from './assignmentsReducer';
import problems from './problemsReducer';

export default combineReducers({
  courses,
  semesters,
  assignments,
  problems
})
