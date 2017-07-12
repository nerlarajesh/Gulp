var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
	pid:  String,
	name: String,
	path: String,
	desc: String
});
module.exports = mongoose.model('products', productSchema)