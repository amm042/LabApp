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
    case "REORDER_SEMESTERS":
      console.log("Reordering Semesters");
      let semesters = [];
      action.data.semesters.forEach(sem1 => semesters.push(state.list.find(sem2 => sem1._id === sem2._id)));
      result = semesters;
      break;
    case "FETCH_SEMESTERS":
      console.log("Fetching Semesters...");
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "FETCH_SEMESTERS_SUCCESS":
      console.log("Fetch Semesters Success!");
      result = {
        ...state,
        is_loading: false,
        status: "Success",
        list: action.data.semesters
      };
      break;
    case "FETCH_SEMESTERS_FAILURE":
      console.log("Fetch Semesters Failure!");
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error.errmsg}`,
        list: [
          ...state,
          action.data.semester
        ]
      };
      break;
    case "ADD_SEMESTER":
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "ADD_SEMESTER_SUCCESS":
      result = {
        ...state,
        is_loading: false,
        status: "Success",
        list: [
          ...state.list,
          action.data.semester
        ]
      };
      break;
    case "ADD_SEMESTER_FAILURE":
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error.errmsg}`
      };
      break;
    case "EDIT_SEMESTER":
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "EDIT_SEMESTER_SUCCESS":
      index = state.list.findIndex(semester => semester._id === action.data.semester._id);
      result.list[index] = action.data.semester;
      break;
    case "EDIT_SEMESTER_FAILURE":
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error.errmsg}`,
        list: [
          ...state,
          action.data.semester
        ]
      };
      break;
    case "DELETE_SEMESTER":
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "DELETE_SEMESTER_SUCCESS":
      result.list = state.list.filter(semester => semester._id !== action.data.semester._id);
      break;
    case "DELETE_SEMESTER_FAILURE":
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error.errmsg}`,
        list: [
          ...state,
          action.data.semester
        ]
      };
      break;
  }
  return result;
}
