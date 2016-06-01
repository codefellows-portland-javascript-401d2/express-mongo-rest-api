const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  roles: [String]
});

userSchema.methods.generateHash = function(password){
  return this.password = bcrypt.hashSync(password, 8);
};

userSchema.methods.compareHash = function(password){
  return this.password = bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
