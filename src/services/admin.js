const { BAD_REQUEST, NOT_FOUND, CONFLICT } = require('../../utils/statusCode');
const model = require('../models/admin');

const passwordRegEx = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/

const login = async (nome, senha) => {
  if (nome.length < 5) return {
    error: BAD_REQUEST,
    message: 'Some fields are invalid',
  }

  if (!passwordRegEx.test(senha)) return {
    error: BAD_REQUEST,
    message: 'Some fields are invalid',
  }


  const result = await model.getAdmin(nome, senha);
  if (!result) return {
    error: NOT_FOUND,
    message: 'Account not found on database',
  };

  const { id, name } = result;

  return { id, name };
};

const addAdmin = async (nome, senha) => {
  if (nome.length > 20 || senha.length > 20) return {
    error: BAD_REQUEST,
    message: 'Some fields are too long',
  }

  if (!passwordRegEx.test(senha)) return {
    error: BAD_REQUEST,
    message: 'Password field must contain letters and numbers',
  }

  const admin = await model.getAdmin(nome, senha);
  if (admin) return {
    error: CONFLICT,
    message: 'Admin already registered',
  }

  const newAdmin = await model.addAdmin(nome, senha);
  return { nome, senha };
};

module.exports = {
  login,
  addAdmin,
};