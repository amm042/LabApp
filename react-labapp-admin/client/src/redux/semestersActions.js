const server_url = "http://localhost:8000";

/**
 * Gets all semesters from the database
 * @param {Dispatch} dispatch
 * @return {Promise}
 */
export function DispatchFetchSemesters(dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(FetchSemesters());
    fetch(`${server_url}/semesters`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureFetchSemesters(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessFetchSemesters(json.semesters));
          resolve();
        }
      }
    );
  });
}

function FetchSemesters() {
  return { type: "FETCH_SEMESTERS" };
}

function onSuccessFetchSemesters(semesters) {
  return { type: "FETCH_SEMESTERS_SUCCESS", data: { semesters } };
}

function onFailureFetchSemesters(error) {
  return { type: "FETCH_SEMESTERS_FAILURE", data: { error } };
}

/**
 * Adds a semester to the database
 * @param {Dispatch} dispatch
 * @param {*} semester
 * @return {Promise}
 */
export function DispatchAddSemester(dispatch, semester) {
  return new Promise((resolve, reject) => {
    dispatch(AddSemester(semester));
    fetch(`${server_url}/semesters`, {
      body: JSON.stringify(semester),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureAddSemester(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessAddSemester(json.semester));
          resolve();
        }
      }
    );
  });
}

function AddSemester(semester) {
  return { type: "ADD_SEMESTER", data: { semester } };
}

function onSuccessAddSemester(semester) {
  return { type: "ADD_SEMESTER_SUCCESS", data: { semester } };
}

function onFailureAddSemester(error) {
  return { type: "ADD_SEMESTER_FAILURE", data: { error } };
}

/**
 * Edits a semester on the database
 * @param {Dispatch} dispatch
 * @param {*} old_semester - this is the name of the semester in case it is updated
 * @param {*} semester
 * @return {Promise}
 */
export function DispatchEditSemester(dispatch, old_semester, semester) {
  return new Promise((resolve, reject) => {
    dispatch(EditSemester(semester));
    fetch(`${server_url}/semesters/${old_semester.name}`, {
      body: JSON.stringify(semester),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureEditSemester(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessEditSemester(json.semester));
          resolve();
        }
      }
    );
  });
}

function EditSemester(semester) {
  return { type: "EDIT_SEMESTER", data: { semester } };
}

export function onSuccessEditSemester(semester) {
  return { type: "EDIT_SEMESTER_SUCCESS", data: { semester } };
}

function onFailureEditSemester(error) {
  return { type: "EDIT_SEMESTER_FAILURE", data: { error } };
}

/**
 * Deletes a semester from the database
 * @param {Dispatch} dispatch
 * @param {*} semester
 * @return {Promise}
 */
export function DispatchDeleteSemester(dispatch, semester) {
  return new Promise((resolve, reject) => {
    dispatch(DeleteSemester(semester));
    fetch(`${server_url}/semesters/${semester.name}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureDeleteSemester(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessDeleteSemester(json.semester));
          resolve();
        }
      }
    );
  });
}

function DeleteSemester() {
  return { type: "DELETE_SEMESTER" };
}

function onSuccessDeleteSemester(semester) {
  return { type: "DELETE_SEMESTER_SUCCESS", data: { semester } };
}

function onFailureDeleteSemester(error) {
  return { type: "DELETE_SEMESTER_FAILURE", data: { error } };
}
