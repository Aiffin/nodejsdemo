var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoginSchema = new Schema({
	name:String,
	password:String
	
});

module.exports = mongoose.model('Login',LoginSchema);