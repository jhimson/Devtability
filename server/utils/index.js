const jwt = require('jsonwebtoken');


const generateAccessToken = (user) => {
  return jwt.sign({ user }, 'mySecretKey', {
    expiresIn: '30d',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ user }, 'myRefreshSecretKey');
};

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'mySecretKey', (err, user) => {
      if (err) {
        return res.status(403).json('Token is not valid');
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json('You are not authenticated');
  }
};



module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verify,
};
