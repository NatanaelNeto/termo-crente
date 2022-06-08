const model = require('../models/words');

const getAll = async () => {
  const words = await model.getAll();
  return words;
};

module.exports = {
  getAll,
};
