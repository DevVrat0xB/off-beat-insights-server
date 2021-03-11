import MongoDB from "mongodb";

import { db } from "../../express";
import logger from "../logger";

import { User } from "../../models/user.model";
import { Article } from "../../models/article.model";
import {
  TRANSACTION,
  TRANSACTION_TYPE,
} from "../../models/transaction_type.model";

// for creating a new entry in any given collection.
export const updateAnEntry = async (
  id: MongoDB.ObjectId,
  data: Partial<User | Article>,
  collection: string
): Promise<TRANSACTION> => {
  let result: TRANSACTION; // result of the query.

  try {
    const query = await db
      .collection(collection)
      .findOneAndUpdate({ _id: id }, { $set: data }, { upsert: false });

    logger.info("[update_op.ts, updateAnEntry()] UPDATE query successfull.");

    // returning the data which got updated (NOT UPDATED values).
    if (query.value)
      result = { type: TRANSACTION_TYPE.NORESULT, data: query.value };
    // if query ran but couldn't find the record for update or value is already updated.
    else result = { type: TRANSACTION_TYPE.NORESULT, data: query.value };
  } catch (error) {
    logger.error(
      "[update_op.ts, updateAnEntry()] UPDATE query failed!." + error
    );
    result = { type: TRANSACTION_TYPE.FAILURE, data: null };
  }
  return result;
};
