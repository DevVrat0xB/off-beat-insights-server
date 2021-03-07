import HTTP from "http";
import ExpressRequestHandler from "./src/express";
import loadEnvironment from "./src/utils/configuration";
import logger from "./src/utils/logger";

// instantiating Node server.
const HTTPServer: HTTP.Server = HTTP.createServer(ExpressRequestHandler);

// loading environment variables.
loadEnvironment();

// port number on which server is running.
HTTPServer.listen({ port: process.env.LOCAL_PORT });
logger.info("Server running at port: " + process.env.PORT);
