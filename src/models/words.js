const connection = require('./connection');

const getAll = async () => {
  const results = await connection.execute(
    'SELECT * FROM words',
  );
  return results[0];
};

const insert = async(data) => {
  const values = data.map((word) => [word]);
  const results = await connection.execute(
    'INSERT INTO words (word) VALUES ?',
    values,
  );
  return true;
}

module.exports = {
  getAll,
  insert,
};
