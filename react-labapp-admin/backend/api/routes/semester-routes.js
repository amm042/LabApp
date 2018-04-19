'use strict';
module.exports = function(app) {
  var semesters = require('../controllers/semester-controller');

  // semester Routes
  app.route('/semesters')
    .get(semesters.getAll)
    .post(semesters.addSemester);

  app.route('/semesters/:semester_name')
    .get(semesters.getSemester)
    .put(semesters.updateSemester)
    .delete(semesters.deleteSemester);
};
