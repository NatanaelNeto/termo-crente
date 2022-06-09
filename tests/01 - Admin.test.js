require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { beforeEach } = require('mocha');
const sinon = require('sinon');

const server = require('../src/app');
const { BAD_REQUEST, OK, UNAUTHORIZED, CONFLICT, CREATED } = require('../utils/statusCode');
const model = require('../src/models/admin');

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

describe('Tests on POST /admin route', () => {
  let token;
  beforeEach(async () => {
    const response = await chai
      .request(server)
      .post('/login')
      .send({ nome: 'teste', senha: 'senha_teste123' });

    const { body } = response;
    token = body.token;
  });

  it('Refuses when `nome` field have more than 20 characters', async () => {
    const response = await chai
      .request(server)
      .post('/admin')
      .set({ authentication: token })
      .send({ nome: 'testedestringcommaisde20characteres', senha: 'teste_senha123' });

    const { body } = response;

    expect(response).to.be.status(BAD_REQUEST);
    expect(body.message).to.equal('Some fields are too long');
  });

  it('Refuses when `senha` field have more than 20 characters', async () => {
    const response = await chai
      .request(server)
      .post('/admin')
      .set({ authentication: token })
      .send({ nome: 'teste', senha: 'testedestringcommaisde20characteres' });

    const { body } = response;

    expect(response).to.be.status(BAD_REQUEST);
    expect(body.message).to.equal('Some fields are too long');
  });

  it(`Refuses when 'senha' field don't have at least 1 number`, async () => {
    const response = await chai
      .request(server)
      .post('/admin')
      .set({ authentication: token })
      .send({ nome: 'teste', senha: 'testesenha' });

    const { body } = response;

    expect(response).to.be.status(BAD_REQUEST);
    expect(body.message).to.equal('Password field must contain letters and numbers');
  });

  it(`Refuses if request don't send the fields 'nome' and/or 'senha'`, async () => {
    let response = await chai
      .request(server)
      .post('/admin')
      .set({ authentication: token })
      .send({ nome: 'teste' });

    let { body } = response;

    expect(response).to.be.status(BAD_REQUEST);
    expect(body.message).to.equal('Some fields are missing');

    response = await chai
      .request(server)
      .post('/admin')
      .set({ authentication: token })
      .send({ senha: 'teste' });

    body = response.body;

    expect(response).to.be.status(BAD_REQUEST);
    expect(body.message).to.equal('Some fields are missing');

    response = await chai
      .request(server)
      .post('/admin')
      .set({ authentication: token })
      .send({});

    body = response.body;

    expect(response).to.be.status(BAD_REQUEST);
    expect(body.message).to.equal('Some fields are missing');

    response = await chai
      .request(server)
      .post('/admin')
      .set({ authentication: token })
      .send({ nome: '', senha: '' });

    body = response.body;

    expect(response).to.be.status(BAD_REQUEST);
    expect(body.message).to.equal('Some fields are missing');
  });

  it('Refuses with an invalid token', async () => {
    const response = await chai
      .request(server)
      .post('/admin')
      .set({ authentication: 'token' })
      .send({ nome: 'teste', senha: 'testesenha' });

    const { body } = response;

    expect(response).to.be.status(UNAUTHORIZED);
    expect(body.message).to.equal('Token must be a valid token');
  });

  it('Refuses if name and password are already registered', async () => {
    const response = await chai
      .request(server)
      .post('/admin')
      .set({ authentication: token })
      .send({ nome: 'teste', senha: 'senha_teste123' });

    const { body } = response;

    expect(response).to.be.status(CONFLICT);
    expect(body.message).to.equal('Admin already registered');
  });

  before(() => sinon.stub(model, 'addAdmin').returns(true));
  after(() => sinon.restore());
  it('Registers properly', async () => {
    const response = await chai
      .request(server)
      .post('/admin')
      .set({ authentication: token })
      .send({ nome: 'novo_admin', senha: 'senha_teste123' });

    expect(response).to.be.status(CREATED);
  });
});
