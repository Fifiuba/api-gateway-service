## API - Gateway
[![codecov](https://codecov.io/gh/Fifiuba/api-gateway-service/branch/develop/graph/badge.svg?token=LPG5XIVJXL)]([https://codecov.io/gh/Fifiuba/api-gateway-service](https://app.codecov.io/gh/Fifiuba/api-gateway-service/tree/develop))

[![main CI](https://github.com/Fifiuba/api-gateway-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/Fifiuba/api-gateway-service/actions/workflows/node.js.yml)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Fifiuba/api-gateway-service/blob/develop/LICENSE)

# About the API



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

# Development Environment
* First install [docker](https://docs.docker.com/engine/install/) and [docker compose](https://docs.docker.com/compose/install/other/).

* Then, to build and run the service run the following commands
    ```
    docker compose build
    docker compose up
    ```

    This will start the app container. After stoppingthe execution, you must run
    ```
    docker compose down -v
    ```

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
