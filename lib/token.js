const jwt = require('jsonwebtoken');
const handshake = process.env.APP_SECRET || 'supersupersecret';

module.exports = {
  sign(user){
    return new Promise((resolve, reject) => {
      jwt.sign({
        id: user.id,
        roles: user.roles
      }, handshake, null, (err, token) => {
        if(err) return reject(err);
        resolve(token);
      });
    });
  },

  verify(token){
    return new Promise((resolve, reject) => {
      jwt.verify(token, handshake, (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
      });
    });
  }
};
