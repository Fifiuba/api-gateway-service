const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(routes.servicesRouter);

app.get('/', function(req,res,next){
    res.send('API gateway');
});

app.listen(PORT, () => {
    console.log(`Gateway listening on port ${PORT}`)
});