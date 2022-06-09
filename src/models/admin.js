const connection = require('./connection');

const addAdmin = async (nome, senha) => {
  const admin = await connection.execute('INSERT INTO admins (`name`, `password`) VALUES (?, ?)', [nome, senha]);
  return true;
};

const getAdmin = async (nome, senha) => {
  const admin = await connection.execute('SELECT * FROM admins WHERE `name` = ? AND `password` = ?', [nome, senha]);
  return admin[0][0];
};

module.exports = {
  addAdmin,
  getAdmin,
};
