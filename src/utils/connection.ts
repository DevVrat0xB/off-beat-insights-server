import { Db, MongoClient } from "mongodb";
import loadEnvironment from "./configuration";
import logger from "./logger";

class DBConnection {
  // connected database reference.
  // can be used for making queries in request handler or controllers.
  private static activeDB: Db;

  // return a copy of the connected database reference.
  static getActiveDB(): Db {
    const dbCopy: Db = DBConnection.activeDB;
    return dbCopy;
  }

  // Establishing the connection at the time of instantiation.
  constructor() {
    loadEnvironment();
    // formatting the URL for MongoDB cluster/database.
    const cloud_url: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    const local_url: string = `mongodb://${process.env.DB_CLUSTER}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    // connecting to the desired DB server.
    let activeURL: string;
    activeURL =
      process.env.NODE_ENV === "production" || process.env.NODE_ENV === "cloud"
        ? cloud_url
        : local_url;

    // Instantiating the client.
    const client = new MongoClient(activeURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // establishing the connection to the database.
    client
      .connect()
      .then((result: MongoClient) => {
        logger.info("MongoDB Connection established.");

        // Mongo creates a DB if not already exists.
        // Hence 'result.db' will never be undefined.
        DBConnection.activeDB = result.db();
      })
      .catch((error) => {
        logger.error(
          "[connection.ts, constructor] MongoDB Connection failed.\n" + error
        );
      });
  }
}

export default DBConnection;
