var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	pid:  String,
	name: String,
	path: String,
	desc: String
});
module.exports = mongoose.model('products', productSchema)