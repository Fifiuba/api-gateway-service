const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const path = require('path')

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition : {
        openapi: "3.0.0",
        info: {
            title: "API-Gateway",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:8001"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],  
};


const app = express()


var PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerSpec)));
app.use("/users",routes.usersServiceRouter);

app.listen(PORT, () => {
    console.log(`Gateway listening on port ${PORT}`)
})