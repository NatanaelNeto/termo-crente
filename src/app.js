const fs = require('fs');
const { marked } = require('marked');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const words = require('./controllers/words');
const admin = require('./controllers/admin');
const { tokenValidation, fieldsValidation, wordSizeValidation } = require('../utils/middlewares');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const apiRoutes = express.Router();

// ROTAS
app.get('/', async(_req, res) => {
  return res.status(301).redirect('https://github.com/NatanaelNeto/termo-crente-backend');
});
app.get('/words', words.getAll);
app.post('/words', tokenValidation, wordSizeValidation, words.insert);
app.delete('/words/:word', tokenValidation, words.remove);
app.post('/login', admin.login);
app.post('/admin', tokenValidation, fieldsValidation, admin.addAdmin);

app.use(apiRoutes);

module.exports = app;
