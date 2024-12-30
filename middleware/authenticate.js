const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  console.log("passa no authenticateJWT");

  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

const authorizeRoles = (...roles) => {

  return (req, res, next) => {
    if (!roles.some((element) => req.user.roles.includes(element))) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};

module.exports = { authenticateJWT, authorizeRoles };