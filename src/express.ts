import Express, { Application } from "express";
import { Db } from "mongodb";
import CORS from "cors";

import logger from "./utils/logger";
import connectDB from "./utils/connection"; // function for DB connection.

// Routers for handling different API requests.
import ArticleRouter from "./routes/articles";
import UserRouter from "./routes/users";

// request handler which is passed in to the HTTP Server.
const requestHandler: Application = Express();

// connecting to the database.
let db: Db; // will be passed on to all controller for making queries.
connectDB()
  .then((database: Db) => {
    db = database;
    logger.info("Database connection established.");
  })
  .catch((error) => {
    logger.error("[Express.ts] Database connection failed.\n" + error);
  });

// *****************************
// ******** MIDDLEWARES ********
// *****************************

// Middlewares for processing all APIs.
requestHandler.use(CORS()); // allow cross origin resource sharing.
requestHandler.use(Express.json());

// Middlewares for handling different routes.
requestHandler.use("/articles", ArticleRouter);

// handled by same Router as operations are almost identical.
// there may be some operation that must be isolated for a role, hence, different routes.
requestHandler.use("/reader", UserRouter);
requestHandler.use("/publisher", UserRouter);
requestHandler.use("/admin", UserRouter);

// *****************************
// *****************************

export { db }; // database reference, exposed so that controllers can use it.

// exporting the request handler (to be used by HTTP server).
export default requestHandler;
