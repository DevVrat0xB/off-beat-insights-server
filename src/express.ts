import Express, { Application } from "express";
import bodyParser from "body-parser";
import CORS from "cors";

import loadEnvironment from "./utils/configuration";
import DBConnection from "./utils/connection"; // class for DB connection.

// Routers for handling different API requests.

// request handler which is passed in to the HTTP Server.
const requestHandler: Application = Express();

loadEnvironment(); // loading environment variable file.

// connecting to the database.
new DBConnection(
  String(process.env.DB_CLUSTER),
  String(process.env.DB_USER),
  String(process.env.DB_PASSWORD),
  String(process.env.DB_NAME)
);

// *****************************
// ******** MIDDLEWARES ********
// *****************************

// Middlewares for processing all APIs.
requestHandler.use(CORS()); // allow cross origin resource sharing.
requestHandler.use(bodyParser.urlencoded({ extended: false })); // parse body having JSON format.

// Middlewares for handling different routes.

// *****************************
// *****************************

// exporting the request handler (to be used by HTTP server).
export default requestHandler;
