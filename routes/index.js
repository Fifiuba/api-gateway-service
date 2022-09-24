require('dotenv').config

const express = require('express')
const status = require('http-status')
const axios = require('axios')
const registry = require('./registry.json')
const jwt = require('jsonwebtoken')


const servicesRouter = express.Router();

module.exports = {servicesRouter}


/*
TODO: ver de donde se puede recibir la ruta a cada servicio. Por ahora sale del json registry
PUEDE que falten los headers en el json que se le pasa a axios.
*/


function authenticateToken (req,res,next){
  console.log(jwt.sign({"id":1}, "misupercontrasecreta"))
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] //if header is undefined, token will be undefined
  console.log('the token is: ' + token)

  if (token == null) return res.sendStatus(401)

  try {
    const decoded = jwt.verify(token,"misupercontrasecreta")
  }catch (err){
    console.log('the error is: ' + err)
    return res.sendStatus(403)
  }
  console.log('This time there was no error')
  next()
  
}

servicesRouter.all("/:apiName/:path?", authenticateToken, (req, res) => {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()

  }else{
    const redirectToService = async (req,res) => {
      var url = registry.services[req.params.apiName].url + req.params.apiName + (req.params.path? '/' + req.params.path : '');
      console.log(url)
      try {
        const response = await axios({
          method: req.method,
          url: url,
          data: req.body
        });
        res.send(response.data);

      }catch (err){
        res.send(err.code);
      }
    }
    redirectToService(req, res);
  }
});

