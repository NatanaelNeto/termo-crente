const connection = require('./connection');

const getAll = async () => {
  const results = await connection.execute(
    'SELECT * FROM words',
  );
  return results;
};

module.exports = {
  getAll,
};
