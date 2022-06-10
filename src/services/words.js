const { CONFLICT } = require('../../utils/statusCode');
const model = require('../models/words');

const getAll = async () => {
  const results = await model.getAll();

  const words = results.map((item) => item.word).sort();

  return {
    lang: "pt-BR",
    words,
  };
};

const insert = async (data) => {
  const unique = data.filter((word, index) => data.indexOf(word) === index);
  const inDB = await model.getAll();
  const duplicata = [];
  unique.forEach((word) => inDB.find((w) => {
    if (word === w) {
      duplicata.push(word);
      unique.splice(unique.indexOf(word), 1);
    }
  }));

  if (unique.length === 0) return {
    error: CONFLICT,
    message: 'Some words werent added',
    words: duplicata,
  }

  const insert = await model.insert(unique);
  return true;
};

module.exports = {
  getAll,
};
