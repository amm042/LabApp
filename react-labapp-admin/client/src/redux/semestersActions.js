import { onSuccessEditCourse } from './coursesActions';

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
 * @param {*} course
 * @param {*} semester
 * @return {Promise}
 */
export function DispatchAddSemester(dispatch, course, semester) {
  return new Promise((resolve, reject) => {
    dispatch(AddSemester(semester));
    fetch(`${server_url}/courses/${course.name}`, {
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
          dispatch(onSuccessEditCourse(json.course));
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
 * @param {*} course
 * @param {*} old_semester
 * @param {*} semester
 * @return {Promise}
 */
export function DispatchEditSemester(dispatch, course, old_semester, semester) {
  return new Promise((resolve, reject) => {
    dispatch(EditSemester(semester));
    fetch(`${server_url}/courses/${course.name}/${old_semester.name}`, {
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
 * @param {*} course
 * @param {*} semester
 * @return {Promise}
 */
export function DispatchDeleteSemester(dispatch, course, semester) {
  return new Promise((resolve, reject) => {
    dispatch(DeleteSemester(semester));
    fetch(`${server_url}/courses/${course.name}/${semester.name}`, {
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
          dispatch(onSuccessEditCourse(json.course));
          dispatch(onSuccessDeleteSemester(json.course, json.semester));
          resolve();
        }
      }
    );
  });
}

function DeleteSemester() {
  return { type: "DELETE_SEMESTER" };
}

function onSuccessDeleteSemester(course, semester) {
  return { type: "DELETE_SEMESTER_SUCCESS", data: { semester } };
}

function onFailureDeleteSemester(error) {
  return { type: "DELETE_SEMESTER_FAILURE", data: { error } };
}
