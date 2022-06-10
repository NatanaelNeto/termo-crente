require('dotenv').config();

const services = require('../services/admin');
const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');

const { OK, CREATED } = require('../../utils/statusCode');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const login = rescue(async (req, res) => {
  const { nome, senha } = req.body;
  const data = await services.login(nome, senha);

  if (data.error) return res.status(data.error).json(data);

  const token = jwt.sign({ data }, secret, jwtConfig);

  return res.status(OK).json({ status: OK, token });
});

const addAdmin = rescue(async (req, res) => {
  const { nome, senha } = req.body;
  const data = await services.addAdmin(nome, senha);

  if (data.error) return res.status(data.error).json(data);

  return res.status(CREATED).json(data);
});

module.exports = {
  login,
  addAdmin,
};
