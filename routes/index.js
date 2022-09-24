const express = require('express')
const status = require('http-status')
const axios = require('axios')
const registry = require('./registry.json')
const jwt = require('jsonwebtoken')

const servicesRouter = express.Router();

module.exports = {servicesRouter}

async function authenticateToken (req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  try {
    jwt.verify(token,secretOrPublicKey="misupercontrasecreta")
    next()
  }catch (err){
    const decoded = jwt.decode(token,secretOrPublicKey="misupercontrasecreta")
    let login_url = registry.services['admins'] + '/admins/login'
    if (decoded.user == true) login_url = registry.services['users'] + '/admins/login'
    const response = await axios.get(login_url)
    res.send(response.data)
  }
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

