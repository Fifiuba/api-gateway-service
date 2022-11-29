const express = require('express');
const axios = require('axios');
const registry = require('./registry.json');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
require('dotenv').config();

const servicesRouter = express.Router();

module.exports = {servicesRouter};

function setAxiosConfig(request){
  let url = registry.services[request.params.apiName].url + (request.path? request.path : "")
  
  let config = {
      method: request.method,
      url: url,
      data: request.body,
  }
  
  if (request.query != undefined && JSON.stringify(request.query) !== JSON.stringify({}) ){
    config['params'] = request.query
  }

  if (request.headers.authorization != undefined){
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
    const response = await axios(config);
    res.send(response.data);
    return
  } catch (error) {
    console.log(error)
    var responseData = error.response == undefined? "" : error.response.statusText; 
    var responseStatus = error.response == undefined? "" : error.response.status; 

    const response = {
      data: responseData,
      status: responseStatus
    }
    res.sendStatus(response);
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
        status: Number(responseStatus)
      }
      servicesList[apiName] = response
    }
  }
    res.send(servicesList)
}

servicesRouter.get('/services', listServices);
servicesRouter.all('/:apiName*', processRequest);

