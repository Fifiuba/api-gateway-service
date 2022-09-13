const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')


const app = express()


var PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use("/users",routes.usersServiceRouter);
app.listen(PORT, () => {
    console.log(`Gateway listening on port ${PORT}`)
})