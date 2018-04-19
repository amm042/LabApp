'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Problem = require('./problem-model');

let AssignmentSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter the name of the assignment',
    unique: false
  },
  description: {
    type: String,
    default: ""
  },
  problems: {
    type: [Schema.Types.ObjectId],
    ref: 'problem',
    default: []
  }
});

module.exports = mongoose.model('assignment', AssignmentSchema);
