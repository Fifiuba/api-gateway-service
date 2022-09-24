const express = require('express')
const status = require('http-status')
const axios = require('axios')
const registry = require('./registry.json')
const jwt = require('jsonwebtoken')
require('dotenv').config()

/*TODO: ver si tendria que hacer un axios.create()
        arreglar el docker para que conecte con otras networks
        tests
        login ver si funciona bien
*/
const MockAdapter = require("axios-mock-adapter");
let axiosInstance = axios.create()
console.log('is ' + process.env.TEST_ENV == 'true')
if (process.env.TEST_ENV == 'true'){
  axiosInstance = new MockAdapter(axios)
  console.log('entered')
}

const servicesRouter = express.Router();

module.exports = {servicesRouter, axiosInstance}

async function authenticateToken (req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  try {
    jwt.verify(token,secretOrPublicKey="misupercontrasecreta")
    next()
  }catch (err){
    res.send({"status": 403, "detail": "expired token"})//TODO: estandarizar
  }
}

async function redirectToService(req,res){
  var url = registry.services[req.params.apiName].url + req.params.apiName + (req.params.path? '/' + req.params.path : '');
  console.log(url)
  try {
    const response = await axiosInstance({
      method: req.method,
      url: url,
      data: req.body
    });
    res.send(response.data)

  }catch (err){
    res.send(err.code)
  }
}

servicesRouter.all("/:apiName/:path?", authenticateToken, (req, res) => {
  print('aca entra')
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()

  }else{
    redirectToService(req, res)

  }
});

