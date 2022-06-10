const express = require('express');
const bodyParser = require('body-parser');
const words = require('./controllers/words');
const admin = require('./controllers/admin');
const { tokenValidation, fieldsValidation } = require('../utils/middlewares');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();

// ROTAS
app.get('/words', words.getAll);
app.post('/words', tokenValidation);
app.post('/login', admin.login);
app.post('/admin', tokenValidation, fieldsValidation, admin.addAdmin);

app.use(apiRoutes);

module.exports = app;
