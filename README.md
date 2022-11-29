## API - Gateway
[![codecov](https://codecov.io/gh/Fifiuba/api-gateway-service/branch/develop/graph/badge.svg?token=LPG5XIVJXL)]([https://codecov.io/gh/Fifiuba/api-gateway-service](https://app.codecov.io/gh/Fifiuba/api-gateway-service/tree/develop))

[![main CI](https://github.com/Fifiuba/api-gateway-service/actions/workflows/main.yml/badge.svg?branch=develop)](https://github.com/Fifiuba/api-gateway-service/actions/workflows/main.yml)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/Fifiuba/api-gateway-service/blob/develop/LICENSE)

# [API URL](https://api-gateway-solfonte.cloud.okteto.net/)

# About the API

This is the API gateway used to route requests to the backend services of [FIFIUBA APP](https://github.com/Fifiuba). It routes to the following services:
* [Users service](https://backend-agustinaa235.cloud.okteto.net/docs)
* [Admin service](https://backend-alejovillores.cloud.okteto.net/docs)
* [Journey service](https://journey-service-solfonte.cloud.okteto.net/docs)
* [Payment service](https://payment-service-solfonte.cloud.okteto.net/)
* [Notification service](https://notifications-service-alejovillores.cloud.okteto.net) 

## Technologies
* Node version 1.0.0
* Docker version 20.10.17
* Docker compose version 2.6.0
* Eslint 1.3.3
* Libraries
    * Axios
    * Express
    * cors
    * jsonwebtoken
    * http-errors
    * dotenv
* External services
    * Okteto
    * codecov

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

```
.
├── .github                     # Github actions
├── coverage                    # Test coverage files
├── routes                  
│   ├── index                   # API router
│   └── registry.json           # Services urls
├── test                        # Automated tests
├── app.js                      # API app configuration
├── server.js                   # API app entry point
├── LICENSE
└── README.md
```

# Testing
## Run tests
To run the test, use the following command
```
npm test
```
To run both the linter and the tests you can se the `build_CI.sh` script
```
sh build_CI.sh
```

## Run the APP
To run the app locally
```
npm run start
```

## Deployment

To deploy the app:  
1. Connect [Okteto](https://www.okteto.com/) to your github account.
2. Go to the project folder
3. Run 
```
npm run deploy`
```
