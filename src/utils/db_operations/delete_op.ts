import { db } from "../../express";
import MongoDB from "mongodb";

import logger from "../logger";

// for deleting an existing entry in any given collection.
export const deleteAnEntry = async (
  id: string,
  collection: string
): Promise<boolean> => {
  // converting ID from string to MongoDB Object ID.
  const record_id: MongoDB.ObjectId = new MongoDB.ObjectId(id);

  try {
    await db.collection(collection).deleteOne({ _id: record_id });
    logger.info("[delete_op.ts, deleteAnEntry()] DELETE query successfull.");
    return true;
  } catch (error) {
    logger.error(
      "[delete_op.ts, deleteAnEntry()] DELETE query failed!\n" + error
    );
    return false;
  }
};
