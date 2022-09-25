sudo docker run --rm -d -it --name api-gateway -p 8001:8080 api-gateway
sudo docker network connect users-service_default api-gateway # no se ejecuta la linea anterior no devuelve el prompt
