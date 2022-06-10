const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../src/app');
const model = require('../src/models/words');
const { OK, UNAUTHORIZED, BAD_REQUEST, CREATED, CONFLICT, NOT_FOUND, NO_CONTENT } = require('../utils/statusCode');

chai.use(chaiHttp);

const { expect } = chai;

describe('TESTS ON words TABLE', () => {

  describe('Tests on GET /words route', () => {
    it('Exists', async () => {
      const response = await chai.request(server).get('/words');
      
      expect(response).to.have.status(OK);
    });
    it('Returns an array', async () => {
      const { body } = await chai.request(server).get('/words');
      
      const { words } = body;

      expect(words).to.be.a('array');
    });
  });

  describe('Tests on POST /words route', () => {
    let token;
    beforeEach(async () => {
      const response = await chai
      .request(server)
      .post('/login')
      .send({ nome: 'teste', senha: 'senha_teste123' });
      
      const { body } = response;
      token = body.token;
    });
    
    it('Refuses with an invalid token', async () => {
      const response = await chai
      .request(server)
      .post('/words')
      .set({ authentication: 'token' })
      .send({ palavras: ['teste'] });
      
      const { body } = response;
      
      expect(response).to.be.status(UNAUTHORIZED);
      expect(body.message).to.equal('Token must be a valid token');
    });
    
    it('Refuses if word dont have 5 letters', async () => {
      let response = await chai
      .request(server)
      .post('/words')
      .set({ authentication: token })
      .send({ palavras: ['palavra'] });
      
      let { body } = response;
      expect(response).to.be.status(BAD_REQUEST);
      expect(body.message).to.equal('Some words werent added');
      expect(body.words).to.contain('palavra');
      
      response = await chai
      .request(server)
      .post('/words')
      .set({ authentication: token })
      .send({ palavras: ['ser'] });
      
      body = response.body;
      expect(response).to.be.status(BAD_REQUEST);
      expect(body.message).to.equal('Some words werent added');
      expect(body.words).to.contain('ser');
    });
    
    it('Refuses if word are already registered', async () => {
      const response = await chai
      .request(server)
      .post('/words')
      .set({ authentication: token })
      .send({ palavras: ['livro'] });
      
      const { body } = response;
      expect(response).to.be.status(CONFLICT);
      expect(body.message).to.equal('All words are already registered');
      expect(body.words).to.contain('livro');
    });
    
    before(() => sinon.stub(model, 'insert').returns(true));
    after(() => sinon.restore());
    it('Registers properly', async () => {
      const response = await chai
      .request(server)
      .post('/words')
      .set({ authentication: token })
      .send({ palavras: ['Canaã'] });
      
      const { body } = response;
      expect(response).to.be.status(CREATED);
    });
  });

  describe('Tests on DELETE /words route', () => {
    let token;
    beforeEach(async () => {
      const response = await chai
        .request(server)
        .post('/login')
        .send({ nome: 'teste', senha: 'senha_teste123' });
      
      const { body } = response;
      token = body.token;
    });

    it('Refuses with an invalid token', async () => {
      const response = await chai
        .request(server)
        .delete('/words/teste')
        .set({ authentication: 'token' });
      
      const { body } = response;
      
      expect(response).to.be.status(UNAUTHORIZED);
      expect(body.message).to.equal('Token must be a valid token');
    });

    it('Refuses when word doesnt exist on database', async () => {
      const response = await chai
        .request(server)
        .delete('/words/aaaaa')
        .set({ authentication: token });
      
      const { body } = response;

      expect(response).to.status(NOT_FOUND);
      expect(body.message).to.equal('This word doesnt exist on database');
    });

    before(() => sinon.stub(model, 'remove').returns(true));
    after(() => sinon.restore());
    it('Removes properly', async () => {
      const response = await chai
        .request(server)
        .delete('/words/livro')
        .set({ authentication: token });
      
      const { body } = response;

      expect(response).to.status(NO_CONTENT);
    });
  });
});