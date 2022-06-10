const { CONFLICT, NOT_FOUND } = require('../../utils/statusCode');
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
  let inDB = await model.getAll();
  inDB = inDB.map((item) => item.word);
  const duplicata = [];
  unique.forEach((word) => inDB.find((w) => {
    if (word.toUpperCase() === w.toUpperCase()) {
      duplicata.push(word);
      unique.splice(unique.indexOf(word), 1);
    }
  }));

  if (unique.length === 0) return {
    error: CONFLICT,
    message: 'All words are already registered',
    words: duplicata,
  }

  const insert = await model.insert(unique);
  return { palavrasCriadas: unique };
};

const remove = async (word) => {
  const inDB = await model.getAll();
  const id = inDB.find((item) => {
    if (item.word === word) return item.id;
  });

  if (!id) return {
    error: NOT_FOUND,
    message: 'This word doesnt exist on database',
  }

  const removed = await model.remove(id);
  return { palavra: word };
};

module.exports = {
  getAll,
  insert,
  remove,
};
