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

function setAxiosConfig(request){
  let url = registry.services[request.params.apiName].url + (request.path? request.path : "")
  url = url + concatenateQueryParameters(request.query)
  
  let config = {
      method: request.method,
      url: url,
      data: request.body
  }

  if (request.headers.authorization != undefined){
    console.log("authorization " + request.headers.authorization)
    axios.defaults.headers.common['Authorization'] = request.headers.authorization
    return config
  }
  axios.defaults.headers.common['Authorization'] = ""
  return config
}

async function redirectToService(req, res) {
  if (registry.services[req.params.apiName] == undefined){
    const response = {
      data: "Cannot access the requested url",
      status: 400
    }
    res.send(response)
    return
  }
  
  try {
    const config = setAxiosConfig(req)
    console.log(config)
    const response = await axios(config);
    res.send(response.data);
    return
  } catch (error) {
    console.log(error)
    var responseData = error.response == undefined? "" : error.response.data; 
    var responseStatus = error.response == undefined? "" : error.response.status; 

    const response = {
      data: responseData,
      status: responseStatus
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

async function listServices(req, res){

  let servicesList = {}
  for (apiName in registry.services){
      try {
      console.log(apiName)
      let response = await axios({
        method: 'get',
        url: registry.services[apiName].url ,
      })
      servicesList[apiName] = response.data
    }catch(error){
      console.log(error)
      var responseData = error.response == undefined? "" : error.response.data; 
      var responseStatus = error.response == undefined? "" : error.response.status; 
  
      const response = {
        data: responseData,
        status: responseStatus
      }
      servicesList[apiName] = response
    }
  }
    
    res.send(servicesList)


}

servicesRouter.get('/services', listServices);
servicesRouter.all('/:apiName*', /*authenticateToken, */processRequest);

