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
    case "FETCH_PROBLEMS":
      console.log("Fetching Problems...");
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "FETCH_PROBLEMS_SUCCESS":
      console.log("Fetch Problems Success!");
      result = {
        ...state,
        is_loading: false,
        status: "Success",
        list: action.data.problems
      };
      break;
    case "FETCH_PROBLEMS_FAILURE":
      console.log("Fetch Problems Failure!");
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error}`,
        list: [
          ...state,
          action.data.problem
        ]
      };
      break;
    case "ADD_PROBLEM":
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "ADD_PROBLEM_SUCCESS":
      result = {
        ...state,
        is_loading: false,
        status: "Success",
        list: [
          ...state.list,
          action.data.problem
        ]
      };
      break;
    case "ADD_PROBLEM_FAILURE":
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error}`
      };
      break;
    case "EDIT_PROBLEM":
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "EDIT_PROBLEM_SUCCESS":
      index = state.list.findIndex(problem => problem._id === action.data.problem._id);
      result.list[index] = action.data.problem;
      break;
    case "EDIT_PROBLEM_FAILURE":
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error}`,
        list: [
          ...state,
          action.data.problem
        ]
      };
      break;
    case "DELETE_PROBLEM":
      result = {
        ...state,
        is_loading: true,
        status: null
      };
      break;
    case "DELETE_PROBLEM_SUCCESS":
      result.list = state.list.filter(problem => problem._id !== action.data.problem._id);
      break;
    case "DELETE_PROBLEM_FAILURE":
      result = {
        ...state,
        is_loading: false,
        status: `Error - ${action.data.error}`,
        list: [
          ...state,
          action.data.problem
        ]
      };
      break;
  }
  return result;
}
