const model = require('../models/words');

const getAll = async () => {
  const results = await model.getAll();

  const words = results.map((item) => item.word);

  return {
    lang: "pt-BR",
    words,
  };
};

module.exports = {
  getAll,
};
