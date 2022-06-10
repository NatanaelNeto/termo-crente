const rescue = require('express-rescue');
const { CREATED, NO_CONTENT } = require('../../utils/statusCode');
const services = require('../services/words');

const getAll = rescue(async (_req, res) => {
  const words = await services.getAll();
  res.status(200).json(words);
});

const insert = rescue(async (req, res) => {
  const { palavras } = req.body;
  const data = await services.insert(palavras);
  if (data.error) return res.status(data.error).json(data);
  return res.status(CREATED).json(data);
});

const remove = rescue(async (req, res) => {
  const { word } = req.params;
  const data = await services.remove(word);
  if (data.error) return res.status(data.error).json(data);
  return res.status(NO_CONTENT).json(data);
});

module.exports = {
  getAll,
  insert,
  remove,
};
