#  From Docker command to Kubernetes
This is a simple Node REST API connected to MongoDB, exposing 2 end points :  
`curl http://host:port/tasks`  
`curl -X POST -d '{"name":"Go to dentist"}' -H "Content-Type: application/json" http://192.168.99.100:3001/tasks`

## Step 1 - Docker CLI
- Use an existing MongoDB images such as bitnami/mongodb:3.7.1-r0
- Build API image from source code

List your locale image :
```
docker images
```
From your root apps, build your image :
```
docker build -t usecase01-node-api .
```
Get MongoDB images
```
docker pull bitnami/mongodb:3.7.1-r0
```
In order to be connected, containers had to be deployed in a network. List your local networks and create a dedicated network :
```
docker network ls
docker network create usecase01-default
```
Good ! Let's run them ! 

### MongoDB 
First we initiate a running container based on bitnami/mongodb:3.7.1-r0 (without credentials access to simplify)
```
docker run --network=usecase01-default -itd --name=usecase01-mongodb -e MONGODB_USERNAME=user-dev -e MONGODB_PASSWORD=Admin6 -e MONGODB_DATABASE=usecase01-db bitnami/mongodb:3.7.1-r0
```

Note that if you specify a name, you can use it when referencing the container within a Docker network. The default port 27017 can't be reached from your `docker-machine ip`

Control your running container :
```
docker container ls -a
docker network inspect usecase01-default
```
### Connect your API to Mongo
We don't want to hardcode connexion ! Generally we use configuration file with valuation system per environments. This is possible if we can fix the fqdn, uri of our datasources. In this example we prefer use an environment variable to pass mongodb dns to the API.

See Dockerfile

