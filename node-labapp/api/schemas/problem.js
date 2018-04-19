var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var problemSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: String,
	dueOffset: Number,
	tests: [{
		type: Schema.Types.ObjectId,
		ref: 'test'
	}]
});

module.exports = mongoose.model( 'Problem', problemSchema );