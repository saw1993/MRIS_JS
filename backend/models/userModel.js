const pool = require('../config/db');

const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const createUser = async (user) => {
  const {username, email, password, role_id } = user;
  const [result] = await pool.query(
    'INSERT INTO users (username ,email, password, role_id) VALUES (?, ?, ?, ?)',
    [username,email, password, role_id]
  );
  return result.insertId;
};

const updateUser = async (id, user) => {
  const { email, password, role_id } = user;
  await pool.query(
    'UPDATE users SET email = ?, password = ?, role_id = ? WHERE user_id = ?',
    [email, password, role_id, id]
  );
};

const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE user_id = ?', [id]);
};

module.exports = {
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser
};