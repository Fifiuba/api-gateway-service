const express = require('express')
const axios = require('axios')
const registry = require('./registry.json')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
require('dotenv').config()

let axiosInstance = axios.create()

const servicesRouter = express.Router();

module.exports = {servicesRouter, axiosInstance, redirectToService}

async function authenticateToken (req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  try {
    jwt.verify(token,secretOrPublicKey="misupercontrasecreta")
    next()
  }catch (err){
    res.send(createError(401, 'Expired token'))//TODO: estandarizar
  }
}

async function redirectToService(req,res){
  var url = registry.services[req.params.apiName].url + req.originalUrl;
  console.log(url)
  try {
    const response = await axiosInstance({
      method: req.method,
      url: url,
      data: req.body
    });
    res.send(response.data)

  }catch (err){
    console.log(err)
    res.send(err.code)
  }
}

function processRequest(req, res){
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()

  }else{
    redirectToService(req, res)

  }
}


servicesRouter.all("/:apiName/:path?\/((?!(login)\w+))", authenticateToken, processRequest);

servicesRouter.all('/:apiName/login', processRequest);