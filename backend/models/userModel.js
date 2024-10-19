const { createMainDBConnection } = require('../config/db');

const getUserById = async (userId) => {
  const connection = await createMainDBConnection();
  const [rows] = await connection.execute('SELECT * FROM users WHERE user_id = ?', [userId]);
  connection.end();
  return rows[0];
};


const findUserByEmail = async (email) => {
  const connection = await createMainDBConnection();
  const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const findUserByID = async (id) => {
  const connection = await createMainDBConnection();
  const [rows] = await connection.query('SELECT * FROM users WHERE user_id = ?', [id]);
  return rows[0];
};

const createUser = async (user) => {
  const connection = await createMainDBConnection();
  const {username, email, password, role_id } = user;
  const [result] = await connection.query(
    'INSERT INTO users (username ,email, password, role_id) VALUES (?, ?, ?, ?)',
    [username,email, password, role_id]
  );
  return result.insertId;
};

const updateUser = async (id, user) => {
  const connection = await createMainDBConnection();
  const { email, password, role_id } = user;
  await connection.query(
    'UPDATE users SET email = ?, password = ?, role_id = ? WHERE user_id = ?',
    [email, password, role_id, id]
  );
};

const deleteUser = async (id) => {
  const connection = await createMainDBConnection();
  await connection.query('DELETE FROM users WHERE user_id = ?', [id]);
};

module.exports = {
  getUserById,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  findUserByID
};