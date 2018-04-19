var mongoose = require('mongoose'),
  Semester = mongoose.model('semester'),
  Assignment = mongoose.model('assignment');

exports.getAll = function(req, res) {
  Semester.find({}).lean().exec(function(err, semesters) {
    if (err)
      res.send({error: err});
    res.json({semesters});
  });
};

exports.addSemester = function(req, res) {
  var new_semester = new Semester(req.body);
  new_semester.save(function(err, semester) {
    if (err)
      res.send({error: err});
    res.json({semester});
  });
};

exports.getSemester = function(req, res) {
  Semester.findOne({ name: req.params.semester_name }, function(err, semester) {
    if (err)
      res.send({error: err});
    res.json({semester});
  });
};

exports.updateSemester = function(req, res) {
  Semester.findOneAndUpdate({ name: req.params.semester_name}, req.body, {new: true}, function(err, semester) {
    if (err)
      res.send({error: err});
    res.json({semester});
  });
};


exports.deleteSemester = function(req, res) {
  Semester.findOne({ name: req.params.semester_name }, function(err, semester) {
    if (err) {
      res.send({error: err});
    } else {
      Assignment.remove({ '_id': { $in: semester.assignments.map(id => mongoose.Types.ObjectId(id)) } }, function(err) {
        if (err) {
          res.send({error: err});
        } else {
          Semester.remove({ '_id': mongoose.Types.ObjectId(semester._id) }, function(err) {
            if (err) {
              res.send({error: err});
            } else {
              res.json({ semester });
            }
          });
        }
      });
    }
  });
};
