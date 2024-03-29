## API - Gateway
[![GitHub issues](https://img.shields.io/github/issues/Fifiuba/api-gateway-service)](https://github.com/Fifiuba/api-gateway-service/issues)
[![GitHub license](https://img.shields.io/github/license/Fifiuba/api-gateway-service)](https://github.com/Fifiuba/api-gateway-service/blob/main/LICENSE)


## Docker commands

To build the container:  

```
$ sh build_gateway.sh
```

To run the image:  

```
$ sh start_gateway.sh
```

Then the app can be accessed from https://localhost:8001  

To stop the container first check the container id (from a new terminal):  
 
```
$ sudo docker ps
```

Then to stop it enter (on the same console):  

```
$ sudo docker stop <image-id>
```