

function tokenCheck(req, res, next) {
  var token;
  if (localStorage.getItem(godzilla_token)) {
    token = localStorage.getItem(godzilla_token);
  } else 
    token = '12345';
    
  // if (!token) res.status(400).json({status: 'error', result: 'no token provided'});
  
}

module.export = tokenCheck;