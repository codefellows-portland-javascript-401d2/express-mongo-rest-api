const tokenChecker = require('./token');

module.exports = function(req, res, next){

  const token = req.headers.token || req.query.token;

  if (!token){
    next('Error 403: Need a token to access this resource');
    return;
  }

  tokenChecker.verify(token)
  .then( payload => {
    req.user = payload;
    next();
  })
  .catch( () => {
    next('Error 403: Token invalid');
  });

};
