var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
  mongoose.set('debug', true);
// mongoose instance connection url connection
mongoose.Promise = global.Promise;

var auth = process.env.MONGODB_LOGIN && process.env.MONGODB_PWD ? process.env.MONGODB_LOGIN + ":" + process.env.MONGODB_PWD + "@" : "";
var dbName = process.env.MONGODB_DATABASE ? "/" + process.env.MONGODB_DATABASE : "";
var cnx = "mongodb://" + auth + process.env.MONGODB_HOST + ":" + process.env.MONGODB_PORT + dbName
console.log("Connexion URI = " + cnx);

mongoose.connect(cnx).then(
  () =>{console.log("Connected successfully")},
  err =>{process.exit(1)}
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);