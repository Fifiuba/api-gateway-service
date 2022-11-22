const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.json');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes.servicesRouter);

app.get('/', function(req, res, next) {
  res.send('API gateway');
});

module.exports = {app};
