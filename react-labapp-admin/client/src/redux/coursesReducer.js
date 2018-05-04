const INIT_STATE = { list: [], is_loading: false, status: null };

/**
 * @param {{list: [], is_loading: boolean, status: string}} state
 * @param {{type, data}} action
 * @return {[]}
 */
export default function reducer(state=INIT_STATE, action){
  let result = { ...state };
  let index = -1;
  switch (action.type) {
    case "FETCH_COURSES":
      console.log("Fetching Courses...");
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "FETCH_COURSES_SUCCESS":
      console.log("Fetch Courses Success!");
      result = {
        ...state,
        is_loading: false,
        status: "Success",
        list: action.data.courses
      };
      break;
    case "FETCH_COURSES_FAILURE":
      console.log("Fetch Courses Failure!");
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error.errmsg}`,
        list: [
          ...state,
          action.data.course
        ]
      };
      break;
    case "ADD_COURSE":
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "ADD_COURSE_SUCCESS":
      result = {
        ...state,
        is_loading: false,
        status: "Success",
        list: [
          ...state.list,
          action.data.course
        ]
      };
      break;
    case "ADD_COURSE_FAILURE":
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error.errmsg}`
      };
      break;
    case "EDIT_COURSE":
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "EDIT_COURSE_SUCCESS":
      index = state.list.findIndex(course => course._id === action.data.course._id);
      result.list[index] = action.data.course;
      break;
    case "EDIT_COURSE_FAILURE":
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error.errmsg}`,
        list: [
          ...state,
          action.data.course
        ]
      };
      break;
    case "DELETE_COURSE":
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "DELETE_COURSE_SUCCESS":
      result.list = state.list.filter(course => course._id !== action.data.course._id);
      break;
    case "DELETE_COURSE_FAILURE":
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error.errmsg}`,
        list: [
          ...state,
          action.data.course
        ]
      };
      break;
  }
  return result;
}
