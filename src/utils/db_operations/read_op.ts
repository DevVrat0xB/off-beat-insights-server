import { db } from "../../express";
import MongoDB from "mongodb";

import logger from "../../utils/logger";
import { User } from "../../models/user.model";
import { Article } from "../../models/article.model";
import { generateProjectionArgFrom } from "./helper";

// for fetching a single entry from any given collection.
export const fetchAnEntry = async (
  id: string,
  collection: string,
  fields: Array<string>
): Promise<any> => {
  // converting ID from string to MongoDB Object ID.
  const record_id: MongoDB.ObjectId = new MongoDB.ObjectId(id);

  // preparing projection argument.
  const fieldsToShow = generateProjectionArgFrom(fields);

  try {
    const record = await db
      .collection(collection)
      .findOne({ _id: record_id }, { projection: fieldsToShow });
    logger.info("[read_op.ts, fetchAnEntry()] READ query successfull.");
    return record;
  } catch (error) {
    logger.error("[read_op.ts, fetchAnEntry()] READ query failed.\n" + error);
    return undefined;
  }
};

// for fetching multiples entries from any given collection.
// the filter will be based on some fields of either of the model only.
// This wrapper function is NOT meant for searching a record by its ID.
export const fetchEntries = async (
  filter: Partial<User | Article>,
  collection: string,
  fields: Array<string>
): Promise<Array<any> | undefined> => {
  // preparing projection argument.
  const fieldsToShow = generateProjectionArgFrom(fields);

  try {
    const records = await db
      .collection<User | Article>(collection)
      .find(filter)
      .project(fieldsToShow)
      .toArray();
    logger.info("[read_op.ts, fetchEntries()] READ query successfull.");
    return records;
  } catch (error) {
    logger.error("[read_op.ts, fetchEntries()] READ query failed.\n" + error);
    return undefined;
  }
};
