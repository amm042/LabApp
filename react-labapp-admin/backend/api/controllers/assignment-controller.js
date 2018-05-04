var mongoose = require('mongoose'),
  Assignment = mongoose.model('assignment');
  Semester = mongoose.model('semester');
  Course = mongoose.model('course');

exports.getAll = function(req, res) {
  Assignment.find({}, function(err, assignments) {
    if (err)
      res.send({error: err});
    res.json({ assignments });
  });
};

exports.addAssignment = function(req, res) {
  Course.findOne({ name: req.params.course_name }, function(err, course) {
    if (err) {
      res.send({error: err});
    } else {
      const query = {
        '_id': { '$in': course.semesters.map(id => mongoose.Types.ObjectId(id)) },
        name: req.params.semester_name
      };
      Semester.findOne(query, function(err, semester) {
        if (err) {
          res.send({error: err});
        } else {
          var new_assignment = new Assignment(req.body);
          new_assignment.save(function(err, assignment) {
            if (err) {
              res.send({error: err});
            } else {
              semester.assignments.push( assignment._id );
              semester.save(function(err, semester) {
                if (err)
                  res.send({error: err});
                res.json({ semester, assignment });
              });
            }
          });
        }
      });
    }
  });
};

exports.getAssignment = function(req, res) {
  Course.findOne({ name: req.params.course_name }, function(err, course) {
    if (err) {
      res.send({error: err});
    } else {
      const query = {
        '_id': { '$in': course.semesters.map(id => mongoose.Types.ObjectId(id)) },
        name: req.params.semester_name
      };
      Semester.findOne({ '_id': { $in: course.semesters.map(id => mongoose.Types.ObjectId(id))}, name: req.params.semester_name}, function(err, semester) {
        if (err) {
          res.send({error: err});
        } else {
          const query = {
            '_id': { '$in': semester.assignments.map(id => mongoose.Types.ObjectId(id)) },
            name: req.params.assignment_name
          };
          Assignment.findOne(query, function(err, assignment) {
            if (err)
              res.send({error: err});
            res.json({ assignment });
          });
        }
      });
    }
  });
};

exports.updateAssignment = function(req, res) {
  Course.findOne({ name: req.params.course_name }, function(err, course) {
    if (err) {
      res.send({error: err});
    } else {
      const query = {
        '_id': { '$in': course.semesters.map(id => mongoose.Types.ObjectId(id)) },
        name: req.params.semester_name
      };
      Semester.findOne({ '_id': { $in: course.semesters.map(id => mongoose.Types.ObjectId(id))}, name: req.params.semester_name}, function(err, semester) {
        if (err) {
          res.send({error: err});
        } else {
          Assignment.findOneAndUpdate(
            {
              '_id': { $in: semester.assignments.map(id => mongoose.Types.ObjectId(id)) },
              name: req.params.assignment_name
            },
            req.body,
            {new: true},
            function(err, assignment) {
              if (err) {
                res.send({error: err});
              } else {
                res.json({ assignment });
              }
            }
          );
        }
      });
    }
  });
};

exports.deleteAssignment = function(req, res) {
  Course.findOne({ name: req.params.course_name }, function(err, course) {
    if (err) {
      res.send({error: err});
    } else {
      Semester.findOne({ '_id': { $in: course.semesters.map(id => mongoose.Types.ObjectId(id))}, name: req.params.semester_name}, function(err, semester) {
        if (err) {
          res.send({error: err});
        } else {
          Assignment.findOne({ '_id': { $in: semester.assignments.map(id => mongoose.Types.ObjectId(id))}, name: req.params.assignment_name}, function(err, assignment) {
            if (err) {
              res.send({error: err});
            } else {
              semester.assignments.pull(mongoose.Types.ObjectId(assignment._id));
              semester.save(function(err, semester) {
                if (err) {
                  res.send({error: err});
                } else {
                  Assignment.remove({ '_id': mongoose.Types.ObjectId(assignment._id)}, function(err) {
                    if (err)
                      res.send({error: err});
                    res.json({ semester, assignment });
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
