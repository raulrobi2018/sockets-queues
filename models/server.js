const express = require("express");
const cors = require("cors");
const {socketController} = require("../sockets/controller");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //Aquí estamos levantando el server de socket.io NO el de Express
        this.server = require("http").createServer(this.app);
        //This.io contendrá toda la información de los sockets conectados
        //Se utilizará io para mensajear a todos los clientes conectados
        this.io = require("socket.io")(this.server);

        this.paths = {};

        //Middlewares
        this.middlewares();

        //Applications routes
        this.routes();

        //Socket configurations. Events
        this.sockets();
    }

    //Middlewares: extra functions to run in the server
    middlewares() {
        //CORS
        this.app.use(cors());

        //Public directory
        this.app.use(express.static("public"));
    }

    //Application routes
    routes() {
        //Configuration path for authentication
        //this.app.use(this.paths.authPath, require("../routes/auth"));
    }

    //Sockets
    sockets() {
        this.io.on("connection", socketController);
    }

    listening() {
        this.server.listen(this.port, () => {
            console.log(`Listening port ${this.port}`);
        });
    }
}

module.exports = Server;
