module.exports = function(role){

  return function(req, res, next){
    if(req.user.roles.indexOf(role) !== -1){
      next();
    } else {
      next('User not authorized to view this resource.');
    }
  };
};
