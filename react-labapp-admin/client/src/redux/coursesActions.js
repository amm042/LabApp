const server_url = "http://localhost:8000";

/**
 * Gets all courses from the database
 * @param {Dispatch} dispatch
 * @return {Promise}
 */
export function DispatchFetchCourses(dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(FetchCourses());
    fetch(`${server_url}/courses`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureFetchCourses(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessFetchCourses(json.courses));
          resolve();
        }
      }
    );
  });
}

function FetchCourses() {
  return { type: "FETCH_COURSES" };
}

function onSuccessFetchCourses(courses) {
  return { type: "FETCH_COURSES_SUCCESS", data: { courses } };
}

function onFailureFetchCourses(error) {
  return { type: "FETCH_COURSES_FAILURE", data: { error } };
}

/**
 * Adds a course to the database
 * @param {Dispatch} dispatch
 * @param {*} course
 * @return {Promise}
 */
export function DispatchAddCourse(dispatch, course) {
  return new Promise((resolve, reject) => {
    dispatch(AddCourse(course));
    fetch(`${server_url}/courses`, {
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureAddCourse(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessAddCourse(json.course));
          resolve();
        }
      }
    );
  });
}

function AddCourse(course) {
  return { type: "ADD_COURSE", data: { course } };
}

function onSuccessAddCourse(course) {
  return { type: "ADD_COURSE_SUCCESS", data: { course } };
}

function onFailureAddCourse(error) {
  return { type: "ADD_COURSE_FAILURE", data: { error } };
}

/**
 * Edits a course on the database
 * @param {Dispatch} dispatch
 * @param {*} old_course - this is the name of the course in case it is updated
 * @param {*} course
 * @return {Promise}
 */
export function DispatchEditCourse(dispatch, old_course, course) {
  return new Promise((resolve, reject) => {
    dispatch(EditCourse(course));
    fetch(`${server_url}/courses/${old_course.name}`, {
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureEditCourse(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessEditCourse(json.course));
          resolve();
        }
      }
    );
  });
}

function EditCourse(course) {
  return { type: "EDIT_COURSE", data: { course } };
}

export function onSuccessEditCourse(course) {
  return { type: "EDIT_COURSE_SUCCESS", data: { course } };
}

function onFailureEditCourse(error) {
  return { type: "EDIT_COURSE_FAILURE", data: { error } };
}

/**
 * Deletes a course from the database
 * @param {Dispatch} dispatch
 * @param {*} course
 * @return {Promise}
 */
export function DispatchDeleteCourse(dispatch, course) {
  return new Promise((resolve, reject) => {
    dispatch(DeleteCourse(course));
    fetch(`${server_url}/courses/${course.name}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE' })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(onFailureDeleteCourse(json.error));
          reject(json.error);
        } else {
          dispatch(onSuccessDeleteCourse(json.course));
          resolve();
        }
      }
    );
  });
}

function DeleteCourse() {
  return { type: "DELETE_COURSE" };
}

function onSuccessDeleteCourse(course) {
  return { type: "DELETE_COURSE_SUCCESS", data: { course } };
}

function onFailureDeleteCourse(error) {
  return { type: "DELETE_COURSE_FAILURE", data: { error } };
}
