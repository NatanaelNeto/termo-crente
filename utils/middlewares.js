require('dotenv').config();
const jwt = require('jsonwebtoken');
const { BAD_REQUEST, UNAUTHORIZED } = require("./statusCode");

const fieldsValidation = async (req, res, next) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) return res.status(BAD_REQUEST).json({
    error: BAD_REQUEST,
    message: 'Some fields are missing',
  });

  next();
};

const tokenValidation = async (req, res, next) => {
  const { authentication } = req.headers;

  try {
    const data = jwt.verify(authentication, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(UNAUTHORIZED).json({
      error: UNAUTHORIZED,
      message: 'Token must be a valid token',
    });
  }

};

module.exports = {
  fieldsValidation,
  tokenValidation,
};
