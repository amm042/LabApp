var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testResultSchema = new Schema({
	_id: Schema.Types.ObjectId,
	writeObject: {
		type: Schema.Types.ObjectId,
		ref: 'Work'
	},
	test: String,
	pass: Boolean,
	output: String,
	datetime: Date,
	hostMachine: String
});

module.exports = mongoose.model( 'Test Result', testResultSchema );