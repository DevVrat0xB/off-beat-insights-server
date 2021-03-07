import { Db, MongoClient } from "mongodb";
import logger from "./logger";

class DBConnection {
  // (MongoDB) client information.
  private static activeClient: MongoClient;

  // fetches the database in use.
  static getActiveDB(): Db {
    const dbCopy: Db = DBConnection.activeClient.db();
    return dbCopy;
  }

  // Establishing the connection at the time of instantiation.
  constructor(
    private cluster: string,
    private username: string,
    private password: string,
    private database: string
  ) {
    // formatting the URL for MongoDB cluster/database.
    let url: string;
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "cloud"
    ) {
      url = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;
    } else {
      url = `mongodb://${process.env.DB_CLUSTER}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
      logger.debug(
        `mongodb://${process.env.DB_CLUSTER}:${process.env.DB_PORT}/${process.env.DB_NAME}`
      );
    }

    // Instantiating the client.
    const client = new MongoClient(url, {
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
        DBConnection.activeClient = result;
      })
      .catch((error) => {
        logger.error(
          "[connection.ts, constructor] MongoDB Connection failed.\n" + error
        );
      });
  }
}

export default DBConnection;
