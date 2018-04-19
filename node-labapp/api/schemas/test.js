var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: String,
	type: String,
	stdin: String,
	stdout: String,
	testargs: String,
	inputFiles: String,
	outputFiles: String,
	hasHttp: Boolean
});

module.exports = mongoose.model( 'Test', testSchema );