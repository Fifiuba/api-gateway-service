const express = require('express')
const http_status_code = require('http-status-codes')

const usersServiceRouter = express.Router();

module.exports = {
    usersServiceRouter,
}

/**
 * @swagger
 *
 */

usersServiceRouter.route('/passenger/create')
  .post(async (req, res, next) => {
    console.log('redirecting to: http://localhost:8000'+ req.originalUrl);
    res.redirect(307,'http://localhost:8000'+ req.originalUrl); 
})