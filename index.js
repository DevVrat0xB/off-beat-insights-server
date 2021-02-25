require("dotenv").config(); // loading environment variables.

const http = require("http");

// instantiating Node server.
const HTTPServer = http.createServer((request, response) => {
  console.log("Node Server is up and running...");
  response.end();
});

// port number on which server is running.
const port =
  process.env.NODE_ENV === "production"
    ? process.env.CLOUD_PORT
    : process.env.LOCAL_PORT;
HTTPServer.listen(port);
