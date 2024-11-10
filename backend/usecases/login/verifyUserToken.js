const { verifyToken } = require('../../utils/jwtUtils');

const verifyUserToken = async (token, userRepository) => {
  const decoded = verifyToken(token);
  const user = await userRepository.getUserById(decoded.id);
  if (!user) {
    throw new Error('User Not Found');
  }

  return user;
};

module.exports = verifyUserToken;