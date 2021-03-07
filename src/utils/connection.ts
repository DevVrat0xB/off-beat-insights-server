import { Db, MongoClient } from "mongodb";

import loadEnvironment from "./configuration";

async function connectDB(): Promise<Db> {
  loadEnvironment(); // loading the environment to load appropriate vars.

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
  const connection: Db = (await client.connect()).db();
  return connection;
}

export default connectDB;
