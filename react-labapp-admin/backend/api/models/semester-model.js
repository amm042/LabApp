'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Assignment = require('./assignment-model');

let SemesterSchema = new Schema(
  {
    name: {
      type: String,
      default: ""
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    assignments: {
      type: [Schema.Types.ObjectId],
      ref: 'assignment',
      default: []
    }
  }
);

module.exports = mongoose.model('semester', SemesterSchema);
