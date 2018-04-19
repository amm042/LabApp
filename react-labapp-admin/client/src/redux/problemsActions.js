import { onSuccessEditAssignment } from './assignmentsActions';

const server_url = "http://localhost:8000";

/**
 * Gets all problems from the database
 * @param {Dispatch} dispatch
 * @return {Promise}
 */
export function DispatchFetchProblems(dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(FetchProblems());
    fetch(`${server_url}/problems`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureFetchProblems(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessFetchProblems(json.problems));
          resolve();
        }
      }
    );
  });
}

function FetchProblems() {
  return { type: "FETCH_PROBLEMS" };
}

function onSuccessFetchProblems(problems) {
  return { type: "FETCH_PROBLEMS_SUCCESS", data: { problems } };
}

function onFailureFetchProblems(error) {
  return { type: "FETCH_PROBLEMS_FAILURE", data: { error } };
}

/**
 * Adds a problem to the database
 * @param {Dispatch} dispatch
 * @param {*} semester
 * @param {*} assignment
 * @param {*} problem
 * @return {Promise}
 */
export function DispatchAddProblem(dispatch, semester, assignment, problem) {
  return new Promise((resolve, reject) => {
    dispatch(AddProblem(problem));
    fetch(`${server_url}/semesters/${semester.name}/${assignment.name}`, {
      body: JSON.stringify(problem),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureAddProblem(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessAddProblem(json.problem));
          dispatch(onSuccessEditAssignment(json.assignment));
          resolve();
        }
      }
    );
  });
}

function AddProblem(problem) {
  return { type: "ADD_PROBLEM", data: { problem } };
}

function onSuccessAddProblem(problem) {
  return { type: "ADD_PROBLEM_SUCCESS", data: { problem } };
}

function onFailureAddProblem(error) {
  return { type: "ADD_PROBLEM_FAILURE", data: { error } };
}

/**
 * Edits a problem on the database
 * @param {Dispatch} dispatch
 * @param {*} semester
 * @param {*} assignment
 * @param {*} old_problem - this is the name of the problem in case it is updated
 * @param {*} problem
 * @return {Promise}
 */
export function DispatchEditProblem(dispatch, semester, assignment, old_problem, problem) {
  return new Promise((resolve, reject) => {
    dispatch(EditProblem(problem));
    fetch(`${server_url}/semesters/${semester.name}/${assignment.name}/${old_problem.name}`, {
      body: JSON.stringify(problem),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureEditProblem(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessEditProblem(json.problem));
          resolve();
        }
      }
    );
  });
}

export function EditProblem(problem) {
  return { type: "EDIT_PROBLEM", data: { problem } };
}

function onSuccessEditProblem(problem) {
  return { type: "EDIT_PROBLEM_SUCCESS", data: { problem } };
}

function onFailureEditProblem(error) {
  return { type: "EDIT_PROBLEM_FAILURE", data: { error } };
}

/**
 * Deletes a problem from the database
 * @param {Dispatch} dispatch
 * @param {*} semester
 * @param {*} assignment
 * @param {*} problem
 * @return {Promise}
 */
export function DispatchDeleteProblem(dispatch, semester, assignment, problem) {
  return new Promise((resolve, reject) => {
    dispatch(DeleteProblem(problem));
    fetch(`${server_url}/semesters/${semester.name}/${assignment.name}/${problem.name}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE' })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.error) {
          dispatch(onFailureDeleteProblem(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessDeleteProblem(json.problem));
          dispatch(onSuccessEditAssignment(json.assignment));
          resolve();
        }
      }
    );
  });
}

function DeleteProblem() {
  return { type: "DELETE_PROBLEM" };
}

function onSuccessDeleteProblem(problem) {
  return { type: "DELETE_PROBLEM_SUCCESS", data: { problem } };
}

function onFailureDeleteProblem(error) {
  return { type: "DELETE_PROBLEM_FAILURE", data: { error } };
}
