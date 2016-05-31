const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = require('mongoose').schema;

const User = mongoose.model('User', new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
}
));

User.methods.generateHash = function(password){
  return this.password = bcrypt.hashSync(password, 8);
};

User.methods.compareHash = function(password){
  return this.password = bcrypt.compareSync(password, this.password);
};

module.exports = User;
