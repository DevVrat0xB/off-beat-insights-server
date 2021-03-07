import Express, { Application } from "express";
import bodyParser from "body-parser";
import CORS from "cors";

import DBConnection from "./utils/connection"; // class for DB connection.

// Routers for handling different API requests.

// request handler which is passed in to the HTTP Server.
const requestHandler: Application = Express();

// connecting to the database.
new DBConnection();

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
