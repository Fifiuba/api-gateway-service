const express = require('express')
const status = require('http-status')

const usersServiceRouter = express.Router();

module.exports = {
    usersServiceRouter,
}

//TODO: ver de donde se puede recibir la ruta a cada servicio
function redirectToUserService(req,res){
  res.redirect(status.PERMANENT_REDIRECT,'http://localhost:8000'+ req.originalUrl);
}

usersServiceRouter.route('/passenger/create')
  .post(async (req, res, next) => {
    redirectToUserService(req,res)
});

usersServiceRouter.route('/passenger/add_address')
  .patch(async (req, res, next) => {
    redirectToUserService(req,res);
});

usersServiceRouter.route('/driver/create')
  .post(async (req, res, next) => {
    redirectToUserService(req,res);
});

usersServiceRouter.route('/driver/add_car_info')
  .patch(async (req, res, next) => {
    redirectToUserService(req,res);
});


usersServiceRouter.route('/getUsers')
  .get(async (req, res, next) => {
    redirectToUserService(req,res);
  });

  usersServiceRouter.route('/login')
  .get(async (req, res, next) => {
    redirectToUserService(req,res);
  });
