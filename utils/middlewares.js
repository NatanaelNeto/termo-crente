require('dotenv').config();
const jwt = require('jsonwebtoken');
const { BAD_REQUEST, UNAUTHORIZED } = require("./statusCode");

const fieldsValidation = (req, res, next) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) return res.status(BAD_REQUEST).json({
    error: BAD_REQUEST,
    message: 'Some fields are missing',
  });

  next();
};

const tokenValidation = (req, res, next) => {
  const { authentication } = req.headers;
  const data = jwt.verify(authentication, process.env.JWT_SECRET);
  if (!data) return res.status(UNAUTHORIZED).json({
    error: UNAUTHORIZED,
    message: 'Token must be a valid token',
  });

  next();
};

module.exports = {
  fieldsValidation,
  tokenValidation,
};
