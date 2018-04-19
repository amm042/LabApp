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
    case "FETCH_ASSIGNMENTS":
      console.log("Fetching Assignments...");
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "FETCH_ASSIGNMENTS_SUCCESS":
      console.log("Fetch Assignments Success!");
      result = {
        ...state,
        is_loading: false,
        status: "Success",
        list: action.data.assignments
      };
      break;
    case "FETCH_ASSIGNMENTS_FAILURE":
      console.log("Fetch Assignments Failure!");
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error}`,
        list: [
          ...state,
          action.data.assignment
        ]
      };
      break;
    case "ADD_ASSIGNMENT":
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "ADD_ASSIGNMENT_SUCCESS":
      result = {
        ...state,
        is_loading: false,
        status: "Success",
        list: [
          ...state.list,
          action.data.assignment
        ]
      };
      break;
    case "ADD_ASSIGNMENT_FAILURE":
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error}`
      };
      break;
    case "EDIT_ASSIGNMENT":
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "EDIT_ASSIGNMENT_SUCCESS":
      index = state.list.findIndex(assignment => assignment._id === action.data.assignment._id);
      result.list[index] = action.data.assignment;
      break;
    case "EDIT_ASSIGNMENT_FAILURE":
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error}`,
        list: [
          ...state,
          action.data.assignment
        ]
      };
      break;
    case "DELETE_ASSIGNMENT":
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "DELETE_ASSIGNMENT_SUCCESS":
      result.list = state.list.filter(assignment => assignment._id !== action.data.assignment._id);
      break;
    case "DELETE_ASSIGNMENT_FAILURE":
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error}`,
        list: [
          ...state,
          action.data.assignment
        ]
      };
      break;
  }
  return result;
}
