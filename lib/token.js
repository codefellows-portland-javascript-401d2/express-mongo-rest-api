const jwt = require('json-web-token');
const key = 'gojira';

const token = {};

token.sign = function(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {id: user._id},
      key,
      null,
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }   
    );
  });
};

token.verify = function(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      key,
      (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
      }
    );
  });
};

token.validate = function(req, res, next) {
  var token;
  if (localStorage.getItem(godzilla_token)) {
    token = localStorage.getItem(godzilla_token);
  } else 
    token = '12345';
    
  // if (!token) res.status(400).json({status: 'error', result: 'no token provided'});
  
}

module.export = token;