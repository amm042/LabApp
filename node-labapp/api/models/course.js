var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var courseChema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  semester: [
    {
      type: Schema.Types.ObjectId,
      ref: "Semester"
    }
  ]
});
module.exports = mongoose.model("Course", courseChema);