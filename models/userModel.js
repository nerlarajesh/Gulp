var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	email:  String,
	pwd: String,
	name: String
});
module.exports = mongoose.model('users', userSchema)