var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: String,
	preferredName: String,
	email: String,
	icon: String,
	sub: String,
});

module.exports = mongoose.model( 'Person', personSchema );