const express = require('express')

const usersServiceRouter = express.Router();

module.exports = {
    usersServiceRouter,
}

usersServiceRouter.route('/passengers/create')
  .get(function (req, res, next) {
    res.redirect('/') 
})