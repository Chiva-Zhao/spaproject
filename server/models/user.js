/* 
* @Author: chiva
* @Date:   2015-11-02 12:15:22
* @Last Modified time: 2015-11-02 13:18:54
*/
// Import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
// define the schema for our user model
var userSchema = new Schema({
	local:{
		email:String,
		password:String,
	}
});
// generating a hash
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

// validating if password is valid
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password,this.local.password);
};
// create the model for users and export to app
module.exports = mongoose.model('User',userSchema);