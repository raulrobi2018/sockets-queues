require("dotenv").config();
const Server = require("./models/server");

//Instantiate a new server
const server = new Server();

//Run the server listener
server.listening();
