const express = require('express')
const status = require('http-status')
const axios = require('axios')
const registry = require('./registry.json')

const servicesRouter = express.Router();

module.exports = {
    servicesRouter,
}
/*
Autenticacion
app.all('*',requireAuthentication,callback_que_siga_parseando)

TODO: ver de donde se puede recibir la ruta a cada servicio. Por ahora sale del json registry
PUEDE que falten los headers en el json que se le pasa a axios.
*/


function redirectToService(req,res){
  var url = registry.services[req.params.apiName].url + req.params.apiName + (req.params.path? req.params.path : '');
  console.log(url)
  axios({
      method: req.method,
      url: url,
      data: req.body
  }).then( (response) => {
    res.send(response.data);
  });
}


servicesRouter.all("/:apiName/:path?",(req, res) => {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()
  }else{
    redirectToService(req,res);
  }
});

