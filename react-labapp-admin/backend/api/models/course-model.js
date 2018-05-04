'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Please enter the name of the course',
      unique: true
    },
    full_name: {
      type: String,
      required: 'Please enter the full name of the course',
      unique: true
    },
    description: {
      type: String,
      default: ""
    },
    semesters: {
      type: [Schema.Types.ObjectId],
      ref: 'semester',
      default: []
    }
  }
);

module.exports = mongoose.model('course', CourseSchema);
