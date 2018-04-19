var mongoose = require('mongoose'),
  Semester = mongoose.model('semester'),
  Assignment = mongoose.model('assignment');
  Problem = mongoose.model('problem');

exports.getAll = function(req, res) {
  Problem.find({}, function(err, problems) {
    if (err)
      res.send({error: err});
    res.json({ problems });
  });
};

exports.addProblem = function(req, res) {
  // Get the semester
  Semester.findOne({ name: req.params.semester_name }, function(err, semester) {
    if (err) {
      res.send({error: err});
    } else {
      // Get the assignment
      const query = {
        '_id': { '$in': semester.assignments.map(id => mongoose.Types.ObjectId(id)) },
        name: req.params.assignment_name
      };
      Assignment.findOne(query, function(err, assignment) {
        if (err) {
          res.send({error: err});
        } else {
          // Create the new problem
          var new_problem = new Problem(req.body);
          new_problem.save(function(err, problem) {
            if (err) {
              res.send({error: err});
            } else {
              // Update problems in assignment
              assignment.problems.push(problem._id);
              assignment.save(function(err, assignment) {
                if (err)
                  res.send({error: err});
                else
                  res.json({ assignment, problem });
              });
            }
          });
        }
      });
    }
  });
};

exports.getProblem = function(req, res) {
  Semester.findOne({ name: req.params.semester_name }, function(err, semester) {
    if (err) {
      res.send({error: err});
    } else {
      const assignment_query = {
        '_id': { '$in': semester.assignments.map(id => mongoose.Types.ObjectId(id)) },
        name: req.params.assignment_name
      };
      Assignment.findOne(assignment_query, function(err, assignment) {
        if (err) {
          res.send({error: err});
        } else {
          const problem_query = {
            '_id': { '$in': assignment.problems.map(id => mongoose.Types.ObjectId(id)) },
            name: req.params.problem_name
          };
          Problem.findOne(problem_query, function(err, problem) {
            if (err) {
              res.send({error: err});
            } else {
              res.json({ problem });
            }
          });
        }
      });
    }
  });
};

exports.updateProblem = function(req, res) {
  Semester.findOne({ name: req.params.semester_name }, function(err, semester) {
    if (err) {
      res.send({error: err});
    } else {
      const assignment_query = {
        '_id': { '$in': semester.assignments.map(id => mongoose.Types.ObjectId(id)) },
        name: req.params.assignment_name
      };
      Assignment.findOne(assignment_query, function(err, assignment) {
        if (err) {
          res.send({error: err});
        } else {
          const problem_query = {
            '_id': { '$in': assignment.problems.map(id => mongoose.Types.ObjectId(id)) },
            name: req.params.problem_name
          };
          Problem.findOneAndUpdate(problem_query, req.body, {new: true}, function(err, problem) {
            if (err) {
              res.send({error: err});
            } else {
              res.json({ problem });
            }
          });
        }
      });
    }
  });
};


exports.deleteProblem = function(req, res) {
  Semester.findOne({ name: req.params.semester_name }, function(err, semester) {
    if (err) {
      res.send({error: err});
    } else {
      const assignment_query = {
        '_id': { '$in': semester.assignments.map(id => mongoose.Types.ObjectId(id)) },
        name: req.params.assignment_name
      };
      Assignment.findOne(assignment_query, function(err, assignment) {
        if (err) {
          res.send({error: err});
        } else {
          const problem_query = {
            '_id': { '$in': assignment.problems.map(id => mongoose.Types.ObjectId(id)) },
            name: req.params.problem_name
          };
          Problem.findOneAndUpdate(problem_query, req.body, {new: true}, function(err, problem) {
            if (err) {
              res.send({error: err});
            } else {
              assignment.problems.pull(mongoose.Types.ObjectId(problem._id));
              assignment.save(function(err, assignment) {
                if (err) {
                  res.send({error: err});
                } else {
                  Problem.remove({ '_id': mongoose.Types.ObjectId(problem._id)}, function(err) {
                    if (err)
                      res.send({error: err});
                    res.json({ assignment, problem });
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};
