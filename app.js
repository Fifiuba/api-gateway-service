const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(routes.servicesRouter);

app.get('/', function(req, res, next) {
  res.send('API gateway');
});

module.exports = {app};
