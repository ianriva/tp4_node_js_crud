const path = require("path");
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/configdb");

class Server {
  constructor() {
    //Inicializacion Del Server
    this.app = express();

    
  
    this.port = process.env.PORT;

    //Conectar DB
    this.conectarDB();
    //Middlewares
    this.middlewares();

    //Rutas Del Server
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //ParseJSON
    this.app.use(express.json());
    //Public
  }
  routes() {
   
    this.app.use("/api/empleados", require("../routes/empleados.js"));

    //Index HTML En La Ruta http://localhost:4000
    this.app.use(express.static('src/public'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server On PORT ==> ", this.port);
    });
  }
}

module.exports = Server;
