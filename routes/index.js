const express = require('express')
const status = require('http-status')

const usersServiceRouter = express.Router();
const adminServicesRouter = express.Router();
const journeyServicesRouter = express.Router();

const USER_URL = 'http://localhost:8000';
const ADMIN_URL = 'http://localhost:8002';
const JOURNEY_URL = 'http://localhost:9000';

module.exports = {
    usersServiceRouter,
    adminServicesRouter,
    journeyServicesRouter,
}

//TODO: ver de donde se puede recibir la ruta a cada servicio
function redirectToService(url,req,res){
  res.redirect(status.PERMANENT_REDIRECT,url + req.originalUrl);
}

usersServiceRouter.route('/passenger/create')
  .post(async (req, res, next) => {
    redirectToService(USER_URL,req,res)
});

usersServiceRouter.route('/passenger/add_address')
  .patch(async (req, res, next) => {
    redirectToService(USER_URL,req,res);
});

usersServiceRouter.route('/driver/create')
  .post(async (req, res, next) => {
    redirectToService(USER_URL,req,res);
});

usersServiceRouter.route('/driver/add_car_info')
  .patch(async (req, res, next) => {
    redirectToService(USER_URL,req,res);
});


usersServiceRouter.route('/getUsers')
  .get(async (req, res, next) => {
    redirectToService(USER_URL,req,res);
});

usersServiceRouter.route('/login')
  .get(async (req, res, next) => {
    redirectToService(USER_URL,req,res);
});

adminServiceRouter.route('/')
  .get(async (req, res, next) => {
    redirectToService(ADMIN_URL,req,res);
});

adminServiceRouter.route('/new')
  .post(async (req, res, next) => {
    redirectToService(ADMIN_URL,req,res);
});

journeyServicesRouter.route('/')
.post(async (req, res, next) => {
  redirectToService(JOURNEY_URL,req,res);
});