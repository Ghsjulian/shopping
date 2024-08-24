const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  // const token = req.header('x-auth-token') || req.header('Authorization').replace('Bearer ', '');
  if (!req.session.user) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }
  next()
/*
  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ error: 'Invalid token.' });
  }
  */
};

module.exports = isAuth;