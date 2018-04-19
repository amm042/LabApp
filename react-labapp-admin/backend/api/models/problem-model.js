'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let ProblemSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter the name of the assignment',
    unique: false
  },
  dayOffset: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('problem', ProblemSchema);
