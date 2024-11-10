const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwtUtils');
const getUserByEmail = require('../../usecases/user/getUserByEmail');

const loginUser = async (email, password, userRepository) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new Error('User Not Found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid Password');
  }

  const token = generateToken(user);
  return { user, token };
};

module.exports = loginUser;