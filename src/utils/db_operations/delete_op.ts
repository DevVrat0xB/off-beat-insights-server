import { db } from "../../express";
import MongoDB from "mongodb";

import logger from "../logger";
import {
  TRANSACTION,
  TRANSACTION_TYPE,
} from "../../models/transaction_type.model";

// for deleting an existing entry in any given collection.
export const deleteAnEntry = async (
  id: MongoDB.ObjectId,
  collection: string
): Promise<TRANSACTION> => {
  let result: TRANSACTION; // result of the query.

  try {
    const query = await db.collection(collection).deleteOne({ _id: id });
    logger.info("[delete_op.ts, deleteAnEntry()] DELETE query successfull.");
    result =
      query.result.n === 0
        ? { type: TRANSACTION_TYPE.NORESULT, data: null }
        : { type: TRANSACTION_TYPE.SUCCESS, data: null };
  } catch (error) {
    logger.error(
      "[delete_op.ts, deleteAnEntry()] DELETE query failed!\n" + error
    );
    result = { type: TRANSACTION_TYPE.FAILURE, data: null };
  }
  return result;
};
