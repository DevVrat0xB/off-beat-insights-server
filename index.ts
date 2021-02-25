import HTTP from "http";
import { getEnvironmentVariables } from "./src/utils/configurations";

// instantiating Node server.
const HTTPServer: HTTP.Server = HTTP.createServer(() => {
  console.log("Server Running");
});

// loading environment variables.
const server = getEnvironmentVariables();

// port number on which server is running.
HTTPServer.listen({ port: server.port });
