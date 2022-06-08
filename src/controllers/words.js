const rescue = require('express-rescue')
const services = require('../services/words');

const getAll = rescue(async (_req, res) => {
  const words = await services.getAll();
  res.status(200).json(words);
});

module.exports = {
  getAll,
};
