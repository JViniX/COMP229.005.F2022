let User = require('../models/user');
let passport = require('passport');

let jwt = require('jsonwebtoken');
let config = require('../config/config');

function getErrorMessage(err) {
  console.log("===> Erro: " + err);
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};

module.exports.signup = function(req, res, next) {

  console.log(req.body);

  let user = new User(req.body);
  user.provider = 'local';
  console.log(user);

  user.save((err) => {
    if (err) {
      let message = getErrorMessage(err);

      return res.status(400).json(
        {
          success: false, 
          message: message
        }
      );
    }
    return res.json(
      {
        success: true, 
        message: 'User created successfully!'
      }
    );
  });
};


module.exports.signin = function(req, res, next){
  passport.authenticate(
    'login', 
  async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(400).json(
            { 
              success: false, 
              message: err || info.message
            }
          );
      }
  
      req.login(
          user,
          { session: false },
          async (error) => {
            if (error) {
              return next(error);
            }

            // Generating the JWT token.
            const payload = 
              { 
                id: user._id, 
                email: user.email 
              };
            const token = jwt.sign(
              { 
                payload: payload
              }, 
              config.SECRETKEY, 
              { 
                algorithm: 'HS512', 
                expiresIn: "20min"
              }
            );
    
            return res.json(
              { 
                success: true, 
                token: token 
              }
            );
          }
        );
      } catch (error) {

        console.log(error);
        return res.status(400).json(
          { 
            success: false, 
            message: getErrorMessage(error)
          });
      }
    }
  )(req, res, next);
}

