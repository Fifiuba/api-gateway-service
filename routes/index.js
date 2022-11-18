const express = require('express');
const axios = require('axios');
const registry = require('./registry.json');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
require('dotenv').config();

const servicesRouter = express.Router();

module.exports = {servicesRouter};

async function authenticateToken(req, res, next) {
  if (req.params.path === 'login') {
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  try {
    jwt.verify(token, secretOrPublicKey=process.env.SECRET_ACCESS_TOKEN);
    return next();
  } catch (err) {
    res.send(createError(401, 'Expired token'));
  }
}

function concatenateQueryParameters(queryParams){
  if (JSON.stringify(queryParams) === JSON.stringify({})){
    return "";
  }
  let url = "?";
  for (param in queryParams){
    url += param + "=" + queryParams[param];
  }
  return url;
}

async function redirectToService(req, res) {
  let url = registry.services[req.params.apiName].url + (req.path? req.path : "")
  url = url + concatenateQueryParameters(req.query)

  try {
    let headers = req.headers == undefined? req.headers : {}
    const response = await axios({
      method: req.method,
      url: url,
      headers: headers,
      data: req.body,
    });

    res.send(response.data);
  } catch (error) {
    console.log(error)
    const response = {
      data: error.response.data,
      status: error.response.status
    }
    res.send(response);
  }
}

function processRequest(req, res) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end();
  } else {
    redirectToService(req, res);
  }
}

servicesRouter.all('/:apiName*', /*authenticateToken, */processRequest);
