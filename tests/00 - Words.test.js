const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../src/app');
const { OK } = require('../utils/statusCode');

chai.use(chaiHttp);

const { expect } = chai;

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