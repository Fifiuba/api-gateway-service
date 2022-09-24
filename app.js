const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();

app.use(bodyParser.json());
app.use(routes.servicesRouter);

app.get('/', function(req,res,next){
    res.send('API gateway');
});

module.exports = {app}