import { onSuccessEditSemester } from './semestersActions';

const server_url = "http://localhost:8000";

/**
 * Gets all assignments from the database
 * @param {Dispatch} dispatch
 * @return {Promise}
 */
export function DispatchFetchAssignments(dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(FetchAssignments());
    fetch(`${server_url}/assignments`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureFetchAssignments(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessFetchAssignments(json.assignments));
          resolve();
        }
      }
    );
  });
}

function FetchAssignments() {
  return { type: "FETCH_ASSIGNMENTS" };
}

function onSuccessFetchAssignments(assignments) {
  return { type: "FETCH_ASSIGNMENTS_SUCCESS", data: { assignments } };
}

function onFailureFetchAssignments(error) {
  return { type: "FETCH_ASSIGNMENTS_FAILURE", data: { error } };
}

/**
 * Adds a assignment to the database
 * @param {Dispatch} dispatch
 * @param {*} semester
 * @param {*} assignment
 * @return {Promise}
 */
export function DispatchAddAssignment(dispatch, semester, assignment) {
  return new Promise((resolve, reject) => {
    dispatch(AddAssignment(assignment));
    fetch(`${server_url}/semesters/${semester.name}`, {
      body: JSON.stringify(assignment),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureAddAssignment(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessAddAssignment(json.assignment));
          dispatch(onSuccessEditSemester(json.semester));
          resolve();
        }
      }
    );
  });
}

function AddAssignment(assignment) {
  return { type: "ADD_ASSIGNMENT", data: { assignment } };
}

function onSuccessAddAssignment(assignment) {
  return { type: "ADD_ASSIGNMENT_SUCCESS", data: { assignment } };
}

function onFailureAddAssignment(error) {
  return { type: "ADD_ASSIGNMENT_FAILURE", data: { error } };
}

/**
 * Edits a assignment on the database
 * @param {Dispatch} dispatch
 * @param {*} semester
 * @param {*} old_assignment - this is the name of the assignment in case it is updated
 * @param {*} assignment
 * @return {Promise}
 */
export function DispatchEditAssignment(dispatch, semester, old_assignment, assignment) {
  return new Promise((resolve, reject) => {
    dispatch(EditAssignment(assignment));
    fetch(`${server_url}/semesters/${semester.name}/${old_assignment.name}`, {
      body: JSON.stringify(assignment),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureEditAssignment(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessEditAssignment(json.assignment));
          resolve();
        }
      }
    );
  });
}

export function EditAssignment(assignment) {
  return { type: "EDIT_ASSIGNMENT", data: { assignment } };
}

export function onSuccessEditAssignment(assignment) {
  return { type: "EDIT_ASSIGNMENT_SUCCESS", data: { assignment } };
}

function onFailureEditAssignment(error) {
  return { type: "EDIT_ASSIGNMENT_FAILURE", data: { error } };
}

/**
 * Deletes a assignment from the database
 * @param {Dispatch} dispatch
 * @param {*} semester
 * @param {*} assignment
 * @return {Promise}
 */
export function DispatchDeleteAssignment(dispatch, semester, assignment) {
  return new Promise((resolve, reject) => {
    dispatch(DeleteAssignment(assignment));
    fetch(`${server_url}/semesters/${semester.name}/${assignment.name}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureDeleteAssignment(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessDeleteAssignment(json.assignment));
          dispatch(onSuccessEditSemester(json.semester));
          resolve();
        }
      }
    );
  });
}

function DeleteAssignment() {
  return { type: "DELETE_ASSIGNMENT" };
}

function onSuccessDeleteAssignment(assignment) {
  return { type: "DELETE_ASSIGNMENT_SUCCESS", data: { assignment } };
}

function onFailureDeleteAssignment(error) {
  return { type: "DELETE_ASSIGNMENT_FAILURE", data: { error } };
}
