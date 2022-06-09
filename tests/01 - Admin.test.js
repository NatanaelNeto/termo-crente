require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const server = require('../src/app');
const { BAD_REQUEST, OK } = require('../utils/statusCode');

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests on POST /login route', () => {
  it('Refuses when `nome` field is less than 5 characters', async () => {
    const response = await chai
      .request(server)
      .post('/login')
      .send({ nome: 'test', senha: 'senha_teste123' });

    expect(response).to.be.status(BAD_REQUEST);
    const { body } = response;
    expect(body.message).to.equal('Some fields are invalid');
  });

  it('Refuses when `senha` field is invalid', async () => {
    const response = await chai
      .request(server)
      .post('/login')
      .send({ nome: 'teste', senha: 'senhateste' });

    expect(response).to.be.status(BAD_REQUEST);
    const { body } = response;
    expect(body.message).to.equal('Some fields are invalid');
  });

  it('Returns a valid token when all fields are correct', async () => {
    const response = await chai
      .request(server)
      .post('/login')
      .send({ nome: 'teste', senha: 'senha_teste123' });

    expect(response).to.be.status(OK);
    const { body } = response;
    expect(jwt.verify(body.token, process.env.JWT_SECRET)).not.to.be.undefined;
  });
});
