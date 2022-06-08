const express = require('express');
const bodyParser = require('body-parser');
const words = require('./controllers/words');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();

// ROTAS
app.get('/words', words.getAll);

app.use(apiRoutes);

module.exports = app;
