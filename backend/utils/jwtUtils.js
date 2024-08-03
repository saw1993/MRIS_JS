const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const generateToken = (user) => {
  return jwt.sign({ userId: user.user_id, role: user.role_id }, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { generateToken };