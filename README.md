## API - Gateway
[![codecov](https://codecov.io/gh/Fifiuba/api-gateway-service/branch/develop/graph/badge.svg?token=LPG5XIVJXL)]([https://codecov.io/gh/Fifiuba/api-gateway-service](https://app.codecov.io/gh/Fifiuba/api-gateway-service/tree/develop))

[![main CI](https://github.com/Fifiuba/api-gateway-service/actions/workflows/main.yml/badge.svg?branch=develop)](https://github.com/Fifiuba/api-gateway-service/actions/workflows/main.yml)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/Fifiuba/api-gateway-service/blob/develop/LICENSE)

# About the API

This API gateway routes to the following services:
* [Users Service](https://backend-agustinaa235.cloud.okteto.net/docs)
* [Admin Service](https://backend-alejovillores.cloud.okteto.net/docs)
* [Journey Service](https://journey-service-solfonte.cloud.okteto.net/docs)

## Technologies
* Node version 1.0.0
* Docker version 20.10.17
* Docker compose version 2.6.0
* Libraries
    * Axios
    * Express
    * cors
    * jsonwebtoken
    * http-errors
    * dotenv
* External services
    * Okteto

## Developers
|Name                | email                |
|--------------------|----------------------|
| Maria Sol Fontenla | msfontenla@fi.uba.ar |


# Development 

## Development Environment

Instructions to get the service running in a docker container

* First install [docker](https://docs.docker.com/engine/install/) and [docker compose](https://docs.docker.com/compose/install/other/).

* You will need to add a `.env` file, which will contain the secret key with which the jwt token is verified. 

* Then, to build and run the service run the following commands
    ```
    docker compose build
    docker compose up
    ```

    This will start the app's container. After stopping the execution, you must run
    ```
    docker compose down -v
    ```
## Project Structure 



# Testing
## Run tests
To run the test, use the following command
```
npm test
```

## Run the APP
To run the APP locally
```
npm start
```

## Deployment
