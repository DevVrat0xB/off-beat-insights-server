import { db } from "../../express";

import { User } from "../../models/user.model";
import { Article } from "../../models/article.model";
import logger from "../logger";

// for creating a new entry in any given collection.
export const makeNewEntry = async (
  data: User | Article,
  collection: string
): Promise<boolean> => {
  try {
    await db.collection<User | Article>(collection).insertOne(data);
    logger.info("[create_op.ts, makeNewEntry()] INSERT query successfull.");
    return true;
  } catch (error) {
    logger.error(
      "[create_op.ts, makeNewEntry()] INSERT query failed!." + error
    );
    return false;
  }
};
